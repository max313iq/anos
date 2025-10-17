# 🚀 Deploy LiteLLM to Render.com

Complete guide to deploy your LiteLLM proxy to Render.com with all your settings.

---

## 📋 Prerequisites

- GitHub account
- Render.com account (free tier available)
- Your configuration files (already created!)

---

## 🎯 Quick Deploy (3 Methods)

### **Method 1: One-Click Deploy** (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add Dockerfile.render proxy_config.yaml render-blueprint.yaml
   git commit -m "Add Render deployment config"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy to Render**:
   - Go to [render.com/dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Select the repository
   - Click **"Apply"**
   - Wait 5-10 minutes for deployment

3. **Done!** Your LiteLLM proxy will be live at:
   ```
   https://litellm-proxy.onrender.com
   ```

---

### **Method 2: Manual Web Service** (More Control)

1. **Push files to GitHub** (same as Method 1)

2. **Create Web Service**:
   - Go to [render.com/dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `litellm-proxy`
     - **Region**: Oregon (or closest to you)
     - **Branch**: `main`
     - **Runtime**: Docker
     - **Dockerfile Path**: `./Dockerfile.render`
     - **Plan**: Starter (Free) or Standard ($7/month)

3. **Add Environment Variables**:
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these variables:
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

4. **Deploy**:
   - Click **"Create Web Service"**
   - Wait 5-10 minutes

---

### **Method 3: Using Render CLI**

1. **Install Render CLI**:
   ```bash
   npm install -g @render/cli
   ```

2. **Login**:
   ```bash
   render login
   ```

3. **Deploy**:
   ```bash
   render blueprint launch
   ```

---

## 🔧 Configuration Files Created

### ✅ `Dockerfile.render`
- Uses Python 3.11
- Installs LiteLLM with proxy support
- Includes health checks
- Optimized for Render

### ✅ `proxy_config.yaml`
- Your 3 models (gpt-3.5-turbo, gpt-4, gpt-4-turbo)
- Database configuration
- Logging enabled
- Budget management

### ✅ `render-blueprint.yaml`
- Complete Render configuration
- All environment variables
- Health check endpoint
- Auto-deploy enabled

---

## 🌐 After Deployment

### **Your URLs**:
- **API**: `https://litellm-proxy.onrender.com`
- **UI Dashboard**: `https://litellm-proxy.onrender.com/ui`
- **Health Check**: `https://litellm-proxy.onrender.com/health/readiness`
- **Models**: `https://litellm-proxy.onrender.com/v1/models`

### **Test Your Deployment**:

```bash
# Check health
curl https://litellm-proxy.onrender.com/health/readiness

# List models
curl https://litellm-proxy.onrender.com/v1/models \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"

# Test chat completion
curl https://litellm-proxy.onrender.com/v1/chat/completions \
  -H "Authorization: Bearer sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### **Access UI Dashboard**:
1. Go to: `https://litellm-proxy.onrender.com/ui`
2. Login with:
   - Username: `admin`
   - Password: `admin123!@#`

---

## 📊 Your Data

### **Database Connection**:
- ✅ Automatically connects to your Supabase database
- ✅ All existing data preserved (models, spend, logs)
- ✅ No migration needed

### **What's Available**:
- Models: gpt-3.5-turbo, gpt-5-codex, gpt-5
- Total spend: $0.007093
- All API keys
- All logs

---

## 💰 Pricing

### **Render Plans**:
- **Starter (Free)**: 
  - 750 hours/month
  - Sleeps after 15 min inactivity
  - Good for testing
  
- **Standard ($7/month)**:
  - Always on
  - No sleep
  - Better for production

### **Supabase Database**:
- Free tier: 500MB (you're using minimal space)
- No additional cost

---

## 🔒 Security Recommendations

### **Before Going to Production**:

1. **Change Master Key**:
   ```bash
   # Generate new key
   openssl rand -base64 32
   
   # Update in Render dashboard:
   # Environment Variables → LITELLM_MASTER_KEY
   ```

2. **Change UI Password**:
   ```bash
   # Update in Render dashboard:
   # Environment Variables → UI_PASSWORD
   ```

3. **Use Render Secrets**:
   - In Render dashboard, mark sensitive variables as "Secret"
   - DATABASE_URL
   - LITELLM_MASTER_KEY
   - LITELLM_SALT_KEY
   - UI_PASSWORD

4. **Enable HTTPS** (automatic on Render)

5. **Set up Custom Domain** (optional):
   - Render dashboard → Settings → Custom Domain
   - Add your domain (e.g., `api.yourdomain.com`)

---

## 🐛 Troubleshooting

### **Deployment Failed**:
1. Check Render logs: Dashboard → Logs
2. Verify Dockerfile.render exists
3. Check environment variables are set

### **Database Connection Error**:
1. Verify DATABASE_URL is correct
2. Check Supabase is accessible
3. Test connection from Render:
   ```bash
   # In Render Shell
   psql $DATABASE_URL -c "SELECT 1"
   ```

### **UI Not Loading**:
1. Check UI_USERNAME and UI_PASSWORD are set
2. Visit `/health/readiness` to verify server is running
3. Check browser console for errors

### **API Errors**:
1. Verify LITELLM_MASTER_KEY is set
2. Check you're using correct Authorization header
3. Review Render logs for errors

---

## 📈 Monitoring

### **Render Dashboard**:
- View logs in real-time
- Monitor CPU/Memory usage
- Check deployment history
- View metrics

### **Health Checks**:
```bash
# Readiness
curl https://litellm-proxy.onrender.com/health/readiness

# Liveness
curl https://litellm-proxy.onrender.com/health/liveliness

# Metrics
curl https://litellm-proxy.onrender.com/metrics
```

### **Supabase Dashboard**:
- Monitor database usage
- View query performance
- Check connection pool

---

## 🔄 Updates

### **Auto-Deploy**:
- Enabled by default
- Push to GitHub → Automatic deployment
- Takes 5-10 minutes

### **Manual Deploy**:
- Render dashboard → Manual Deploy → Deploy latest commit

### **Rollback**:
- Render dashboard → Deploys → Select previous deploy → Rollback

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [LiteLLM Documentation](https://docs.litellm.ai/)
- [Supabase Documentation](https://supabase.com/docs)

---

## ✅ Deployment Checklist

- [ ] Files pushed to GitHub
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Health check passing
- [ ] UI accessible
- [ ] API working
- [ ] Database connected
- [ ] Master key changed (production)
- [ ] UI password changed (production)
- [ ] Custom domain added (optional)

---

## 🆘 Need Help?

1. Check Render logs first
2. Review this documentation
3. Test locally with Docker:
   ```bash
   docker build -f Dockerfile.render -t litellm-test .
   docker run -p 4000:4000 --env-file .env.proxy litellm-test
   ```

---

**Your LiteLLM proxy is ready to deploy! 🚀**

Choose Method 1 (One-Click) for fastest deployment.
