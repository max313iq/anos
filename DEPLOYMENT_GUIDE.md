# 🚀 LiteLLM Deployment Guide - Complete & Simplified

**One comprehensive guide for deploying your LiteLLM proxy.**

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Configuration](#configuration)
4. [Deployment Options](#deployment-options)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)
7. [Production Checklist](#production-checklist)

---

## 🎯 Quick Start

### **Your Current Setup**

**Database**: Supabase PostgreSQL
- Project: `mqlogafnamygvtkpwwbu`
- Region: US East 2
- Dashboard: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu

**Connection String**:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

**Models Configured**:
- gpt-3.5-turbo
- gpt-4
- gpt-4-turbo

---

## 📦 Prerequisites

### **Required**:
- ✅ Supabase account (free tier works)
- ✅ GitHub account
- ✅ Deployment platform account (Render/Railway/Fly.io)

### **Optional**:
- OpenAI API key (for using OpenAI models)
- Other LLM provider API keys

---

## ⚙️ Configuration

### **Environment Variables**

All platforms need these environment variables:

```bash
# Database (REQUIRED)
DATABASE_URL=postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres

# Authentication (REQUIRED)
LITELLM_MASTER_KEY=sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s
LITELLM_SALT_KEY=sk-a1b2c3d4e5f6

# Server (REQUIRED)
PORT=4000
STORE_MODEL_IN_DB=True

# UI Access (REQUIRED)
UI_USERNAME=admin
UI_PASSWORD=admin123!@#

# Logging (OPTIONAL but recommended)
STORE_PROMPTS_IN_SPEND_LOGS=True
DISABLE_SPEND_LOGS=False
DISABLE_ERROR_LOGS=False
SET_VERBOSE=True

# Budget Management (OPTIONAL)
PROXY_BUDGET_RESCHEDULER_MIN_TIME=60
PROXY_BUDGET_RESCHEDULER_MAX_TIME=60
```

### **Security Notes**

⚠️ **CHANGE THESE IN PRODUCTION**:
- `LITELLM_MASTER_KEY` - Generate new: `openssl rand -base64 32`
- `UI_PASSWORD` - Use strong password
- `LITELLM_SALT_KEY` - Only change if starting fresh (breaks existing encrypted data)

---

## 🌐 Deployment Options

### **Option 1: Render.com** (Free Tier Available)

#### **Pros**:
- ✅ Free tier with 750 hours/month
- ✅ Easy to use
- ✅ Auto-deploy from GitHub

#### **Cons**:
- ⚠️ Sleeps after 15 min inactivity (free tier)
- ⚠️ Environment variable timing issues with Docker

#### **Steps**:

1. **Create Web Service**:
   - Go to: https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Deploy from: "Docker Image"
   - Image URL: `ghcr.io/berriai/litellm:main-stable`

2. **Configure**:
   - Name: `litellm-proxy`
   - Region: Oregon (or closest)
   - Plan: Starter (Free)

3. **Add Environment Variables**:
   - Click "Advanced"
   - Add all variables from Configuration section above

4. **Set Docker Command**:
   ```bash
   litellm --port 4000 --host 0.0.0.0 --detailed_debug
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 8-10 minutes

#### **Important**:
- ⚠️ Do NOT use `render-blueprint.yaml` (causes duplicate services)
- ⚠️ Must click "Manual Deploy" after changing environment variables

---

### **Option 2: Railway.app** ⭐ **RECOMMENDED**

#### **Pros**:
- ✅ $5 free credit monthly
- ✅ Better environment variable handling
- ✅ Faster deployments
- ✅ No sleep on free tier
- ✅ Easier to use

#### **Cons**:
- ⚠️ Requires credit card (even for free tier)

#### **Steps**:

1. **Sign Up**:
   - Go to: https://railway.app
   - Sign up with GitHub

2. **New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `max313iq/anos`

3. **Add Variables**:
   - Click on service
   - Go to "Variables" tab
   - Click "Raw Editor"
   - Paste all environment variables

4. **Deploy**:
   - Railway auto-deploys
   - Wait 5 minutes
   - Get URL from deployment

---

### **Option 3: Fly.io** (Advanced)

#### **Pros**:
- ✅ Free tier available
- ✅ Global edge deployment
- ✅ Excellent performance

#### **Cons**:
- ⚠️ Requires CLI installation
- ⚠️ More complex setup

#### **Steps**:

1. **Install CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login**:
   ```bash
   fly auth login
   ```

3. **Create fly.toml**:
   ```toml
   app = "litellm-proxy"

   [build]
     image = "ghcr.io/berriai/litellm:main-stable"

   [env]
     PORT = "4000"
     STORE_MODEL_IN_DB = "True"
     # ... other non-secret env vars

   [[services]]
     internal_port = 4000
     protocol = "tcp"

     [[services.ports]]
       port = 80
       handlers = ["http"]

     [[services.ports]]
       port = 443
       handlers = ["tls", "http"]
   ```

4. **Set Secrets**:
   ```bash
   fly secrets set DATABASE_URL="postgresql://..."
   fly secrets set LITELLM_MASTER_KEY="sk-..."
   fly secrets set LITELLM_SALT_KEY="sk-..."
   fly secrets set UI_PASSWORD="..."
   ```

5. **Deploy**:
   ```bash
   fly launch
   fly deploy
   ```

---

## 🧪 Testing

### **1. Health Check**

```bash
curl https://your-url.com/health/readiness
```

**Expected**:
```json
{
  "status": "healthy",
  "db": "connected"
}
```

### **2. List Models**

```bash
curl https://your-url.com/v1/models \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
```

**Expected**:
```json
{
  "object": "list",
  "data": [
    {"id": "gpt-3.5-turbo", ...},
    {"id": "gpt-4", ...},
    {"id": "gpt-4-turbo", ...}
  ]
}
```

### **3. Test Chat Completion**

```bash
curl https://your-url.com/v1/chat/completions \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### **4. Access UI**

Open in browser:
```
https://your-url.com/ui
```

Login:
- Username: `admin`
- Password: `admin123!@#`

---

## 🔧 Troubleshooting

### **Issue: Database Connection Failed**

**Error**: `P1001: Can't reach database server` or `Tenant or user not found`

**Solutions**:
1. Check Supabase project is active (not paused)
2. Verify DATABASE_URL is correct
3. Try alternative connection strings:
   ```bash
   # Option 1: Pooled (port 6543)
   postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres
   
   # Option 2: Direct (port 5432)
   postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:5432/postgres
   
   # Option 3: Direct host
   postgresql://postgres:YbACD6ZGV8j5-WY@db.mqlogafnamygvtkpwwbu.supabase.co:5432/postgres
   ```

### **Issue: 502 Bad Gateway**

**Causes**:
- Service still starting (wait 2-3 minutes)
- Environment variables not set
- Docker image failed to start

**Solutions**:
1. Check deployment logs
2. Verify all environment variables are set
3. Redeploy with "Clear build cache"

### **Issue: 401 Unauthorized**

**Causes**:
- Wrong LITELLM_MASTER_KEY
- Missing Authorization header

**Solutions**:
1. Verify LITELLM_MASTER_KEY in environment variables
2. Check Authorization header format: `Bearer sk-...`

### **Issue: UI Not Loading**

**Causes**:
- UI_USERNAME or UI_PASSWORD not set
- Service not fully started

**Solutions**:
1. Verify UI_USERNAME and UI_PASSWORD are set
2. Wait 2-3 minutes after deployment
3. Clear browser cache
4. Try incognito mode

### **Issue: Environment Variables Not Applied**

**Render specific**:
1. Update environment variable
2. Click "Save Changes"
3. **Must click "Manual Deploy"** ← Critical!
4. Select "Clear build cache & deploy"

---

## ✅ Production Checklist

### **Security**:
- [ ] Changed LITELLM_MASTER_KEY from default
- [ ] Changed UI_PASSWORD from default
- [ ] Using HTTPS (automatic on most platforms)
- [ ] Restricted database access by IP (optional)
- [ ] Set up database backups

### **Configuration**:
- [ ] All environment variables set correctly
- [ ] DATABASE_URL points to correct database
- [ ] Models configured in database
- [ ] Logging enabled

### **Testing**:
- [ ] Health check returns 200
- [ ] Can list models
- [ ] Can make chat completion request
- [ ] UI accessible and login works
- [ ] Database connection working

### **Monitoring**:
- [ ] Set up uptime monitoring (UptimeRobot, etc.)
- [ ] Configure alerts for errors
- [ ] Monitor database usage
- [ ] Track API usage and costs

### **Documentation**:
- [ ] Document your deployment URL
- [ ] Save all credentials securely
- [ ] Document any custom configurations
- [ ] Create runbook for common issues

---

## 📊 Platform Comparison

| Feature | Render | Railway | Fly.io |
|---------|--------|---------|--------|
| **Free Tier** | 750 hrs/month | $5 credit/month | Limited free |
| **Ease of Use** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Env Vars** | ⚠️ Issues | ✅ Perfect | ✅ Good |
| **Speed** | 🐌 Slow | ⚡ Fast | ⚡ Fast |
| **Sleep** | Yes (free) | No | No |
| **Setup Time** | 10 min | 5 min | 15 min |
| **Recommended** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Recommendation**: Use **Railway.app** for easiest and most reliable deployment.

---

## 📚 Additional Resources

### **Documentation**:
- LiteLLM Docs: https://docs.litellm.ai/
- Supabase Docs: https://supabase.com/docs
- Database Schema: `/usr/database/SCHEMA.md`
- Database Credentials: `/usr/database/CREDENTIALS.md`

### **Support**:
- LiteLLM GitHub: https://github.com/BerriAI/litellm
- Supabase Support: https://supabase.com/support

---

## 🎯 Quick Reference

### **Your URLs**:
- Supabase: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu
- GitHub Repo: https://github.com/max313iq/anos

### **Your Credentials** (Change in production!):
- Master Key: `sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s`
- UI Username: `admin`
- UI Password: `admin123!@#`
- Database Password: `YbACD6ZGV8j5-WY`

### **Common Commands**:
```bash
# Test health
curl https://your-url/health/readiness

# List models
curl https://your-url/v1/models -H "Authorization: Bearer YOUR_KEY"

# Test chat
curl https://your-url/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test"}]}'
```

---

**Last Updated**: 2025-10-18  
**Status**: ✅ Ready for deployment  
**Recommended Platform**: Railway.app

🚀 **Ready to deploy? Choose a platform above and follow the steps!**
