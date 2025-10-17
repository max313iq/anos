# 🚀 Quick Deploy to Render - 5 Minutes

## Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
git init

# Add files
git add Dockerfile.render proxy_config.yaml render-blueprint.yaml

# Commit
git commit -m "Add Render deployment configuration"

# Create GitHub repo and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Step 2: Deploy to Render (3 minutes)

### Option A: One-Click Blueprint Deploy

1. Go to: [https://dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the repository you just created
5. Click **"Apply"**
6. ✅ Done! Wait 5-10 minutes for deployment

### Option B: Manual Web Service

1. Go to: [https://dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `litellm-proxy`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile.render`
   - **Plan**: Starter (Free)
5. Click **"Advanced"** and add environment variables:

```
DATABASE_URL=postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres
LITELLM_MASTER_KEY=sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s
LITELLM_SALT_KEY=sk-a1b2c3d4e5f6
PORT=4000
STORE_MODEL_IN_DB=True
UI_USERNAME=admin
UI_PASSWORD=admin123!@#
STORE_PROMPTS_IN_SPEND_LOGS=True
DISABLE_SPEND_LOGS=False
DISABLE_ERROR_LOGS=False
SET_VERBOSE=True
PROXY_BUDGET_RESCHEDULER_MIN_TIME=60
PROXY_BUDGET_RESCHEDULER_MAX_TIME=60
```

6. Click **"Create Web Service"**
7. ✅ Done! Wait 5-10 minutes

---

## Step 3: Test Your Deployment

Your service will be at: `https://litellm-proxy.onrender.com`

### Test API:
```bash
curl https://litellm-proxy.onrender.com/health/readiness
```

### Access UI:
```
https://litellm-proxy.onrender.com/ui
Username: admin
Password: admin123!@#
```

### Test Chat:
```bash
curl https://litellm-proxy.onrender.com/v1/chat/completions \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello!"}]}'
```

---

## ✅ That's It!

Your LiteLLM proxy is now live with:
- ✅ All your models (gpt-3.5-turbo, gpt-4, gpt-4-turbo)
- ✅ Connected to your Supabase database
- ✅ All your existing data (spend, logs, keys)
- ✅ Admin UI dashboard
- ✅ Full API access

---

## 🔒 Security Note

**Before production use, change these in Render dashboard:**
1. `LITELLM_MASTER_KEY` - Generate new: `openssl rand -base64 32`
2. `UI_PASSWORD` - Use a strong password

---

## 📚 Full Documentation

See `RENDER_DEPLOYMENT.md` for complete guide with troubleshooting.
