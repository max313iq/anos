# Railway Deployment Guide

## 🚨 Current Issue

**Railway deployment is NOT running** - You need to redeploy with the updated configuration.

## Why Local Works But Railway Doesn't

### Local Setup ✅
- Models are loaded from `proxy_config.yaml`
- Database is clean (just reset)
- All environment variables are set correctly
- Enterprise license is active
- You can see all 6 models and chat with them

### Railway Setup ❌
- Old deployment with outdated config
- May have old encrypted data in database
- Environment variables may not be updated
- Needs fresh deployment

---

## 🔧 Fix: Deploy to Railway

### Step 1: Commit Your Changes

```bash
cd /workspaces/litellm

# Check what changed
git status

# Add all changes
git add proxy_config.yaml .env ENTERPRISE_FEATURES.md LOCAL_TESTING.md

# Commit
git commit -m "Update proxy config with GPT-5 models and enterprise features

- Set default model to gpt-5
- Enable store_model_in_db
- Add enterprise license
- Clean database configuration
- Update environment variables"

# Push to GitHub
git push origin main
```

### Step 2: Configure Railway Environment Variables

Go to your Railway project and set these environment variables:

#### Required Variables
```bash
# Core Configuration
LITELLM_MASTER_KEY=sk-1234
LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef
PORT=4000
STORE_MODEL_IN_DB=True

# Enterprise License
LITELLM_LICENSE=34INT32940IUNNMJ

# Database (Auto-set by Railway PostgreSQL service)
DATABASE_URL=postgresql://...

# UI Access
UI_USERNAME=admin
UI_PASSWORD=admin
```

#### Optional Variables (For Full Features)
```bash
# Redis (if you add Railway Redis service)
REDIS_HOST=redis.railway.internal
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Observability (Optional)
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...

# Content Moderation (Optional)
OPENAI_API_KEY=sk-...
```

### Step 3: Trigger Railway Deployment

Railway will automatically deploy when you push to GitHub. Or you can:

1. Go to Railway dashboard
2. Click on your LiteLLM service
3. Click "Deploy" → "Redeploy"

### Step 4: Wait for Deployment

Railway will:
1. Pull latest code from GitHub
2. Install dependencies
3. Run Prisma migrations (will recreate database tables)
4. Start the proxy server

This takes 3-5 minutes.

### Step 5: Verify Deployment

Once deployed, test your Railway URL:

```bash
# Replace with your actual Railway URL
RAILWAY_URL="https://your-app.up.railway.app"

# Test health
curl "$RAILWAY_URL/health" -H "Authorization: Bearer sk-1234"

# List models
curl "$RAILWAY_URL/v1/models" -H "Authorization: Bearer sk-1234"

# Test chat
curl "$RAILWAY_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

---

## 🗄️ Database Reset on Railway (If Needed)

If you still see encryption errors on Railway after deployment:

### Option 1: Reset via Railway Dashboard

1. Go to Railway dashboard
2. Find your PostgreSQL service
3. Go to "Data" tab
4. Run this SQL:

```sql
-- Drop all LiteLLM tables
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

5. Redeploy your LiteLLM service (it will recreate tables)

### Option 2: Reset via Command Line

```bash
# Get your Railway PostgreSQL connection string from Railway dashboard
# It looks like: postgresql://postgres:password@host:port/railway

# Connect and reset
PGPASSWORD="your-password" psql -h your-host -p your-port -U postgres -d railway << 'EOF'
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
EOF
```

Then redeploy your LiteLLM service.

---

## 📊 Why Models Show Locally But Not on Railway

### Local Behavior
When you run locally with `store_model_in_db: true`:
1. Proxy reads models from `proxy_config.yaml`
2. Stores them in the database
3. `/v1/models` endpoint returns models from database
4. All 6 models are visible

### Railway Behavior (Current Issue)
If Railway has old deployment:
1. Old config may have `store_model_in_db: false`
2. Or database has old encrypted data
3. Models are not stored in database
4. `/v1/models` returns empty or errors

### Solution
Redeploy Railway with:
- Updated `proxy_config.yaml` (store_model_in_db: true)
- Clean database (reset if needed)
- Correct LITELLM_SALT_KEY environment variable

---

## 🎯 Expected Result After Deployment

Once Railway is properly deployed, you should see:

### 1. Models Endpoint Works
```bash
curl "https://your-app.up.railway.app/v1/models" \
  -H "Authorization: Bearer sk-1234"

# Returns:
{
  "data": [
    {"id": "gpt-5-codex", ...},
    {"id": "gpt-5", ...},
    {"id": "gpt-5-mini", ...},
    {"id": "gpt-5-nano", ...},
    {"id": "gpt-5-chat", ...},
    {"id": "gpt-5-pro", ...}
  ]
}
```

### 2. Chat Works with All Models
```bash
# Test gpt-5
curl "https://your-app.up.railway.app/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{"model": "gpt-5", "messages": [{"role": "user", "content": "Hi"}]}'

# Test gpt-5-codex (if Azure deployment exists)
curl "https://your-app.up.railway.app/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{"model": "gpt-5-codex", "messages": [{"role": "user", "content": "Write code"}]}'
```

### 3. Admin UI Works
- URL: `https://your-app.up.railway.app/ui`
- Username: `admin`
- Password: `admin`
- You can see all models in the UI

### 4. Enterprise Features Active
- Budget tracking
- Spend logging
- Audit logs
- Rate limiting
- All enterprise features from license

---

## 🔍 Troubleshooting

### Issue: Models Not Showing on Railway

**Cause**: `store_model_in_db` is false or database has issues

**Fix**:
1. Check Railway environment variable: `STORE_MODEL_IN_DB=True`
2. Check `proxy_config.yaml`: `store_model_in_db: true`
3. Reset database if needed
4. Redeploy

### Issue: Encryption Errors on Railway

**Cause**: Database has data encrypted with different salt key

**Fix**:
1. Ensure `LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef` in Railway
2. Reset database (drop all tables)
3. Redeploy (Prisma will recreate tables)

### Issue: 404 Application Not Found

**Cause**: Railway deployment failed or not running

**Fix**:
1. Check Railway logs for errors
2. Ensure all environment variables are set
3. Redeploy from Railway dashboard

### Issue: Can Chat Locally But Not on Railway

**Cause**: Railway deployment is outdated or not running

**Fix**:
1. Push latest code to GitHub
2. Trigger Railway redeploy
3. Wait for deployment to complete
4. Test endpoints

---

## 📝 Quick Deployment Checklist

- [ ] Commit changes to Git
- [ ] Push to GitHub
- [ ] Set Railway environment variables:
  - [ ] LITELLM_MASTER_KEY
  - [ ] LITELLM_SALT_KEY
  - [ ] LITELLM_LICENSE
  - [ ] STORE_MODEL_IN_DB=True
  - [ ] UI_USERNAME
  - [ ] UI_PASSWORD
- [ ] Trigger Railway deployment
- [ ] Wait 3-5 minutes for deployment
- [ ] Test `/health` endpoint
- [ ] Test `/v1/models` endpoint
- [ ] Test `/v1/chat/completions` endpoint
- [ ] Check Admin UI at `/ui`

---

## 🆘 Need Help?

If Railway deployment still doesn't work:

1. **Check Railway Logs**:
   - Go to Railway dashboard
   - Click on your service
   - View "Deployments" → Latest deployment → "View Logs"
   - Look for errors

2. **Check Database Connection**:
   - Ensure PostgreSQL service is running
   - Check DATABASE_URL is set correctly

3. **Reset Everything**:
   - Delete Railway service
   - Create new Railway service
   - Connect GitHub repo
   - Set all environment variables
   - Deploy fresh

---

## 🎉 Success Indicators

You'll know Railway is working when:

✅ Railway URL returns 200 OK on `/health`
✅ `/v1/models` shows all 6 models
✅ Chat completions work with `gpt-5`
✅ Admin UI loads at `/ui`
✅ No encryption errors in logs
✅ Spend tracking works in database

---

**Current Status**: Local proxy is working perfectly. Railway needs redeployment with updated config.
