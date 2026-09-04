# BitBrowser 本地 API 参考

## 基础

- Base URL: `http://127.0.0.1:54345`（仅用户本机可达；云端沙箱访问不到）
- 鉴权：请求头 `x-api-key: <token>`，在 BitBrowser 客户端「设置 → API」中开启并生成
- 7.1.5+ 版本同时提供 MCP 端点 `http://127.0.0.1:54345/mcp`（同样走 x-api-key）
- 所有业务端点都是 POST + JSON body

## 常用端点

### GET /health
探活。返回 `{"success": true}` 即本地 API 可用。

### POST /browser/list
```json
{"page": 0, "pageSize": 100}
```
返回 `data.list[]`，每项含 `id` / `name` / `seq` / `remark` / `proxyMethod` / `proxyType` / `host` / `port` / `proxyUserName` / `proxyPassword`（代理凭证直接可读，可用于本地诊断脚本）。

### POST /browser/update（创建/覆盖窗口）
创建窗口时的核心字段：
```json
{
  "name": "US-1",
  "remark": "MarsProxies US 192.208.4.30",
  "proxyMethod": "custom",
  "proxyType": "http",            // "http" | "socks5"
  "host": "192.208.4.30",
  "port": "44444",
  "proxyUserName": "...",
  "proxyPassword": "...",
  "isIpCreateTimeZone": true,     // 时区跟随 IP
  "isIpCreateTimeZoneOffset": true,
  "isIpPosition": true,           // 经纬度跟随 IP
  "isIpLanguage": true,           // 语言跟随 IP
  "isIpCountry": true,
  "isIpPostalCode": true,
  "isIpCity": true,
  "fingerprintKernel": "chrome",  // 或 "chromium"
  "version": "134"                 // 内核版本
}
```
指纹一致性五个 `isIp*` 全开是黄金默认值；UA / 分辨率 / Canvas / WebRTC 由内核自动随机或按内核配置。

### POST /browser/proxy/update（批量改代理，推荐）
```json
{
  "ids": ["<windowId>"],
  "proxyMethod": "custom",
  "proxyType": "socks5",
  "host": "...", "port": "...",
  "proxyUserName": "...", "proxyPassword": "..."
}
```
- 前提：目标窗口必须是**关闭状态**，开着会被拒绝
- 改代理不要用 `/browser/update/partial`（那是改备注等杂项的）

### POST /browser/open
```json
{"id": "<windowId>"}
```
返回 `data.http` / `data.ws`（CDP 调试端点，如 `127.0.0.1:53210`）。Cookie 迁移（Network.setCookie / Storage.setCookies）通过这个端点接 CDP WebSocket 做。

### POST /browser/close / /browser/delete
`{"id": "<windowId>"}` 或 `{"ids": [...]}`。

## 云端沙箱操作模式（重要）

沙箱访问不到用户本机的 127.0.0.1:54345，两条路：

1. **下载脚本模式**：把 .ps1/.bat 放到静态下载服务上给用户双击执行。PowerShell 5.1 中文脚本必须 UTF-8 **带 BOM**。
2. **中继模式**：沙箱起 HTTP 服务（静态文件 + 指令队列），用户机器跑一个轮询客户端取指令、执行本地 API、回传结果。适合需要多轮远程操作的场景。

## 踩坑记录

- 创建窗口循环调用时注意限速，BitBrowser 本地 API 没有明确限频，但连续创建建议每次间隔 1~2 秒，失败时读返回体里的 msg
- `port` 字段传字符串，别传数字
- 窗口名重复不报错，会并列存在，创建前先 /browser/list 查重
