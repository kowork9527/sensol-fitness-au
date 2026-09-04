#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
本地备份 → BitBrowser 导入工具
==============================
读取 1_export_mostlogin.py 生成的 mostlogin_backup/，
在 BitBrowser 里批量建环境并种入 cookie。

用法（在同一台电脑上，先装好 BitBrowser 并登录）：
  1. BitBrowser 客户端 设置 里开启「本地API」
  2. pip install requests websocket-client
  3. python 2_import_bitbrowser.py

注意：
  - 环境先不配代理（你之后统一换新 IP），建好后可在 BitBrowser
    界面里逐个配，或跑本脚本前在 CONFIG 里填入新代理
  - cookie 与账号是一一对应的，脚本按备份文件名（=MostLogin 环境名）对应
"""
import json
import os
import time
import requests

# ================= 配置区 =================
BITBROWSER_API = "http://127.0.0.1:54345"      # BitBrowser 本地 API（默认 54345）
BACKUP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mostlogin_backup")
# 新代理（可选：留空 = 不配代理，建好后手动配）
# 示例："socks5://127.0.0.1:1080" 或 "http://user:pass@ip:port"
NEW_PROXY = ""
# ==========================================


def bb_create_profile(name, remark):
    """创建 BitBrowser 环境，返回 id"""
    body = {"name": name, "remark": remark, "openBrowser": False, "repeatOperate": False}
    if NEW_PROXY:
        proxy_type = "socks5" if NEW_PROXY.startswith("socks5") else "http"
        host_part = NEW_PROXY.split("://", 1)[-1]
        auth = ""
        if "@" in host_part:
            auth, host_part = host_part.rsplit("@", 1)
        host, port = host_part.split(":") if ":" in host_part else (host_part, "")
        body.update({
            "proxyMethod": 2,
            "proxyType": proxy_type,
            "host": host,
            "port": port,
        })
        if auth:
            user, pwd = auth.split(":", 1)
            body.update({"proxyUserName": user, "proxyPassword": pwd})
    r = requests.post(BITBROWSER_API + "/browser/update", json=body, timeout=30)
    d = r.json()
    if not d.get("success"):
        raise RuntimeError(d.get("msg") or json.dumps(d, ensure_ascii=False))
    return d["data"]["id"]


def bb_open_profile(profile_id):
    r = requests.post(BITBROWSER_API + "/browser/open", json={"id": profile_id}, timeout=60)
    d = r.json()
    if not d.get("success"):
        raise RuntimeError(d.get("msg") or json.dumps(d, ensure_ascii=False))
    return d["data"]["ws"]


def bb_close_profile(profile_id):
    try:
        requests.post(BITBROWSER_API + "/browser/close", json={"id": profile_id}, timeout=30)
    except Exception:
        pass


def cdp_set_cookies(ws_url, cookies_bb):
    """BitBrowser 格式 cookie → CDP 格式并写入"""
    cdp_cookies = []
    for c in cookies_bb:
        item = {
            "name": c["name"],
            "value": c["value"],
            "domain": c["domain"],
            "path": c.get("path", "/"),
            "secure": c.get("secure", False),
            "httpOnly": c.get("httpOnly", False),
        }
        exp = c.get("expirationDate", 0)
        # 会话 cookie（expires 无效值）不传 expires，否则 CDP 报错
        if exp and exp > 0:
            item["expires"] = exp
        same = (c.get("sameSite") or "").lower()
        if same in ("strict",):
            item["sameSite"] = "Strict"
        elif same in ("lax",):
            item["sameSite"] = "Lax"
        elif same in ("no_restriction", "none"):
            item["sameSite"] = "None"
        cdp_cookies.append(item)

    from websocket import create_connection
    ws = create_connection(ws_url, timeout=30)
    try:
        # CDP 单次最多批量写入若干条，分批（每批 50）
        for i in range(0, len(cdp_cookies), 50):
            batch = cdp_cookies[i:i + 50]
            ws.send(json.dumps({"id": i // 50 + 1, "method": "Network.setCookies",
                                "params": {"cookies": batch}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == i // 50 + 1:
                    if "error" in resp:
                        raise RuntimeError(resp["error"].get("message", str(resp["error"])))
                    break
    finally:
        ws.close()


def main():
    cookies_dir = os.path.join(BACKUP_DIR, "cookies")
    profiles_file = os.path.join(BACKUP_DIR, "profiles.json")

    if not os.path.isdir(cookies_dir):
        print("[错误] 找不到备份目录：%s" % cookies_dir)
        print("请先运行 1_export_mostlogin.py")
        return

    # 环境清单（取账号备注做 remark）
    profiles = []
    if os.path.isfile(profiles_file):
        with open(profiles_file, encoding="utf-8") as f:
            profiles = json.load(f)
    remark_map = {}
    for p in profiles:
        nm = p.get("name") or p.get("profileName") or ""
        remark = json.dumps(
            {k: p.get(k) for k in ("account", "username", "remark", "note", "password", "remarkContent")
             if p.get(k)},
            ensure_ascii=False) if nm else ""
        if nm:
            remark_map[nm] = remark

    # 探测 BitBrowser API
    try:
        requests.get(BITBROWSER_API, timeout=5)
    except Exception:
        print("[错误] 连不上 BitBrowser 本地 API：%s" % BITBROWSER_API)
        print("请在 BitBrowser 客户端 设置 里开启「本地API」后重试")
        return

    files = sorted(f for f in os.listdir(cookies_dir) if f.endswith(".json"))
    print("待导入环境数：%d" % len(files))

    ok, fail = 0, 0
    for i, fn in enumerate(files, 1):
        name = fn[:-5]
        print("[%d/%d] %s ..." % (i, len(files), name), end=" ", flush=True)
        pid = None
        try:
            with open(os.path.join(cookies_dir, fn), encoding="utf-8") as f:
                cookies = json.load(f)
            pid = bb_create_profile(name, remark_map.get(name, ""))
            ws = bb_open_profile(pid)
            cdp_set_cookies(ws, cookies)
            bb_close_profile(pid)
            print("OK (%d 条 cookie)" % len(cookies))
            ok += 1
        except Exception as e:
            print("失败: %s" % e)
            if pid:
                bb_close_profile(pid)
            fail += 1
        time.sleep(1)

    print()
    print("=" * 50)
    print("完成：成功 %d / 失败 %d" % (ok, fail))
    if NEW_PROXY == "":
        print("提示：环境暂未配代理，请到 BitBrowser 里统一配置你的新 IP")


if __name__ == "__main__":
    main()
