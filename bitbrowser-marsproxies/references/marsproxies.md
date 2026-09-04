# MarsProxies 代理参考

## 产品线

| 产品 | 特点 | 计费 | 备注 |
|------|------|------|------|
| Datacenter | 专用 IP、10 Gbps、无限流量 | 按 IP 数 × 天数 | 无试用，可用日付测试 |
| ISP | 住宅登记的机房 IP | 按端口/天数 | 电商/账号注册常用 |
| Residential | 住宅 IP 池 | 按 GB | user 串里带国家/会话参数 |
| Sneakers/Shopping | 面向抢购场景 | 按流量 | |

## 凭证与端口

- 标准格式：`host:port:user:pass`，datacenter 默认端口 `44444`
- **协议是订单级开关**：Dashboard → 对应订单 → Details → **Select port** → 选 HTTP/HTTPS 或 SOCKS5。切换后 Product Info 列表自动更新，**端口号可能变化**，必须以最新为准
- 同一时刻一个订单只讲一种协议（不是同端口双协议）
- **协议级实证方法（2025-11 实战）**：用裸 socket 对 44444 逐个发两种握手——HTTP `CONNECT ip-api.com:80` + SOCKS5 greeting `\x05\x02\x00\x02`。结果 5/5 IP：HTTP 返回 `200 Connection Established`，SOCKS5 **超时**（不是拒绝）。超时=HTTP 服务器把 SOCKS5 字节当残缺 HTTP 请求死等 `\r\n\r\n`。不要用 curl 下结论——沙箱出口的 DPI 会污染 SOCKS5 测试结果，裸 socket 双协议对照才是干净的
- 重置凭证（Reset credentials）每小时只能一次
- 验证代理可用：`curl -x http://user:pass@host:port http://ip-api.com/json/`

## 封锁政策（官方 Help Center）

默认封锁五类：
1. Banking / Government（银行/政府）
2. Identity & Account Providers（身份证明类）
3. Ticketing & Marketplaces（票务/市场）
4. Gaming & Entertainment Networks
5. Email ports（收发邮件端口，需 KYC 解锁）

完整清单是一份官方 Google Sheets。**搜索引擎、社媒、电商平台不在默认封锁范围**。Datacenter/ISP 的政府银行类站点可提交身份验证后解锁。

用户侧"代理商封我"投诉时，先对照这五类排除，再查本地链路。

## 订单管理

- Auto extend：到期前 3 天自动续费，可关闭
- 到期续费/手动续费都保留原 IP
- 退款：无试用期，官方建议先买日付验证场景

## 与 BitBrowser 搭配要点

- BitBrowser 窗口 proxyType 必须与订单当前协议一致；后台切了协议，窗口要跟着改（协议 + 可能变化的新端口）
- 多窗口多 IP：每个窗口绑一个专属 IP，避免多个窗口共用（防关联的基本要求）
- IP 国别归属以 ip-api 实测为准（例如宣传"澳洲"实测落地新西兰——都在 Oceania，账号注册场景注意 Google 账号的国家一致性）
