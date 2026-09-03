# Shopify Knowledge Base — Sensol Fitness FAQ 内容集

> 用途：录入 Shopify Admin → Apps → **Knowledge Base**（App Store 免费官方应用）。
> 这些 FAQ 是 AI 购物助手（Storefront MCP 的 `search_shop_policies_and_faqs` 工具）的信任数据源，
> 保证 AI 对话中关于 Sensol 的回答准确、符合品牌。
>
> 录入方式：Knowledge Base → **Add FAQ** → 粘贴 Question / Answer → Save。
> 所有内容均来自店铺已上线的政策页与产品线事实，Answer 保持 1-2 句（App 规范）。

---

## 一、政策类（8 条）

### 1. What is your return policy?

We offer a 30-day Change of Mind Return Policy starting from the date your order was delivered. You need to notify our support team within 30 days, and return shipping to our Australian warehouse is arranged and paid by the buyer.

### 2. How long does delivery take?

Metro delivery typically arrives within 2–5 business days, and every shipment is fully insured.

### 3. Is shipping free?

Yes, metro delivery is free of charge.

### 4. What does the warranty cover?

Sensol reformers carry tiered warranty coverage: 5 years on the frame, 3 years on electronics, 2 years on mechanical components, and 1 year on wear parts — in addition to your rights under Australian Consumer Law.

### 5. How do I make a warranty claim?

Contact our customer care team in writing at support@sensolfitness.com.au with your order details, and we will guide you through the claim process.

### 6. How do I contact support?

Email support@sensolfitness.com.au or call (+61) 480-899-797.

### 7. Are you an Australian company?

Yes. SENSOL is a registered brand of DUTE FITNESS (AUSTRALIA) PTY. LTD., located at Melaan Way, Clyde North VIC 3978, Australia.

### 8. What are my consumer rights?

All purchases are covered by Australian Consumer Law, including consumer guarantees that cannot be excluded, in addition to our tiered warranty coverage.

---

## 二、产品类（5 条）

### 9. What is the difference between the Smart Series and Mechanical Series?

Smart Series reformers (RS02, RS02 PRO, RS03 PRO) use servo-motor digital resistance adjustable in precise 1 kg increments. Mechanical Series reformers (FLEX, FLEX AIR, FLEX PRO) use spring-based resistance and fold for compact storage.

### 10. Which reformers can fold for storage?

The Mechanical Series — FLEX, FLEX AIR, and FLEX PRO — are designed to fold for space-saving storage at home.

### 11. What is the Sensol App?

The Sensol App is your intelligent training companion, available on iOS and Android. It provides real-time resistance control during your training sessions.

### 12. How precise is the resistance on Smart Series reformers?

Smart Series reformers adjust digital resistance in precise 1 kg increments, powered by servo motors.

### 13. Which products are in each series?

Smart Series includes RS02, RS02 PRO, and RS03 PRO (digital weight reformers). Mechanical Series includes FLEX, FLEX AIR, and FLEX PRO (spring-based foldable reformers).

---

## 三、品牌类（2 条）

### 14. What is SENSOL?

SENSOL is an Australian movement-equipment house designing premium pilates reformers, engineered in Melbourne.

### 15. Where can I buy Sensol products?

Sensol reformers are available exclusively through our official online store.

---

## 附：闭环验证方式

1. **录入后自测**：Knowledge Base → FAQ query log → **Test your knowledge base**，输入问题（如 "What is your return policy?"）验证匹配到刚录入的 FAQ。
2. **MCP 端点验证**（店铺去掉密码墙后有效）：
   ```bash
   curl -s -X POST https://1heajg-6u.myshopify.com/api/mcp \
     -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","method":"tools/call","id":1,"params":{"name":"search_shop_policies_and_faqs","arguments":{"query":"What is your return policy?"}}}'
   ```
   当前店铺密码墙开启，`/api/mcp` 会 302 到 /password —— 公开上线后即可被 AI 助手检索。
3. **自动生成的 default FAQ**：Knowledge Base 会基于店铺设置（配送国家、退货规则等）自动生成部分 FAQ——如与上面内容冲突，用 **Override** 覆盖为本文档版本。
