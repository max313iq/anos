# Fix Render Multiple Instances & Environment Variables

## 🚨 Problem 1: Two Instances Running

You have **2 instances** of your service running. This causes:
- ❌ Double resource usage
- ❌ Confusion about which one is working
- ❌ Wasted free tier hours
- ❌ Environment variables not syncing

---

## ✅ Solution: Delete Duplicate Services

### **Step 1: Check Your Services**

1. Go to: https://dashboard.render.com
2. Look at your services list
3. You probably see:
   - `litellm-proxy` (Instance 1)
   - `litellm-proxy-XXXX` (Instance 2)
   - Or two services with similar names

### **Step 2: Delete Extra Service**

1. Click on the **older** or **duplicate** service
2. Scroll down in left sidebar
3. Click **"Settings"**
4. Scroll to bottom
5. Click **"Delete Web Service"**
6. Type the service name to confirm
7. Click **"Delete"**

### **Step 3: Keep Only ONE Service**

Keep the service that:
- Has the correct environment variables
- Is most recently deployed
- Has the URL you want to use

---

## 🚨 Problem 2: Environment Variables Not Applied

Environment variables don't apply automatically. You must **redeploy** after changing them.

---

## ✅ Solution: Properly Update Environment Variables

### **Step 1: Go to Your Service**
https://dashboard.render.com → Click your service

### **Step 2: Update Environment Variables**

1. Click **"Environment"** tab (left sidebar)
2. For **each variable**, click **"Edit"**
3. Update the value
4. Click **"Save"**

**IMPORTANT**: After saving ALL variables, you MUST redeploy!

### **Step 3: Force Redeploy**

**Option A: Manual Deploy** (Recommended)
1. Click **"Manual Deploy"** button (top right)
2. Select **"Clear build cache & deploy"**
3. Click **"Deploy"**

**Option B: Trigger Redeploy**
1. Make any small change to your repo (add a space to README)
2. Commit and push
3. Render will auto-deploy

---

## 🔍 Why Environment Variables Don't Apply

### **Common Mistakes**:

1. **Not redeploying after changes** ❌
   - Changing env vars doesn't restart the service
   - You MUST click "Manual Deploy"

2. **Using Blueprint deployment** ❌
   - Blueprint caches environment variables
   - Hard to update
   - Better to use Web Service directly

3. **Typos in variable names** ❌
   - `DATABASE_URL` ✅
   - `DATABASE_URl` ❌ (lowercase L)
   - `DATABASEURL` ❌ (no underscore)

4. **Extra spaces** ❌
   - `postgresql://...` ✅
   - ` postgresql://...` ❌ (space at start)
   - `postgresql://... ` ❌ (space at end)

---

## ✅ Correct Way to Update Environment Variables

### **Step-by-Step**:

1. **Go to Environment tab**
2. **Update DATABASE_URL**:
   ```
   postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres
   ```
3. **Click "Save Changes"**
4. **Wait for "Saved" confirmation**
5. **Click "Manual Deploy"** (top right)
6. **Select "Clear build cache & deploy"**
7. **Wait 5-8 minutes**

---

## 🔧 Clean Slate Solution (Recommended)

If you're having too many issues, start fresh:

### **Step 1: Delete ALL Services**
1. Go to each service
2. Settings → Delete Web Service
3. Delete all litellm services

### **Step 2: Create New Service (Correct Way)**

1. Click **"New +"** → **"Web Service"**
2. **Deploy an existing image from a registry**
3. **Image URL**: `ghcr.io/berriai/litellm:main-stable`
4. **Name**: `litellm-proxy`
5. **Region**: Oregon (or closest to you)
6. **Plan**: Starter (Free)

### **Step 3: Add Environment Variables (One by One)**

Click **"Advanced"** → Add each variable:

```
DATABASE_URL
postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

```
LITELLM_MASTER_KEY
sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s
```

```
LITELLM_SALT_KEY
sk-a1b2c3d4e5f6
```

```
PORT
4000
```

```
STORE_MODEL_IN_DB
True
```

```
UI_USERNAME
admin
```

```
UI_PASSWORD
admin123!@#
```

```
STORE_PROMPTS_IN_SPEND_LOGS
True
```

```
DISABLE_SPEND_LOGS
False
```

```
DISABLE_ERROR_LOGS
False
```

```
SET_VERBOSE
True
```

```
PROXY_BUDGET_RESCHEDULER_MIN_TIME
60
```

```
PROXY_BUDGET_RESCHEDULER_MAX_TIME
60
```

### **Step 4: Set Docker Command**

In **"Docker Command"** field:
```bash
litellm --port 4000 --host 0.0.0.0 --detailed_debug
```

### **Step 5: Create Web Service**

Click **"Create Web Service"** and wait 8-10 minutes.

---

## 🔍 How to Verify Environment Variables Are Applied

### **Method 1: Check Logs**

After deployment, check logs for:
```
✅ DATABASE_URL is set
✅ LITELLM_MASTER_KEY is set
✅ Connected to database at aws-1-us-east-2.pooler.supabase.com
```

### **Method 2: Check Environment Tab**

1. Go to Environment tab
2. Verify each variable shows the correct value
3. Look for "Last updated" timestamp

### **Method 3: Test the Service**

```bash
curl https://your-url.onrender.com/health/readiness
```

If it returns `{"status": "healthy", "db": "connected"}`, env vars are working!

---

## 📊 Render Instance Settings

### **Check Instance Count**

1. Go to your service
2. Click **"Settings"** tab
3. Scroll to **"Scaling"** section
4. **Instance Count**: Should be **1** (not 2)

If it shows 2:
1. Change to **1**
2. Click **"Save Changes"**
3. Render will scale down to 1 instance

---

## 🎯 Why You Have 2 Instances

### **Possible Reasons**:

1. **Auto-scaling enabled** (Pro plan feature)
   - Free tier shouldn't auto-scale
   - Check Settings → Scaling

2. **Created service twice**
   - Deployed from Blueprint
   - Then created manual Web Service
   - Both are running

3. **Failed deployment kept running**
   - Old instance didn't stop
   - New instance started
   - Both running simultaneously

---

## ✅ Final Checklist

- [ ] Delete duplicate/extra services
- [ ] Keep only ONE service
- [ ] Verify instance count is 1
- [ ] Update all environment variables
- [ ] Click "Save Changes" after each update
- [ ] Click "Manual Deploy" → "Clear build cache & deploy"
- [ ] Wait for deployment to complete
- [ ] Check logs for success messages
- [ ] Test health endpoint
- [ ] Verify only 1 instance running

---

## 🆘 Quick Fix Commands

### **Check Your Services**
```
Go to: https://dashboard.render.com
Count how many "litellm" services you see
```

### **Delete Extra Services**
```
For each extra service:
1. Click service
2. Settings (bottom left)
3. Scroll to bottom
4. Delete Web Service
```

### **Verify Environment Variables**
```
1. Click your service
2. Environment tab
3. Check DATABASE_URL value
4. Should be: postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

### **Force Redeploy**
```
1. Manual Deploy button (top right)
2. Clear build cache & deploy
3. Wait 8 minutes
```

---

## 🎯 Expected Result

After fixing:
- ✅ Only 1 service running
- ✅ Only 1 instance in that service
- ✅ Environment variables applied
- ✅ Database connected
- ✅ Service responding to requests

---

**Action Required**: 
1. Delete extra services NOW
2. Update environment variables
3. Redeploy with "Clear build cache"

This will fix both issues! 🚀
