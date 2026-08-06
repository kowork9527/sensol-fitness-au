# Shopify Theme Upload Rules (CRITICAL)

## 核心原则：慢速上传，配合 Shopify 节奏

### 上传间隔规则
- **每个文件之间必须等待 5-10 秒**
- 禁止批量并行上传
- 禁止快速连续上传（< 3秒间隔）

### 上传流程（MANDATORY）

```
1. 上传文件 A
   ↓
2. 等待 5-10 秒
   ↓
3. GET 验证文件 A 内容正确
   ↓
4. 等待 3-5 秒
   ↓
5. 上传文件 B
   ↓
6. 重复步骤 2-4
```

### 验证规则
- 每次 PUT 后必须 GET 验证
- 验证内容包含关键修复点
- 验证失败则停止上传，排查问题

### CDN 缓存规则
- 上传完成后等待 **10-15 分钟** 再检查页面
- Shopify CDN 缓存刷新需要时间
- 不要立即刷新页面期望看到变化
- 使用 `?preview_theme_id={id}` 参数可能绕过缓存

### 常见错误（禁止）
- ❌ 一次性上传 6 个文件无间隔
- ❌ 上传后不验证
- ❌ 上传后立即检查页面
- ❌ 使用并行上传（Promise.all 等）
- ❌ 忽略 rate limit 错误

### 正确示例

```python
import time
import urllib.request
import json

files = [
    ("sections/hero.liquid", "/tmp/hero.liquid"),
    ("sections/video.liquid", "/tmp/video.liquid"),
    ("sections/specs.liquid", "/tmp/specs.liquid"),
]

for i, (key, path) in enumerate(files):
    # 1. 上传文件
    with open(path, 'r') as f:
        content = f.read()
    
    payload = json.dumps({"asset": {"key": key, "value": content}}).encode()
    req = urllib.request.Request(BASE, data=payload, method='PUT')
    req.add_header('X-Shopify-Access-Token', TOKEN)
    req.add_header('Content-Type', 'application/json')
    resp = urllib.request.urlopen(req)
    print(f"[{i+1}/{len(files)}] PUT {key}: {resp.status}")
    
    # 2. 等待 5-10 秒
    time.sleep(8)
    
    # 3. GET 验证
    verify_url = f"{BASE}?asset[key]={key}"
    req = urllib.request.Request(verify_url)
    req.add_header('X-Shopify-Access-Token', TOKEN)
    resp = urllib.request.urlopen(req)
    verified = json.loads(resp.read())['asset']['value']
    
    if len(verified) == len(content):
        print(f"  ✅ Verified: {len(verified)} bytes")
    else:
        print(f"  ❌ MISMATCH: expected {len(content)}, got {len(verified)}")
        break  # 停止上传
    
    # 4. 等待 3-5 秒再继续
    time.sleep(4)

print("\n上传完成，等待 10-15 分钟 CDN 缓存刷新")
```

### 上传后检查流程

```
1. 所有文件上传完成
   ↓
2. 等待 10-15 分钟
   ↓
3. 使用 curl 获取页面 HTML
   ↓
4. 检查关键修复点是否存在
   ↓
5. 如果仍是旧版本，继续等待 5-10 分钟
   ↓
6. 重复步骤 3-5 直到看到新版本
```

### 关键修复点检查清单

对于每个修改的 section，定义 2-3 个关键检查点：

```python
checks = {
    "hero": {
        "breadcrumb": "rs03-breadcrumb" in html,
        "padding_40px": "padding-top: 40px" in html,
        "lightbox": "rs03-lightbox" in html,
    },
    "included": {
        "title_white": "color:#F7F4F0" in html,
        "font_32px": "clamp(32px" in html,
    },
    "qa": {
        "padding_60px": "padding:60px 40px 40px" in html,
    }
}
```

### 错误处理

如果遇到以下错误，立即停止并等待：
- `429 Too Many Requests` - Rate limit，等待 60 秒
- `500 Internal Server Error` - Shopify 服务器错误，等待 5 分钟
- `409 Conflict` - 文件冲突，GET 最新版本后重新合并
- PUT 返回 200 但 GET 内容不匹配 - 等待 30 秒后重试

### 总结

**慢就是快**。花 5 分钟慢慢上传，比花 30 分钟排查上传失败问题要快得多。

Shopify 的 API 和 CDN 有自己的节奏，必须配合：
1. 上传间隔 5-10 秒
2. 每次上传后验证
3. 上传完成后等待 10-15 分钟
4. 不要急于刷新页面
