# Fix Database Connection Error

## ❌ Current Error

```
Error: P1001: Can't reach database server at `db.mqlogafnamygvtkpwwbu.supabase.co`:`5432`
```

---

## ✅ Solution: Update DATABASE_URL

### **Your Correct Database URLs**

**Option 1: Pooled Connection** (Recommended for Render)
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Option 2: Direct Connection** (Alternative)
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

**Option 3: Direct Host** (If pooler doesn't work)
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@db.mqlogafnamygvtkpwwbu.supabase.co:5432/postgres
```

---

## 🔧 Fix in Render Dashboard

### **Method 1: Update Environment Variable**

1. **Go to Render Dashboard**
   - https://dashboard.render.com

2. **Select Your Service**
   - Click on "litellm-proxy"

3. **Go to Environment Tab**
   - Click "Environment" in left sidebar

4. **Find DATABASE_URL**
   - Scroll to find DATABASE_URL variable

5. **Update Value**
   - Click "Edit" on DATABASE_URL
   - Replace with:
     ```
     postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres
     ```
   - Click "Save"

6. **Redeploy**
   - Click "Manual Deploy" → "Clear build cache & deploy"

---

## 🔍 Why This Happened

The DATABASE_URL in your Render environment variables is using the **wrong host**:
- ❌ Wrong: `db.mqlogafnamygvtkpwwbu.supabase.co`
- ✅ Correct: `aws-0-us-east-1.pooler.supabase.com`

---

## 📊 How to Get Correct URL from Supabase

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu

2. **Click "Project Settings"** (gear icon)

3. **Click "Database"**

4. **Find "Connection String"**
   - Look for "Connection pooling" section
   - Copy the "Transaction" mode URL
   - Port should be **6543**

5. **Format**:
   ```
   postgresql://postgres.mqlogafnamygvtkpwwbu:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

---

## 🧪 Test Connection

After updating, test with:

```bash
# From your local machine (not Gitpod)
psql "postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres" -c "SELECT 1;"
```

Expected output:
```
 ?column? 
----------
        1
(1 row)
```

---

## 🚀 After Fixing

Once you update the DATABASE_URL in Render:

1. **Wait for deployment** (5-8 minutes)

2. **Check logs** for:
   ```
   ✅ "Connected to database"
   ✅ "Prisma migrate deploy successful"
   ✅ "Uvicorn running on http://0.0.0.0:4000"
   ```

3. **Test health endpoint**:
   ```bash
   curl https://your-render-url.onrender.com/health/readiness
   ```

4. **Should return**:
   ```json
   {
     "status": "healthy",
     "db": "connected"
   }
   ```

---

## 🔄 If Still Failing

### **Try Alternative URLs**

**Option A: Direct Connection (Port 5432)**
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

**Option B: Direct Host**
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@db.mqlogafnamygvtkpwwbu.supabase.co:5432/postgres
```

**Option C: IPv6 Disabled**
```
postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### **Check Supabase Status**

1. Go to: https://status.supabase.com/
2. Verify all systems operational
3. Check your project is active

### **Verify Credentials**

1. Login to Supabase dashboard
2. Settings → Database
3. Verify password hasn't changed
4. Reset password if needed

---

## 📝 Summary

**Problem**: Wrong database host in DATABASE_URL  
**Solution**: Update to `aws-0-us-east-1.pooler.supabase.com:6543`  
**Where**: Render Dashboard → Environment → DATABASE_URL  
**Then**: Redeploy service  

---

**Status**: Ready to fix! Update the DATABASE_URL in Render and redeploy. 🚀
