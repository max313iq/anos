# ✅ CORRECT DATABASE_URL for Your Supabase Project

## 🎯 Your Supabase Project Details

**Project URL**: `https://mqlogafnamygvtkpwwbu.supabase.co`  
**Project ID**: `mqlogafnamygvtkpwwbu`  
**Status**: ✅ ACTIVE

---

## 🔑 Get Your Database Password

### **Step 1: Go to Supabase Dashboard**
https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu

### **Step 2: Get Database Password**
1. Click **"Settings"** (gear icon, bottom left)
2. Click **"Database"** in left sidebar
3. Scroll to **"Connection string"** section
4. You'll see your password there, OR
5. Click **"Reset database password"** to get a new one

**IMPORTANT**: Save the password somewhere safe!

---

## 📝 Build Your DATABASE_URL

### **Format**:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### **Replace `[YOUR_PASSWORD]`** with your actual database password

### **Example** (if your password is `MySecurePass123`):
```
postgresql://postgres.mqlogafnamygvtkpwwbu:MySecurePass123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## 🔧 Update in Render

### **Step 1: Go to Render**
https://dashboard.render.com

### **Step 2: Update DATABASE_URL**
1. Click your **"litellm-proxy"** service
2. Click **"Environment"** tab
3. Find **DATABASE_URL**
4. Click **"Edit"**
5. **Delete the old value**
6. **Paste your new DATABASE_URL** (with correct password)
7. Click **"Save Changes"**

### **Step 3: Redeploy**
1. Click **"Manual Deploy"** (top right)
2. Select **"Deploy latest commit"**
3. Wait 5-8 minutes

---

## 🎯 Alternative: Get Connection String from Supabase

### **Easiest Way**:

1. Go to: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu/settings/database
2. Scroll to **"Connection string"** section
3. Click **"Connection pooling"** tab
4. Select **"Transaction"** mode
5. **Copy the entire string** - it will look like:
   ```
   postgresql://postgres.mqlogafnamygvtkpwwbu.[RANDOM]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
6. Use this EXACT string in Render

---

## 🔍 Why Your Current URL is Wrong

**Current (Wrong)**:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Possible Issues**:
1. Password `Vf498S8C8HY3xNwq` might be wrong/expired
2. User format might need to include random suffix
3. Password might have been reset

---

## ✅ Test Your New Connection

### **Option 1: In Supabase SQL Editor**
1. Go to: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu/editor
2. Click **"New query"**
3. Type: `SELECT 1;`
4. Click **"Run"**

If this works, your database is fine!

### **Option 2: After Updating Render**
Wait for deployment, then test:
```bash
curl https://your-render-url.onrender.com/health/readiness
```

Should return:
```json
{
  "status": "healthy",
  "db": "connected"
}
```

---

## 📊 Complete Render Environment Variables

Make sure you have ALL of these in Render:

```bash
DATABASE_URL
postgresql://postgres.mqlogafnamygvtkpwwbu:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

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

---

## 🎯 Next Steps

1. ✅ Go to Supabase Settings → Database
2. ✅ Get your database password (or reset it)
3. ✅ Build correct DATABASE_URL
4. ✅ Update in Render
5. ✅ Redeploy
6. ✅ Test health endpoint

---

## 🆘 If You Need to Reset Password

### **In Supabase Dashboard**:
1. Settings → Database
2. Scroll to **"Database password"**
3. Click **"Generate a new password"**
4. **COPY AND SAVE IT IMMEDIATELY**
5. Use this new password in your DATABASE_URL

---

## 📝 Quick Reference

**Your Supabase Project**: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu  
**Database Settings**: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu/settings/database  
**Render Dashboard**: https://dashboard.render.com

---

**Action Required**: Get your database password from Supabase and update DATABASE_URL in Render! 🚀
