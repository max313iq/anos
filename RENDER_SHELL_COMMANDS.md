# Render Shell Commands - Check Environment Variables

You're inside the Render Docker container shell. Here's how to check and fix things:

---

## 🔍 Check Environment Variables

### **Check if DATABASE_URL is set**:
```bash
echo $DATABASE_URL
```

**Expected output**:
```
postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

**If it shows the OLD URL or nothing**, your environment variables aren't applied!

---

### **Check all LiteLLM environment variables**:
```bash
env | grep -E "DATABASE_URL|LITELLM|UI_|STORE_|DISABLE_|SET_VERBOSE|PROXY_BUDGET"
```

This will show all relevant environment variables.

---

### **Check if variables are set**:
```bash
echo "DATABASE_URL: $DATABASE_URL"
echo "LITELLM_MASTER_KEY: $LITELLM_MASTER_KEY"
echo "LITELLM_SALT_KEY: $LITELLM_SALT_KEY"
echo "UI_USERNAME: $UI_USERNAME"
echo "UI_PASSWORD: $UI_PASSWORD"
```

---

## 🔧 Create .env File (If Needed)

### **Create .env file**:
```bash
cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres
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
EOF
```

### **Verify .env file was created**:
```bash
cat .env
```

---

## 🧪 Test Database Connection

### **Test connection with psql**:
```bash
psql "$DATABASE_URL" -c "SELECT 1 as test;"
```

**Expected output**:
```
 test 
------
    1
(1 row)
```

---

## 📊 Check LiteLLM Process

### **Check if LiteLLM is running**:
```bash
ps aux | grep litellm
```

### **Check listening ports**:
```bash
netstat -tlnp | grep 4000
```

or

```bash
ss -tlnp | grep 4000
```

---

## 🔍 Check Configuration Files

### **Check if proxy_config.yaml exists**:
```bash
ls -la /app/proxy_config.yaml
```

### **View proxy_config.yaml**:
```bash
cat /app/proxy_config.yaml
```

### **Check for any config files**:
```bash
find /app -name "*.yaml" -o -name "*.yml"
```

---

## 🚨 IMPORTANT: Environment Variables in Docker

**In Docker containers, you CANNOT change environment variables from inside the shell!**

Environment variables are set when the container **starts**.

To change them:
1. ❌ **Cannot** change from inside container shell
2. ✅ **Must** update in Render dashboard
3. ✅ **Must** redeploy the service

---

## 🔧 What You Should Do

### **If DATABASE_URL is WRONG**:

1. **Exit the shell**:
   ```bash
   exit
   ```

2. **Go to Render Dashboard**:
   - https://dashboard.render.com
   - Click your service
   - Environment tab
   - Update DATABASE_URL
   - Save Changes
   - **Manual Deploy** → **Clear build cache & deploy**

3. **Wait 8-10 minutes** for redeploy

---

## 📊 Check Current Database URL

Run this to see what DATABASE_URL is currently set:

```bash
echo "Current DATABASE_URL:"
echo "$DATABASE_URL"
echo ""
echo "Expected DATABASE_URL:"
echo "postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
echo ""
if [ "$DATABASE_URL" = "postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres" ]; then
  echo "✅ DATABASE_URL is CORRECT!"
else
  echo "❌ DATABASE_URL is WRONG! Update in Render dashboard and redeploy."
fi
```

---

## 🔍 Check Logs

### **View recent logs**:
```bash
tail -f /var/log/*.log
```

or

```bash
journalctl -u litellm -f
```

---

## 🎯 Quick Diagnostic Script

Run this to check everything:

```bash
echo "=== LiteLLM Environment Check ==="
echo ""
echo "1. DATABASE_URL:"
echo "$DATABASE_URL" | sed 's/:.*@/:***@/'  # Hide password
echo ""
echo "2. LITELLM_MASTER_KEY:"
if [ -n "$LITELLM_MASTER_KEY" ]; then
  echo "✅ Set (${#LITELLM_MASTER_KEY} characters)"
else
  echo "❌ NOT SET"
fi
echo ""
echo "3. UI_USERNAME:"
echo "${UI_USERNAME:-NOT SET}"
echo ""
echo "4. UI_PASSWORD:"
if [ -n "$UI_PASSWORD" ]; then
  echo "✅ Set"
else
  echo "❌ NOT SET"
fi
echo ""
echo "5. PORT:"
echo "${PORT:-NOT SET}"
echo ""
echo "6. STORE_MODEL_IN_DB:"
echo "${STORE_MODEL_IN_DB:-NOT SET}"
echo ""
echo "=== End Check ==="
```

---

## 🚀 Restart LiteLLM (If Running)

### **Find LiteLLM process**:
```bash
ps aux | grep litellm | grep -v grep
```

### **Kill and restart** (if needed):
```bash
pkill -f litellm
litellm --port 4000 --host 0.0.0.0 --detailed_debug &
```

**Note**: This is temporary! Changes will be lost on next deploy.

---

## ✅ What You Should See

If environment variables are correct:

```bash
$ echo $DATABASE_URL
postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres

$ echo $LITELLM_MASTER_KEY
sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s

$ echo $UI_USERNAME
admin
```

---

## 🎯 Summary

**You're in the Docker container shell.**

**To check env vars**:
```bash
echo $DATABASE_URL
```

**To fix env vars**:
1. Exit shell
2. Update in Render dashboard
3. Redeploy service

**You CANNOT permanently change env vars from inside the container!**

---

**Run this command now to check your DATABASE_URL**:
```bash
echo $DATABASE_URL
```

Tell me what it shows! 🔍
