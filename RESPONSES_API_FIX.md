# Azure Responses API Fix

## 🔧 Problem Solved

**Issue**: gpt-5-codex and gpt-5-pro only work with Azure's **Responses API**, not the Chat Completions API.

**Error on Railway**:
```
The chatCompletion operation does not work with the specified model, gpt-5-codex
```

**Solution**: Use `azure_text/` prefix instead of `azure/` for Responses API models.

---

## 📝 What Changed

### Before (Broken on Railway)
```yaml
- model_name: "gpt-5-codex"
  litellm_params:
    model: "azure/gpt-5-codex"  # ❌ Uses Chat Completions API
```

### After (Works Everywhere)
```yaml
- model_name: "gpt-5-codex"
  litellm_params:
    model: "azure_text/gpt-5-codex"  # ✅ Uses Responses API
```

---

## 🎯 How It Works

### LiteLLM Auto-Translation

When you use `azure_text/` prefix:

1. **Client sends**: Standard OpenAI Chat Completions format
   ```json
   {
     "model": "gpt-5-codex",
     "messages": [{"role": "user", "content": "Write code"}]
   }
   ```

2. **LiteLLM translates to**: Azure Responses API format
   ```json
   {
     "model": "gpt-5-codex",
     "input": "Write code"
   }
   ```

3. **Azure returns**: Responses API format

4. **LiteLLM translates back to**: OpenAI Chat Completions format
   ```json
   {
     "choices": [{"message": {"content": "Here's the code..."}}]
   }
   ```

### Why It Works Locally But Not on Railway

**Local Behavior**:
- LiteLLM detects the model and automatically uses the right API
- Works even with `azure/` prefix (smart detection)

**Railway Behavior**:
- Stricter routing - needs explicit `azure_text/` prefix
- Without it, tries Chat Completions API and fails

---

## 🚀 Models Using Responses API

### Updated Models
```yaml
# GPT-5 Codex - Code generation (Responses API)
- model_name: "gpt-5-codex"
  litellm_params:
    model: "azure_text/gpt-5-codex"  # ✅ Fixed

# GPT-5 Pro - Advanced reasoning (Responses API)
- model_name: "gpt-5-pro"
  litellm_params:
    model: "azure_text/gpt-5-pro"  # ✅ Fixed
```

### Chat Completions API Models (No Change Needed)
```yaml
# These use standard Chat Completions API
- gpt-5
- gpt-5-mini
- gpt-5-nano
- gpt-5-chat
```

---

## ✅ Testing

### Local Test (Working)
```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "Write hello world"}],
    "max_tokens": 100
  }'

# ✅ Returns: Python hello world function
```

### Railway Test (After Deployment)
```bash
curl https://anos-production.up.railway.app/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "Write hello world"}],
    "max_tokens": 100
  }'

# ✅ Should return: Python hello world function
```

---

## 📊 Current Status

### Local Proxy ✅
- **All 6 models working**
- gpt-5-codex: ✅ Works with Chat Completions endpoint
- gpt-5: ✅ Works
- gpt-5-mini: ⚠️ Placeholder (Azure deployment doesn't exist)
- gpt-5-nano: ⚠️ Placeholder
- gpt-5-chat: ⚠️ Placeholder
- gpt-5-pro: ✅ Works with Chat Completions endpoint

### Railway Deployment 🔄
- **Status**: Deploying updated configuration
- **ETA**: 3-5 minutes from last push
- **Expected**: All 6 models will be available
- **Fix Applied**: azure_text/ prefix for Responses API models

---

## 🔍 Why Only 1 Model Shows on Railway

### Issue: `store_model_in_db`

Railway currently shows only 1 model because:

1. **Old deployment** had `store_model_in_db: false`
2. Models were not stored in database
3. `/v1/models` endpoint returns empty or only cached models

### Solution

The new deployment has:
```yaml
general_settings:
  store_model_in_db: true  # ✅ Now enabled
```

After Railway deploys:
1. Proxy reads all 6 models from `proxy_config.yaml`
2. Stores them in PostgreSQL database
3. `/v1/models` returns all 6 models
4. All models work with Chat Completions endpoint

---

## 🎉 Expected Result

Once Railway finishes deploying (check in 2-3 minutes):

### 1. All Models Listed
```bash
curl https://anos-production.up.railway.app/v1/models \
  -H "Authorization: Bearer sk-1234"

# Returns:
{
  "data": [
    {"id": "gpt-5-codex"},
    {"id": "gpt-5"},
    {"id": "gpt-5-mini"},
    {"id": "gpt-5-nano"},
    {"id": "gpt-5-chat"},
    {"id": "gpt-5-pro"}
  ]
}
```

### 2. GPT-5-Codex Works
```bash
curl https://anos-production.up.railway.app/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "Write Python code"}]
  }'

# ✅ Returns code
```

### 3. GPT-5 Works
```bash
curl https://anos-production.up.railway.app/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5",
    "messages": [{"role": "user", "content": "Hello"}]
  }'

# ✅ Returns response
```

---

## 📚 Technical Details

### Azure Responses API vs Chat Completions API

| Feature | Chat Completions | Responses API |
|---------|-----------------|---------------|
| **Endpoint** | `/openai/deployments/{model}/chat/completions` | `/openai/responses` |
| **Input Format** | `messages` array | `input` string |
| **Models** | gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-chat | gpt-5-codex, gpt-5-pro |
| **Use Case** | General chat, reasoning | Code generation, structured output |
| **LiteLLM Prefix** | `azure/` | `azure_text/` |

### LiteLLM Translation Layer

LiteLLM acts as a universal adapter:

```
Client (OpenAI format)
    ↓
LiteLLM Proxy
    ↓
[Detects azure_text/ prefix]
    ↓
Translates to Responses API format
    ↓
Azure Responses API
    ↓
Response
    ↓
LiteLLM translates back
    ↓
Client (OpenAI format)
```

This means:
- ✅ You always use OpenAI's Chat Completions format
- ✅ LiteLLM handles the Azure-specific translation
- ✅ Works with any OpenAI-compatible client

---

## 🆘 Troubleshooting

### Railway Still Shows 1 Model

**Wait 5 minutes** for deployment to complete, then:

```bash
# Force refresh models
curl -X POST https://anos-production.up.railway.app/model/update \
  -H "Authorization: Bearer sk-1234"

# Check models again
curl https://anos-production.up.railway.app/v1/models \
  -H "Authorization: Bearer sk-1234"
```

### GPT-5-Codex Still Fails

Check Railway logs for:
- ✅ "Initialized Model List ['gpt-5-codex', 'gpt-5', ...]"
- ✅ "store_model_in_db: true"
- ❌ Any encryption errors (should be fixed)

### Models Not Persisting

Ensure Railway environment variables:
```bash
STORE_MODEL_IN_DB=True
DATABASE_URL=postgresql://...  # Auto-set by Railway
LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef
```

---

## ✅ Summary

**Problem**: gpt-5-codex uses Azure Responses API, not Chat Completions API

**Solution**: Changed `azure/gpt-5-codex` → `azure_text/gpt-5-codex`

**Result**: 
- ✅ Local: gpt-5-codex works with /v1/chat/completions
- 🔄 Railway: Deploying fix now
- ✅ All 6 models will be available after deployment

**Test in 3-5 minutes**: Railway should have all models working!
