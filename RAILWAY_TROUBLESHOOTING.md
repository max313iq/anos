# Railway Deployment Troubleshooting

## Current Issues and Fixes

### Issue 1: Models Not Appearing After Adding

**Problem:** When you add a model in the UI, it doesn't appear in the list.

**Root Cause:** Database connection or `STORE_MODEL_IN_DB` not properly configured.

**Fix:**
1. Verify these environment variables are set in Railway:
   ```bash
   STORE_MODEL_IN_DB=True
   DATABASE_URL=postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@postgres.railway.internal:5432/railway
   LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef
   ```

2. Check Railway logs for database connection errors:
   ```bash
   railway logs
   ```

3. Restart the service after adding environment variables:
   ```bash
   railway up --detach
   ```

### Issue 2: Invalid Model Errors (gpt-5-pro)

**Problem:** Errors like `Invalid model name passed in model=gpt-5-pro`

**Root Cause:** The UI is trying to use a model that doesn't exist. `gpt-5-pro` is not a real model.

**Fix:**
Use valid model names:
- `gpt-4` or `gpt-4-turbo` (OpenAI)
- `gpt-3.5-turbo` (OpenAI)
- `claude-3-opus-20240229` (Anthropic)
- `azure/gpt-4` (Azure OpenAI)

Your current config has:
```yaml
model_name: "gpt-5-codex"  # This is your custom name
litellm_params:
  model: "azure/gpt-5-codex"  # This should be a real Azure deployment name
```

**Update your Azure deployment name** to match your actual Azure OpenAI deployment.

### Issue 3: Mixed Content Error (HTTP on HTTPS)

**Problem:** `Mixed Content: The page was loaded over HTTPS, but requested an insecure resource 'http://...'`

**Root Cause:** Some URLs are using `http://` instead of `https://`

**Fix:**
Add this environment variable in Railway:
```bash
LITELLM_PROXY_BASE_URL=https://anos-production.up.railway.app
```

Or delete `PROXY_BASE_URL` if it exists and let it auto-detect.

### Issue 4: Missing Favicon (404 errors)

**Problem:** `/favicon.ico` returns 404

**Fix:** This is cosmetic and doesn't affect functionality. The favicon is missing from the build. You can ignore these errors.

### Issue 5: Duplicate ID Warnings

**Problem:** `Found 2 elements with non-unique id #model_access_group`

**Fix:** This is a UI bug in the LiteLLM dashboard code. It doesn't break functionality but should be reported to LiteLLM maintainers.

## Complete Railway Environment Variables

Make sure ALL of these are set:

```bash
# Core Configuration
DATABASE_URL=postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@postgres.railway.internal:5432/railway
LITELLM_MASTER_KEY=sk-1234
LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef
LITELLM_MODE=PRODUCTION
PORT=4000

# Database Settings
STORE_MODEL_IN_DB=True
STORE_PROMPTS_IN_SPEND_LOGS=True

# Redis Configuration (if you have Redis service)
REDIS_HOST=redis.railway.internal
REDIS_PORT=6379
REDIS_PASSWORD=<your-redis-password>

# Proxy Configuration
LITELLM_PROXY_BASE_URL=https://anos-production.up.railway.app

# Performance
DATABASE_CONNECTION_POOL_LIMIT=10
DATABASE_CONNECTION_TIMEOUT=30
SET_VERBOSE=False
```

## How to Check if Models are Stored in Database

1. **Via API:**
   ```bash
   curl -X GET "https://anos-production.up.railway.app/v2/model/info" \
     -H "Authorization: Bearer sk-1234"
   ```

2. **Via Railway Database:**
   - Go to Railway Dashboard
   - Click on your Postgres service
   - Click "Connect" → "psql"
   - Run:
     ```sql
     SELECT * FROM "LiteLLM_ModelTable";
     ```

## How to Add a Model Correctly

1. Go to `https://anos-production.up.railway.app/ui/models-and-endpoints`
2. Click "Add Model"
3. Fill in:
   - **Model Name:** `my-gpt-4` (your custom name)
   - **LiteLLM Model:** `azure/gpt-4` (actual Azure deployment)
   - **API Base:** `https://your-azure-endpoint.openai.azure.com/`
   - **API Key:** Your Azure API key
   - **API Version:** `2024-02-15-preview`
4. Click "Save"

## Verify Everything is Working

1. **Health Check:**
   ```bash
   curl https://anos-production.up.railway.app/health
   ```
   Should return: `{"status": "healthy"}`

2. **List Models:**
   ```bash
   curl https://anos-production.up.railway.app/v1/models \
     -H "Authorization: Bearer sk-1234"
   ```

3. **Test Completion:**
   ```bash
   curl https://anos-production.up.railway.app/v1/chat/completions \
     -H "Authorization: Bearer sk-1234" \
     -H "Content-Type: application/json" \
     -d '{
       "model": "gpt-5-codex",
       "messages": [{"role": "user", "content": "Hello"}]
     }'
   ```

## Still Having Issues?

1. **Check Railway Logs:**
   ```bash
   railway logs --follow
   ```

2. **Check Database Connection:**
   - Verify Postgres service is running
   - Check DATABASE_URL is correct
   - Verify internal Railway networking is working

3. **Restart Service:**
   - Go to Railway Dashboard
   - Click your service
   - Click "Restart"

4. **Check Redis (if using):**
   - Verify Redis service is running
   - Check REDIS_PASSWORD is correct
