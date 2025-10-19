# Railway Model Display Fix

## Problem

Models are stored in the database but not showing in the UI. The error is:

```
/model_group/info:1  Failed to load resource: the server responded with a status of 500 ()
Error fetching model info: SyntaxError: Unexpected token 'I', "Internal S"... is not valid JSON
```

## Root Cause

The `/model_group/info` endpoint is crashing on the backend. However, models ARE successfully stored in the database (verified via `/v2/model/info` endpoint).

## Verification

Your models are working! Test them:

```bash
# List models (this works!)
curl https://anos-production.up.railway.app/v1/models \
  -H "Authorization: Bearer sk-1234"

# Get detailed model info (this works!)
curl https://anos-production.up.railway.app/v2/model/info \
  -H "Authorization: Bearer sk-1234"

# Test a completion with your model
curl https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "Say hello"}]
  }'
```

## Current Models in Database

✅ **gpt-5-codex** - Azure GPT-5 Codex
✅ **gpt-5** - Azure GPT-5

Both models are successfully stored and can be used via API!

## Fix Options

### Option 1: Use API Directly (Works Now)

The models work via API even though the UI has issues. Use the `/v1/chat/completions` endpoint directly.

### Option 2: Fix the UI Endpoint

The issue is with the `/model_group/info` endpoint. This might be:
1. A bug in LiteLLM proxy
2. Missing database table for model groups
3. Configuration issue

**Check Railway logs:**
```bash
railway logs --follow
```

Look for errors related to `model_group` or database queries.

### Option 3: Update LiteLLM Version

The `/model_group/info` endpoint might be fixed in a newer version:

1. Update `requirements.txt` or `pyproject.toml`
2. Redeploy on Railway

### Option 4: Disable Model Groups

If you don't need model groups, you can use the simpler `/v2/model/info` endpoint.

Update the UI to use `/v2/model/info` instead of `/model_group/info`.

## Workaround: Use Test Key Page

Instead of the Models page, use the **Test Key** page:

1. Go to `https://anos-production.up.railway.app/ui/test-key`
2. Enter your master key: `sk-1234`
3. Select model: `gpt-5-codex` or `gpt-5`
4. Test your models there

## Check Railway Logs for Specific Error

Run this to see the actual error:

```bash
railway logs --filter "model_group" --tail 50
```

Or in Railway Dashboard:
1. Click your service
2. Go to "Deployments"
3. Click latest deployment
4. View logs
5. Search for "model_group" or "500"

## Expected Log Errors

Look for one of these:
- `Table 'LiteLLM_ModelGroupTable' doesn't exist`
- `column "model_group" does not exist`
- `NoneType object has no attribute`
- Database connection errors

## If Database Table is Missing

Run migrations in Railway:

```bash
# Option 1: Via Railway CLI
railway run python -m litellm.proxy.db_migrations

# Option 2: Add to start command in Railway
litellm --config /app/proxy_config.yaml --port 4000 --run-migrations
```

## Summary

✅ **Models ARE stored in database**
✅ **Models work via API**
❌ **UI `/model_group/info` endpoint is broken**

**Recommendation:** Use the API directly or check Railway logs to see the specific error for `/model_group/info`.
