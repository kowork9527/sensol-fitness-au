#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MostLogin → 本地备份导出工具
==============================
导出内容：
  1. profiles.json          所有环境清单（名称/备注/账号代填字段等 API 返回的全部字段）
  2. cookies/<环境名>.json  每个环境全部 cookie（BitBrowser 兼容格式）

用法（在你装了 MostLogin 的那台电脑上运行）：
  pip install requests websocket-client
  python 1_export_mostlogin.py

输出目录：脚本旁边的 mostlogin_backup/ 文件夹
⚠️ cookie 等于账号登录态，备份文件夹不要上传网盘/发给任何人
"""
import json
import os
import time
import requests

# ================= 配置区 =================
MOSTLOGIN_API = "http://127.0.0.1:36677"   # MostLogin 本地 API 地址（设置里可查实际端口）
PAGE_SIZE = 100
BACKUP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mostlogin_backup")
COOKIES_DIR = os.path.join(BACKUP_DIR, "cookies")
# ==========================================


def try_list_profiles():
    """尝试多种常见的环境列表端点（不同版本路径不同，逐个探测）"""
    candidates = [
        ("POST", "/api/v1/profile/list", {"page": 1, "pageSize": PAGE_SIZE}),
        ("POST", "/api/v1/profile/list", {"pageNum": 1, "pageSize": PAGE_SIZE}),
        ("GET",  "/api/v1/profile/list?page=1&pageSize=%d" % PAGE_SIZE, None),
        ("POST", "/api/v1/profiles", {"page": 1, "pageSize": PAGE_SIZE}),
        ("GET",  "/api/v1/profiles?page=1&pageSize=%d" % PAGE_SIZE, None),
    ]
    for method, path, body in candidates:
        url = MOSTLOGIN_API + path
        try:
            if method == "POST":
                r = requests.post(url, json=body, timeout=10)
            else:
                r = requests.get(url, timeout=10)
            if r.status_code != 200:
                continue
            data = r.json()
            # 找到包含列表的返回结构
            for key in ("data", "result", "list"):
                node = data.get(key) if isinstance(data, dict) else None
                if isinstance(node, dict):
                    for lk in ("list", "rows", "items", "records"):
                        if isinstance(node.get(lk), list):
                            return node[lk], data
                if isinstance(node, list):
                    return node, data
            # data 本身就是 list 的情况
            if isinstance(data.get("data"), list):
                return data["data"], data
        except Exception:
            continue
    return None, None


def start_profile(profile_id):
    """启动环境，返回 (http端口, ws地址)"""
    r = requests.post(MOSTLOGIN_API + "/api/v1/profile/start",
                      json={"id": profile_id}, timeout=60)
    d = r.json()
    data = d.get("data") or d.get("result") or {}
    # 常见返回字段：http / ws / debugPort / debuggerAddress
    http_port = data.get("http") or data.get("debugPort") or data.get("port")
    ws = data.get("ws") or data.get("wsEndpoint") or data.get("debuggerAddress")
    if isinstance(http_port, str) and ":" in http_port:
        http_port = http_port.rsplit(":", 1)[-1]
    return http_port, ws


def stop_profile(profile_id):
    for path in ("/api/v1/profile/stop", "/api/v1/profile/close"):
        try:
            requests.post(MOSTLOGIN_API + path, json={"id": profile_id}, timeout=30)
        except Exception:
            pass


def cdp_get_all_cookies(ws_url):
    """通过 CDP 拉取全部 cookie（需要 websocket-client）"""
    from websocket import create_connection
    ws = create_connection(ws_url, timeout=30)
    try:
        ws.send(json.dumps({"id": 1, "method": "Network.getAllCookies"}))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == 1:
                return resp.get("result", {}).get("cookies", [])
    finally:
        ws.close()


def to_bitbrowser_format(cdp_cookies):
    """CDP cookie → BitBrowser/通用格式"""
    out = []
    for c in cdp_cookies:
        same = (c.get("sameSite") or "unspecified").lower()
        if same not in ("no_restriction", "lax", "strict"):
            same = "no_restriction" if same in ("none", "no_restriction") else "lax"
        out.append({
            "domain": c.get("domain", ""),
            "name": c.get("name", ""),
            "value": c.get("value", ""),
            "path": c.get("path", "/"),
            "hostOnly": not c.get("domain", "").startswith("."),
            "expirationDate": c.get("expires", -1),
            "session": c.get("session", False),
            "secure": c.get("secure", False),
            "httpOnly": c.get("httpOnly", False),
            "sameSite": same,
        })
    return out


def safe_name(name):
    return "".join(ch if ch not in '\\/:*?"<>|' else "_" for ch in str(name)).strip() or "unnamed"


def main():
    print("=" * 50)
    print("MostLogin 导出工具")
    print("=" * 50)

    # 探测 API 可达性
    try:
        requests.get(MOSTLOGIN_API, timeout=5)
    except Exception:
        print("[错误] 连不上 MostLogin 本地 API：%s" % MOSTLOGIN_API)
        print("请确认：1) MostLogin 客户端已登录并正在运行  2) 本地 API 端口正确")
        print("       （客户端 设置/自动化 里可查看实际端口，改脚本顶部 MOSTLOGIN_API）")
        return

    profiles, raw = try_list_profiles()
    if profiles is None:
        print("[错误] 环境列表端点探测失败，原始返回如下：")
        print(json.dumps(raw, ensure_ascii=False, indent=2)[:2000] if raw else "(无)")
        return

    print("发现 %d 个环境" % len(profiles))

    os.makedirs(COOKIES_DIR, exist_ok=True)

    # 保存完整环境清单（含账号备注等所有字段）
    with open(os.path.join(BACKUP_DIR, "profiles.json"), "w", encoding="utf-8") as f:
        json.dump(profiles, f, ensure_ascii=False, indent=2)
    print("已保存环境清单 → profiles.json")

    # 逐个导出 cookie
    ok, fail = 0, 0
    for i, p in enumerate(profiles, 1):
        pid = p.get("id") or p.get("profileId") or p.get("envId")
        name = p.get("name") or p.get("profileName") or pid
        print("[%d/%d] %s ..." % (i, len(profiles), name), end=" ", flush=True)
        try:
            http_port, ws_url = start_profile(pid)
            if not ws_url:
                if http_port:
                    # 通过 HTTP 发现接口拿 ws 地址
                    r = requests.get("http://127.0.0.1:%s/json/version" % http_port, timeout=10)
                    ws_url = r.json().get("webSocketDebuggerUrl")
                else:
                    raise RuntimeError("启动返回里没有调试端口")
            if not ws_url.startswith("ws"):
                ws_url = "ws://" + str(ws_url).replace("http://", "")
            cookies = cdp_get_all_cookies(ws_url)
            bb = to_bitbrowser_format(cookies)
            fn = os.path.join(COOKIES_DIR, safe_name(name) + ".json")
            with open(fn, "w", encoding="utf-8") as f:
                json.dump(bb, f, ensure_ascii=False, indent=2)
            print("OK (%d 条 cookie)" % len(bb))
            ok += 1
        except Exception as e:
            print("失败: %s" % e)
            fail += 1
        finally:
            try:
                stop_profile(pid)
            except Exception:
                pass
        time.sleep(1)

    print()
    print("=" * 50)
    print("完成：成功 %d / 失败 %d" % (ok, fail))
    print("备份目录：%s" % BACKUP_DIR)
    print("⚠️  该目录含登录态，勿上传网盘、勿发给任何人")


if __name__ == "__main__":
    main()
