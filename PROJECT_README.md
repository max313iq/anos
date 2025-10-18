# 🚀 LiteLLM Proxy - Production Ready Deployment

**Your complete LiteLLM proxy setup with Supabase database integration.**

---

## 📊 Project Status

- ✅ **Database**: Supabase PostgreSQL (Active)
- ✅ **Models**: gpt-3.5-turbo, gpt-4, gpt-4-turbo
- ✅ **Configuration**: Complete
- ✅ **Documentation**: Comprehensive
- ✅ **Ready**: For deployment

---

## 🎯 Quick Start

### **1. Deploy** (Choose One):

**Option A: Railway.app** ⭐ Recommended
```bash
1. Go to: https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select: max313iq/anos
5. Add environment variables
6. Deploy!
```

**Option B: Render.com**
```bash
1. Go to: https://dashboard.render.com
2. New + → Web Service
3. Image: ghcr.io/berriai/litellm:main-stable
4. Add environment variables
5. Deploy!
```

**Full Guide**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### **2. Test**:
```bash
curl https://your-url/health/readiness
```

### **3. Use**:
```bash
curl https://your-url/v1/chat/completions \
  -H "Authorization: Bearer YOUR_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Hello!"}]}'
```

---

## 📚 Documentation

### **Essential Guides**:
- 🚀 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- 📋 **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - All documentation
- 🗄️ **[/usr/database/](/usr/database/)** - Database documentation

### **Quick Links**:
- [Testing Guide](TEST_DEPLOYMENT.md)
- [Troubleshooting](FIX_RENDER_INSTANCES.md)
- [Database Setup](/usr/database/README.md)

---

## ⚙️ Configuration

### **Environment Variables**:

```bash
# Database
DATABASE_URL=postgresql://postgres.mqlogafnamygvtkpwwbu:YbACD6ZGV8j5-WY@aws-1-us-east-2.pooler.supabase.com:6543/postgres

# Authentication
LITELLM_MASTER_KEY=sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s
LITELLM_SALT_KEY=sk-a1b2c3d4e5f6

# Server
PORT=4000
STORE_MODEL_IN_DB=True

# UI
UI_USERNAME=admin
UI_PASSWORD=admin123!@#

# Logging
STORE_PROMPTS_IN_SPEND_LOGS=True
DISABLE_SPEND_LOGS=False
DISABLE_ERROR_LOGS=False
SET_VERBOSE=True
```

⚠️ **Change `LITELLM_MASTER_KEY` and `UI_PASSWORD` in production!**

### **Models Configured**:
- ✅ gpt-3.5-turbo
- ✅ gpt-4
- ✅ gpt-4-turbo

---

## 🗄️ Database

**Provider**: Supabase PostgreSQL  
**Project**: mqlogafnamygvtkpwwbu  
**Region**: US East 2  
**Status**: ✅ Active

**Dashboard**: https://supabase.com/dashboard/project/mqlogafnamygvtkpwwbu

**Documentation**: [/usr/database/](/usr/database/)

---

## 🔧 Development

### **Local Setup**:

```bash
# Install dependencies
poetry install

# Set environment variables
export $(cat .env.proxy | xargs)

# Run locally
poetry run litellm --config proxy_config.yaml --port 4000
```

### **Testing**:

```bash
# Run tests
make test

# Lint code
make lint

# Format code
make format
```

---

## 📦 Project Structure

```
.
├── DEPLOYMENT_GUIDE.md          # Main deployment guide
├── DOCUMENTATION_INDEX.md       # Documentation hub
├── Dockerfile.render            # Docker configuration
├── proxy_config.yaml            # LiteLLM configuration
├── render.yaml                  # Render service config
├── /usr/database/               # Database documentation
│   ├── INDEX.md                 # Database docs hub
│   ├── SCHEMA.md                # Table schemas
│   ├── CREDENTIALS.md           # Access credentials
│   ├── BACKUP.md                # Backup procedures
│   └── MIGRATION.md             # Migration guide
├── litellm/                     # LiteLLM source code
└── tests/                       # Test suites
```

---

## 🎯 Features

### **Core Features**:
- ✅ OpenAI-compatible API
- ✅ Multiple LLM providers support
- ✅ Request/response logging
- ✅ Spend tracking
- ✅ Rate limiting
- ✅ Budget management
- ✅ Admin UI dashboard

### **Database Features**:
- ✅ PostgreSQL with Supabase
- ✅ Automatic migrations
- ✅ Spend logs
- ✅ Error logs
- ✅ Model management
- ✅ User management

### **Security Features**:
- ✅ API key authentication
- ✅ Master key authorization
- ✅ Encrypted credentials
- ✅ HTTPS support
- ✅ Rate limiting

---

## 🔐 Security

### **Production Checklist**:
- [ ] Change `LITELLM_MASTER_KEY`
- [ ] Change `UI_PASSWORD`
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure rate limits
- [ ] Monitor API usage

### **Credentials Management**:
- ⚠️ Never commit `.env.proxy` to git
- ⚠️ Use environment variables in production
- ⚠️ Rotate keys regularly
- ⚠️ Use secret managers for sensitive data

---

## 📊 Monitoring

### **Health Checks**:
```bash
# Readiness
curl https://your-url/health/readiness

# Liveness
curl https://your-url/health/liveliness

# Metrics
curl https://your-url/metrics
```

### **Logs**:
- Platform logs (Render/Railway/Fly.io)
- Database logs (Supabase)
- Application logs (LiteLLM)

---

## 🆘 Troubleshooting

### **Common Issues**:

**Database Connection Failed**:
- Check: [SUPABASE_FIX.md](SUPABASE_FIX.md)
- Verify: DATABASE_URL is correct
- Test: Connection with [test_supabase.py](test_supabase.py)

**Multiple Services Running**:
- Read: [RENDER_BLUEPRINT_ISSUE.md](RENDER_BLUEPRINT_ISSUE.md)
- Fix: [FIX_RENDER_INSTANCES.md](FIX_RENDER_INSTANCES.md)

**Environment Variables Not Applied**:
- Must redeploy after changing
- See: [FIX_RENDER_INSTANCES.md](FIX_RENDER_INSTANCES.md)

**Full Troubleshooting**: [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

## 🔄 Updates

### **Updating Deployment**:
1. Update environment variables in platform
2. Click "Manual Deploy" or push to GitHub
3. Wait for deployment
4. Test endpoints

### **Updating Configuration**:
1. Edit `proxy_config.yaml`
2. Commit and push
3. Platform auto-deploys
4. Verify changes

---

## 📞 Support

### **Documentation**:
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Deployment help
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - All docs
- [/usr/database/](/usr/database/) - Database help

### **External Resources**:
- LiteLLM: https://docs.litellm.ai/
- Supabase: https://supabase.com/docs
- GitHub Issues: https://github.com/BerriAI/litellm/issues

---

## 📝 License

This project uses LiteLLM which is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **LiteLLM**: https://github.com/BerriAI/litellm
- **Supabase**: https://supabase.com
- **Community**: All contributors and users

---

## 🚀 Getting Started

1. **Read**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. **Choose**: Deployment platform (Railway recommended)
3. **Deploy**: Follow platform-specific steps
4. **Test**: Use [TEST_DEPLOYMENT.md](TEST_DEPLOYMENT.md)
5. **Use**: Start making API requests!

---

**Status**: ✅ Production Ready  
**Last Updated**: 2025-10-18  
**Version**: 1.0.0

🎉 **Ready to deploy your LiteLLM proxy!**
