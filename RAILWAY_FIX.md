# Railway Models Not Showing - Fix

## Problem

Railway shows only 1 model (gpt-5-codex) instead of all 6 models.

## Root Cause

Railway environment variable issue:
- `STORE_MODEL_IN_DB` is not set correctly
- OR Railway is using old database data
- OR Railway didn't restart properly after deployment

## Solution

### Step 1: Check Railway Environment Variables

Go to Railway dashboard and verify these are set:

```bash
LITELLM_MASTER_KEY=sk-1234
LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef
LITELLM_LICENSE=34INT32940IUNNMJ
STORE_MODEL_IN_DB=True  # ← CRITICAL: Must be "True" (capital T)
DATABASE_URL=postgresql://...  # Auto-set by Railway
```

### Step 2: Force Railway to Reload Models

Option A: Trigger Manual Redeploy
1. Go to Railway dashboard
2. Click on your LiteLLM service
3. Click "Deployments"
4. Click "Redeploy" on latest deployment

Option B: Clear Database and Redeploy
```bash
# Connect to Railway PostgreSQL
PGPASSWORD="ewJimjnmajcUjpxXDnjEUuOJoWEqiliE" psql \
  -h hopper.proxy.rlwy.net \
  -p 16649 \
  -U postgres \
  -d railway \
  -c "DELETE FROM \"LiteLLM_ProxyModelTable\";"

# Then redeploy Railway service
```

### Step 3: Verify After Deployment

```bash
# Wait 2 minutes after redeploy, then test
curl https://anos-production.up.railway.app/v1/models \
  -H "Authorization: Bearer sk-1234"

# Should show 6 models
```

## Why This Happens

### Local vs Railway Behavior

**Local (Working)**:
- Reads `proxy_config.yaml` on startup
- `STORE_MODEL_IN_DB=True` is set in environment
- Stores all 6 models in database
- `/v1/models` returns all 6 models

**Railway (Not Working)**:
- Reads `proxy_config.yaml` on startup
- BUT: `STORE_MODEL_IN_DB` might not be set correctly
- OR: Old models in database from previous deployment
- `/v1/models` returns only old database models

## Quick Fix: Add to Railway Startup Command

Instead of relying on environment variables, you can force it in the config:

### Option 1: Update proxy_config.yaml (Already Done)

```yaml
general_settings:
  store_model_in_db: true  # ✅ Already set
```

### Option 2: Add Railway Startup Script

Create `railway_start.sh`:

```bash
#!/bin/bash
# Clear old models from database
python3 << 'EOF'
import os
from litellm.proxy.utils import PrismaClient

# Connect to database
prisma_client = PrismaClient(
    database_url=os.environ["DATABASE_URL"],
    proxy_logging_only=False
)

# Delete old models
import asyncio
async def clear_models():
    await prisma_client.connect()
    await prisma_client.db.litellm_proxymodeltable.delete_many()
    await prisma_client.disconnect()

asyncio.run(clear_models())
print("✅ Cleared old models from database")
EOF

# Start LiteLLM
litellm --config proxy_config.yaml --port $PORT
```

Then in Railway, set start command to:
```bash
bash railway_start.sh
```

## Alternative: Use Railway API to Force Model Reload

After Railway deploys, call this endpoint:

```bash
# Force reload models from config
curl -X POST https://anos-production.up.railway.app/model/update \
  -H "Authorization: Bearer sk-1234"

# Then check models
curl https://anos-production.up.railway.app/v1/models \
  -H "Authorization: Bearer sk-1234"
```

## Debugging: Check Railway Logs

1. Go to Railway dashboard
2. Click on your service
3. View "Deployments" → Latest → "View Logs"
4. Look for:
   - ✅ "Initialized Model List ['gpt-5-codex', 'gpt-5', ...]"
   - ✅ "store_model_in_db: true"
   - ❌ Any errors about database connection
   - ❌ Any errors about model loading

## Expected Log Output

When working correctly, you should see:

```
Initialized Model List ['gpt-5-codex', 'gpt-5', 'gpt-5-mini', 'gpt-5-nano', 'gpt-5-chat', 'gpt-5-pro']
store_model_in_db: True
Adding 6 models to database...
✅ Successfully stored 6 models in database
```

## If Still Not Working

### Nuclear Option: Delete and Recreate Railway Service

1. Delete current Railway service
2. Create new Railway service
3. Connect GitHub repo
4. Set environment variables:
   ```bash
   LITELLM_MASTER_KEY=sk-1234
   LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef
   LITELLM_LICENSE=34INT32940IUNNMJ
   STORE_MODEL_IN_DB=True
   ```
5. Deploy

This ensures clean slate with no old database data.
