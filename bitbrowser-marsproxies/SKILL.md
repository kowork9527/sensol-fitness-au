---
name: bitbrowser-marsproxies
description: 用于 BitBrowser（比特浏览器）本地 API 自动化（批量创建/修改窗口、配置代理与指纹）与 MarsProxies 代理排障；当用户需要批量管理指纹浏览器窗口、配置海外代理，或遇到"代理 IP 正常但部分网站打不开 / 被代理商标记封锁"类代理故障诊断时使用。
---

## 何时使用

- 用户要批量创建 / 修改 BitBrowser 浏览器窗口（代理、指纹、窗口名、分组）
- 用户在用 MarsProxies（datacenter / ISP / residential）配代理，出问题要排查
- 用户报告"IP 是通的，但 Google / YouTube / Facebook 打不开"
- 用户要做"IP 与浏览器指纹一致性"设置（时区、语言、经纬度跟随 IP）
- 用户要给指纹浏览器做 Cookie 迁移（CDP 方式）

## 核心事实（先读，避免误判）

1. **MarsProxies 的默认封锁清单只有五类**：银行/政府/身份证明/票务市场/游戏娱乐网络。搜索引擎（Google/Bing）、社媒、电商**不在列**。代理商说"没有封锁你"通常是真的，别急着赖代理商。
2. **"IP 通但 Google 打不开"最常见的真凶是本地网络对明文代理握手的 DPI 阻断**（GFW 场景）：HTTP 代理的 CONNECT 请求里目标域名是明文，中间设备直接 RST。典型症状：百度/Bing 能开、IP 检测通过、唯独 Google/YouTube/Facebook 打不开。
3. **MarsProxies datacenter/ISP 的 HTTP 与 SOCKS5 是订单后台的协议开关**（Details → Select port），不是同端口双协议。切换后凭证不变但**端口号可能变化**，必须以切换后最新 Product Info 为准。
4. **BitBrowser 改代理要用 `/browser/proxy/update` 或完整 `/browser/update`**，不要用 `/browser/update/partial` 改代理字段；改代理前窗口必须关闭。

## 操作步骤

### A. 批量创建窗口（代理已就绪时）

1. 从用户处拿到代理清单（`host:port:user:pass` 每行一条）和 BitBrowser 本地 API Key。
2. 注意：BitBrowser 本地 API 在**用户本机 127.0.0.1:54345**，云端沙箱访问不到。两条路：把脚本给用户下载执行（推荐打包成 .ps1/.bat，PS1 必须 UTF-8 带 BOM），或搭 HTTP 中继远程下发指令。
3. 按 `references/bitbrowser-local-api.md` 的端点逐个创建窗口：`/browser/update` 带 name / proxyMethod=custom / proxyType / host / port / proxyUserName / proxyPassword + 指纹一致性参数（isIpCreateTimeZone / isIpPosition / isIpLanguage = true）。
4. 创建完用 `/browser/list` 核对，让用户开窗口访问 ip-api 类站点验收。

### B. "IP 通但某网站打不开"排障

1. 先跑对照实验矩阵（脚本 `scripts/proxy_control_test.py` 或手动 curl），不要只测打不开的那一个站。四组：直连目标站 / 走代理访问非封锁站 / 走代理访问目标站 / 直连非封锁站。
2. 按 `references/proxy-blocked-diagnosis.md` 的判定表定结论。
3. **沙箱污染警告**：云端沙箱的出口本身可能受限（直连 Google 失败不代表目标站有问题；走代理 RST 也不一定是代理商干的）。任何"谁封锁了谁"的结论必须在用户本机或第二个独立网络复核后才能下。
4. 修复阶梯：① MarsProxies 后台切 SOCKS5（零成本先试）→ ② SOCKS5 也被掐则上加密链式转发（gost / Clash relay 组）→ ③ 问代理商有无 CN 优化网关。

### C. 常见坑

- PowerShell 5.1 跑中文 .ps1：文件必须 UTF-8 带 BOM，否则乱码。
- MarsProxies 凭证重置限频每小时一次；换协议后 Product Info 端口可能变。
- BitBrowser 窗口开着时改代理会被拒：先关闭窗口。
- 测试 Google 连通性用 `https://www.google.com/generate_204`，返回 204 才算真通（curl exit 0 且 http_code=204）。

## 资源索引

- `references/bitbrowser-local-api.md`：涉及 BitBrowser API 端点、鉴权、参数、返回结构时读
- `references/marsproxies.md`：涉及 MarsProxies 产品线、凭证格式、协议切换、封锁政策时读
- `references/proxy-blocked-diagnosis.md`：涉及"某网站打不开归因"时读（含判定表与修复阶梯）
- `scripts/proxy_control_test.py`：对照实验矩阵自动测试（直连/代理 × 封锁站/非封锁站），得出归因结论
