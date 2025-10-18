# Fix Supabase "Tenant or user not found" Error

## ✅ Good News

Your LiteLLM service **IS RUNNING**! 
- Health checks are passing: `200 OK`
- Server is responding
- Only the database connection needs fixing

---

## ❌ The Problem

```
FATAL: Tenant or user not found
```

This means Supabase doesn't recognize your connection credentials.

---

## 🔍 Possible Causes

1. **Supabase project is paused** (free tier auto-pauses after inactivity)
2. **Wrong connection string format**
3. **Password changed**
4. **Project deleted or moved**

---

## ✅ SOLUTION: Get Fresh Credentials from Supabase

### **Step 1: Check Supabase Project Status**

1. Go to: https://supabase.com/dashboard
2. Find project: `mqlogafnamygvtkpwwbu`
3. Check if it shows **"Paused"** or **"Active"**

**If Paused**:
- Click **"Restore"** or **"Resume"**
- Wait 2-3 minutes for it to wake up

### **Step 2: Get Correct Connection String**

1. In Supabase dashboard, click your project
2. Click **"Project Settings"** (gear icon, bottom left)
3. Click **"Database"** in left sidebar
4. Scroll to **"Connection string"** section
5. Select **"Connection pooling"** tab
6. Mode: **"Transaction"**
7. Copy the connection string

**It should look like**:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### **Step 3: Get Your Database Password**

In the same Database settings page:
1. Scroll to **"Database password"**
2. Click **"Reset database password"** if you don't know it
3. Copy the new password
4. **IMPORTANT**: Save it somewhere safe!

### **Step 4: Build New Connection String**

Format:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Replace `[PASSWORD]` with your actual password (no brackets).

**Example**:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:MyNewPassword123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## 🔧 Update in Render

### **Step 1: Go to Render Dashboard**
https://dashboard.render.com

### **Step 2: Update DATABASE_URL**

1. Click your **"litellm-proxy"** service
2. Click **"Environment"** tab
3. Find **DATABASE_URL**
4. Click **"Edit"**
5. Paste your **new connection string** from Supabase
6. Click **"Save Changes"**

### **Step 3: Redeploy**

1. Click **"Manual Deploy"**
2. Select **"Deploy latest commit"**
3. Wait 3-5 minutes

---

## 🧪 Test Connection Locally

From your local machine (not Gitpod), test the connection:

```bash
# Replace with your actual connection string
psql "postgresql://postgres.mqlogafnamygvtkpwwbu:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres" -c "SELECT 1;"
```

**Expected output**:
```
 ?column? 
----------
        1
(1 row)
```

**If this fails**, your Supabase credentials are definitely wrong.

---

## 📊 Alternative Connection Strings to Try

### **Option 1: Direct Connection (Port 5432)**
```
postgresql://postgres.mqlogafnamygvtkpwwbu:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### **Option 2: Session Mode**
```
postgresql://postgres.mqlogafnamygvtkpwwbu:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

### **Option 3: Direct Host (No Pooler)**
```
postgresql://postgres.mqlogafnamygvtkpwwbu:[PASSWORD]@db.mqlogafnamygvtkpwwbu.supabase.co:5432/postgres
```

---

## 🔍 Verify Supabase Project Details

### **Check Project ID**

In Supabase dashboard:
1. Settings → General
2. **Reference ID**: Should be `mqlogafnamygvtkpwwbu`

If it's different, your project ID changed!

### **Check Region**

1. Settings → General
2. **Region**: Should be `us-east-1`

If different, update the host in your connection string.

---

## 🆘 If Supabase Project is Gone

If you can't find the project `mqlogafnamygvtkpwwbu`:

### **Option A: Create New Supabase Project**

1. Go to: https://supabase.com/dashboard
2. Click **"New Project"**
3. Name: `litellm-production`
4. Region: **US East (N. Virginia)**
5. Database Password: (create strong password)
6. Click **"Create new project"**
7. Wait 2-3 minutes

### **Option B: Use Your Data**

Your data is in `/usr/database/` documentation:
- Models: gpt-3.5-turbo, gpt-5-codex, gpt-5
- Spend: $0.007093
- You can recreate this in a new database

---

## ✅ After Fixing

### **Check Render Logs**

You should see:
```
✅ "Connected to database"
✅ "Prisma migrate deploy successful"
✅ "Database connection established"
```

### **Test API**

```bash
curl https://your-render-url.onrender.com/v1/models \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
```

Should return your models list.

---

## 📝 Quick Checklist

- [ ] Check Supabase project is active (not paused)
- [ ] Get fresh connection string from Supabase
- [ ] Verify database password
- [ ] Test connection locally with psql
- [ ] Update DATABASE_URL in Render
- [ ] Redeploy service
- [ ] Check logs for success
- [ ] Test API endpoints

---

## 🎯 Most Likely Issue

Your Supabase free tier project **auto-paused** after 7 days of inactivity.

**Fix**: 
1. Go to Supabase dashboard
2. Click **"Resume"** on your project
3. Wait 2 minutes
4. Redeploy Render service

---

## 💡 Pro Tip

To prevent auto-pausing:
1. Upgrade to Supabase Pro ($25/month)
2. Or set up a cron job to ping your database every 6 days

---

**Next Step**: Go to Supabase dashboard NOW and check if your project is paused! 🚀
