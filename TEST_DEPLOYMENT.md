# Test Your Render Deployment

Complete testing guide for your LiteLLM deployment on Render.

---

## 🎯 What to Test

After deploying to Render, you need to verify:
1. ✅ Service is running
2. ✅ Database connection works
3. ✅ API endpoints respond
4. ✅ UI is accessible
5. ✅ Data is being logged

---

## 🔍 Step 1: Get Your Render URL

After deployment completes, Render will give you a URL like:
```
https://litellm-proxy.onrender.com
```

Or:
```
https://litellm-proxy-XXXX.onrender.com
```

**Find it in Render Dashboard**:
1. Go to your service
2. Look at the top for the URL
3. Copy it for testing

---

## ✅ Step 2: Test Health Check

### **Test 1: Basic Health**
```bash
# Replace YOUR_RENDER_URL with your actual URL
curl https://YOUR_RENDER_URL.onrender.com/health/readiness
```

**Expected Response**:
```json
{
  "status": "healthy",
  "db": "connected"
}
```

**If you get 502 Bad Gateway**:
- Service is still starting (wait 2-3 minutes)
- Check Render logs for errors
- Verify environment variables are set

---

## 🔑 Step 3: Test API Authentication

### **Test 2: List Models**
```bash
curl https://YOUR_RENDER_URL.onrender.com/v1/models \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
```

**Expected Response**:
```json
{
  "object": "list",
  "data": [
    {
      "id": "gpt-3.5-turbo",
      "object": "model",
      "created": 1234567890,
      "owned_by": "openai"
    },
    {
      "id": "gpt-4",
      "object": "model",
      "created": 1234567890,
      "owned_by": "openai"
    },
    {
      "id": "gpt-4-turbo",
      "object": "model",
      "created": 1234567890,
      "owned_by": "openai"
    }
  ]
}
```

**If you get 401 Unauthorized**:
- Master key is incorrect
- Check LITELLM_MASTER_KEY in Render environment variables

---

## 💬 Step 4: Test Chat Completion

### **Test 3: Simple Chat Request**
```bash
curl https://YOUR_RENDER_URL.onrender.com/v1/chat/completions \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "Say hello!"}
    ]
  }'
```

**Expected Response**:
```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "gpt-3.5-turbo",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 9,
    "total_tokens": 19
  }
}
```

**If you get an error**:
- Check you have OpenAI API key set (if using OpenAI models)
- Verify model name is correct
- Check Render logs for details

---

## 🖥️ Step 5: Test UI Dashboard

### **Test 4: Access UI**

1. **Open in browser**:
   ```
   https://YOUR_RENDER_URL.onrender.com/ui
   ```

2. **Login with**:
   - Username: `admin`
   - Password: `admin123!@#`

3. **What to check**:
   - ✅ Login page loads
   - ✅ Can login successfully
   - ✅ Dashboard shows models
   - ✅ Can see spend data
   - ✅ Can view logs

**If UI doesn't load**:
- Check UI_USERNAME and UI_PASSWORD in environment variables
- Wait 2-3 minutes after deployment
- Check browser console for errors
- Try incognito/private browsing mode

---

## 📊 Step 6: Test Database Connection

### **Test 5: Check Spend Logs**
```bash
curl https://YOUR_RENDER_URL.onrender.com/spend/logs \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
```

**Expected Response**:
```json
[
  {
    "request_id": "...",
    "model": "gpt-3.5-turbo",
    "spend": 0.000015,
    "total_tokens": 19,
    "startTime": "2025-10-18T00:00:00Z"
  }
]
```

### **Test 6: Check Global Spend**
```bash
curl https://YOUR_RENDER_URL.onrender.com/global/spend \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
```

**Expected Response**:
```json
{
  "total_spend": 0.007093
}
```

**If database tests fail**:
- Check DATABASE_URL in Render environment variables
- Verify Supabase database is accessible
- Check Render logs for connection errors

---

## 🔧 Step 7: Test from Code

### **Python Test**
```python
import requests

# Your Render URL
BASE_URL = "https://YOUR_RENDER_URL.onrender.com"
API_KEY = "sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"

# Test health
response = requests.get(f"{BASE_URL}/health/readiness")
print(f"Health: {response.status_code}")

# Test chat
response = requests.post(
    f"{BASE_URL}/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello!"}]
    }
)
print(f"Chat: {response.status_code}")
print(response.json())
```

### **JavaScript Test**
```javascript
const BASE_URL = "https://YOUR_RENDER_URL.onrender.com";
const API_KEY = "sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s";

// Test health
fetch(`${BASE_URL}/health/readiness`)
  .then(res => res.json())
  .then(data => console.log("Health:", data));

// Test chat
fetch(`${BASE_URL}/v1/chat/completions`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello!"}]
  })
})
  .then(res => res.json())
  .then(data => console.log("Chat:", data));
```

---

## 📋 Complete Test Checklist

### **Basic Tests**
- [ ] Health check returns 200
- [ ] Can list models
- [ ] Master key authentication works
- [ ] UI loads and login works

### **API Tests**
- [ ] Chat completion works
- [ ] Spend logs are recorded
- [ ] Global spend is tracked
- [ ] Error handling works

### **Database Tests**
- [ ] Can read from database
- [ ] Can write to database
- [ ] Spend is being logged
- [ ] Models are loaded from DB

### **UI Tests**
- [ ] Dashboard loads
- [ ] Can view models
- [ ] Can view spend
- [ ] Can view logs
- [ ] Can create API keys

---

## 🚨 Common Issues

### **502 Bad Gateway**
**Cause**: Service not ready or crashed  
**Fix**:
1. Wait 2-3 minutes
2. Check Render logs
3. Verify environment variables
4. Redeploy if needed

### **401 Unauthorized**
**Cause**: Wrong API key  
**Fix**:
1. Check LITELLM_MASTER_KEY in Render
2. Verify key in request header
3. No extra spaces in key

### **Database Connection Error**
**Cause**: Can't connect to Supabase  
**Fix**:
1. Check DATABASE_URL is correct
2. Verify Supabase project is active
3. Check network connectivity
4. Try direct connection (port 5432)

### **UI Not Loading**
**Cause**: Missing UI credentials  
**Fix**:
1. Set UI_USERNAME in Render
2. Set UI_PASSWORD in Render
3. Redeploy service
4. Clear browser cache

---

## 📊 Performance Tests

### **Load Test**
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test 100 requests, 10 concurrent
ab -n 100 -c 10 \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s" \
  https://YOUR_RENDER_URL.onrender.com/health/readiness
```

### **Response Time Test**
```bash
# Test response time
time curl https://YOUR_RENDER_URL.onrender.com/health/readiness
```

---

## 📝 Test Results Template

```
=== LiteLLM Render Deployment Test Results ===

Date: 2025-10-18
URL: https://YOUR_RENDER_URL.onrender.com

BASIC TESTS:
[ ] Health Check: _____ (200 expected)
[ ] List Models: _____ (200 expected)
[ ] Authentication: _____ (works/fails)

API TESTS:
[ ] Chat Completion: _____ (200 expected)
[ ] Spend Logs: _____ (200 expected)
[ ] Global Spend: _____ (shows $0.007093)

UI TESTS:
[ ] UI Loads: _____ (yes/no)
[ ] Login Works: _____ (yes/no)
[ ] Dashboard: _____ (yes/no)

DATABASE TESTS:
[ ] Read Data: _____ (yes/no)
[ ] Write Data: _____ (yes/no)
[ ] Models Loaded: _____ (3 models)

PERFORMANCE:
[ ] Response Time: _____ ms
[ ] Concurrent Requests: _____ (pass/fail)

ISSUES FOUND:
- 
- 

NOTES:
- 
- 

Status: ✅ PASS / ❌ FAIL
```

---

## 🎯 Next Steps After Testing

### **If All Tests Pass** ✅
1. Change master key (security)
2. Change UI password (security)
3. Add your OpenAI API key (if using OpenAI)
4. Configure custom domain (optional)
5. Set up monitoring
6. Start using in production

### **If Tests Fail** ❌
1. Check Render logs first
2. Verify all environment variables
3. Test database connection separately
4. Review this guide's troubleshooting section
5. Check `/usr/database/` documentation

---

**Ready to test?** Start with Step 1 and work through each test!

Let me know your Render URL and I can help you test it! 🚀
