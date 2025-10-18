# URGENT: Fix Render Database Connection

## 🚨 Problem

Render is **ignoring** the DATABASE_URL environment variable and using a default/cached value.

---

## ✅ Solution: Use Web Service (Not Blueprint)

### **Step 1: Delete Current Service**

1. Go to Render Dashboard
2. Click on "litellm-proxy" service
3. Go to **Settings** (bottom of left sidebar)
4. Scroll to bottom
5. Click **"Delete Web Service"**
6. Confirm deletion

### **Step 2: Create New Web Service**

1. Click **"New +"** → **"Web Service"**

2. **Connect Repository**:
   - Select: `max313iq/anos`
   - Branch: `main`

3. **Configure Service**:
   - **Name**: `litellm-proxy`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Runtime**: **Docker**
   - **Dockerfile Path**: `./Dockerfile.render`
   - **Docker Command**: Leave empty (uses CMD from Dockerfile)

4. **Instance Type**:
   - **Plan**: Starter (Free) or Standard ($7/month)

### **Step 3: Add Environment Variables**

Click **"Advanced"** → **"Add Environment Variable"**

Add these **ONE BY ONE**:

```bash
DATABASE_URL
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres

LITELLM_MASTER_KEY
sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s

LITELLM_SALT_KEY
sk-a1b2c3d4e5f6

PORT
4000

STORE_MODEL_IN_DB
True

UI_USERNAME
admin

UI_PASSWORD
admin123!@#

STORE_PROMPTS_IN_SPEND_LOGS
True

DISABLE_SPEND_LOGS
False

DISABLE_ERROR_LOGS
False

SET_VERBOSE
True

PROXY_BUDGET_RESCHEDULER_MIN_TIME
60

PROXY_BUDGET_RESCHEDULER_MAX_TIME
60
```

### **Step 4: Create Web Service**

1. Click **"Create Web Service"**
2. Wait 8-10 minutes for build and deployment

---

## 🔍 Alternative: Use Docker Image Directly

If the above doesn't work, try this:

### **Create Web Service with Pre-built Image**

1. **New +** → **Web Service**
2. **Deploy an existing image from a registry**
3. **Image URL**: `ghcr.io/berriai/litellm:main-stable`
4. **Name**: `litellm-proxy`
5. **Region**: Oregon
6. **Plan**: Starter

### **Add Environment Variables** (same as above)

### **Add Start Command**:
```bash
litellm --port 4000 --host 0.0.0.0 --detailed_debug
```

---

## 🎯 Why This Happens

The Blueprint deployment might be:
1. Using cached environment variables
2. Not properly passing DATABASE_URL to the container
3. Using a different config file

---

## 📊 After Deployment

### **Check Logs For**:
```
✅ "Connected to database"
✅ "Prisma migrate deploy successful"
✅ "Uvicorn running on http://0.0.0.0:4000"
```

### **Test Health**:
```bash
curl https://your-new-url.onrender.com/health/readiness
```

---

## 🔧 If Still Failing

### **Option 1: Try Direct Connection (Port 5432)**

Update DATABASE_URL to:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### **Option 2: Try Direct Host**

Update DATABASE_URL to:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@db.mqlogafnamygvtkpwwbu.supabase.co:5432/postgres
```

### **Option 3: Add SSL Mode**

Update DATABASE_URL to:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### **Option 4: Check Supabase Project**

1. Go to: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu
2. Settings → Database
3. Copy the **exact** connection string from there
4. Use that in Render

---

## 🚀 Quick Test Script

After deployment, run this to test:

```bash
# Replace with your Render URL
RENDER_URL="https://your-service.onrender.com"

# Test health
curl $RENDER_URL/health/readiness

# Test with master key
curl $RENDER_URL/v1/models \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
```

---

## 📝 Checklist

- [ ] Delete old Blueprint service
- [ ] Create new Web Service
- [ ] Use Dockerfile.render
- [ ] Add all environment variables
- [ ] Verify DATABASE_URL is correct
- [ ] Deploy and wait 10 minutes
- [ ] Check logs for success
- [ ] Test health endpoint
- [ ] Test API with master key

---

**Status**: Ready to redeploy with correct configuration! 🚀
