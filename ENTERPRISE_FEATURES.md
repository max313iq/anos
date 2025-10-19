# LiteLLM Enterprise Features Guide

This document explains the enterprise features available in LiteLLM and how to configure them.

## 🔑 Enterprise License

**Your License**: `34INT32940IUNNMJ` (Already configured in `.env`)

**Note**: Some enterprise features require additional Python packages:
- **Prometheus Metrics**: Requires `pip install prometheus-client`
- **Secret Detection**: Requires valid enterprise license validation

To enable these features on Railway, install the required packages in your deployment.

---

## 📊 Feature Categories

### 1. **Security Features** (Most available without license)

#### ✅ Audit Logs
- **Status**: FREE (no license required)
- **Configuration**: Already enabled in `proxy_config.yaml`
```yaml
general_settings:
  audit_logs_enabled: true
  audit_logs_table_name: "LiteLLM_AuditLog"
```
- **What it does**: Tracks all API requests, responses, and admin actions
- **Storage**: PostgreSQL database (Railway)

#### ✅ Secret Detection/Redaction
- **Status**: FREE (no license required)
- **Configuration**: Enable in `proxy_config.yaml`
```yaml
litellm_settings:
  callbacks: ["hide_secrets"]
```
- **What it does**: Automatically detects and redacts API keys, secrets in requests
- **Example**: `openai_api_key=sk-1234` → `openai_api_key=[REDACTED]`

#### ✅ Banned Keywords
- **Status**: FREE (no license required)
- **Configuration**: Already configured in `proxy_config.yaml`
```yaml
litellm_settings:
  callbacks: ["banned_keywords"]
general_settings:
  guardrails:
    - banned_keywords:
        enabled: true
        keywords: ["spam", "abuse", "hack", "exploit"]
```
- **What it does**: Blocks requests containing specific keywords

#### ✅ Max Request/Response Size
- **Status**: FREE (no license required)
- **Configuration**: Set in `proxy_config.yaml`
```yaml
general_settings:
  max_request_size_mb: 10
  max_response_size_mb: 32
```
- **What it does**: Prevents oversized requests/responses (DoS protection)

#### 🔐 JWT Authentication
- **Status**: ENTERPRISE (requires license)
- **Configuration**: Set in `proxy_config.yaml`
```yaml
general_settings:
  enable_jwt_auth: true
  jwt_public_key_url: "https://your-auth-provider.com/.well-known/jwks.json"
```

#### 🔐 SSO for Admin UI
- **Status**: ENTERPRISE (requires license)
- **What it does**: Single Sign-On for admin dashboard
- **Providers**: OAuth2, SAML, Azure AD, Google Workspace

---

### 2. **Monitoring & Observability**

#### 📈 Prometheus Metrics
- **Status**: ENTERPRISE (requires license)
- **Configuration**: Enable in `proxy_config.yaml`
```yaml
litellm_settings:
  callbacks: ["prometheus"]
  success_callback: ["prometheus"]
  failure_callback: ["prometheus"]

general_settings:
  prometheus:
    enabled: true
    port: 9090
```
- **Environment Variables**:
```bash
# No additional env vars needed - automatically enabled with license
```
- **Metrics Available**:
  - Request count, latency, errors
  - Token usage per model/user/team
  - Rate limit remaining (requests & tokens)
  - LLM provider outages
  - Cost tracking per endpoint

#### 📊 Langfuse Integration (Optional)
- **Status**: FREE (no license required, but needs Langfuse account)
- **Configuration**: Add to `proxy_config.yaml`
```yaml
litellm_settings:
  callbacks: ["langfuse"]
```
- **Environment Variables**:
```bash
LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_SECRET_KEY="sk-lf-..."
LANGFUSE_HOST="https://cloud.langfuse.com"  # or self-hosted
```
- **What it does**: Advanced observability, tracing, prompt management

---

### 3. **Caching**

#### 🚀 Redis Caching
- **Status**: FREE (no license required)
- **Configuration**: Enable in `proxy_config.yaml`
```yaml
litellm_settings:
  cache: true
  cache_params:
    type: "redis"
    host: "${REDIS_HOST:redis.railway.internal}"
    port: "${REDIS_PORT:6379}"
    password: "${REDIS_PASSWORD:}"
    ttl: 600  # 10 minutes
```
- **Environment Variables** (Railway):
```bash
REDIS_HOST="redis.railway.internal"
REDIS_PORT="6379"
REDIS_PASSWORD="your-redis-password"  # From Railway Redis service
```
- **What it does**: Caches LLM responses to reduce costs and latency
- **Supported Backends**: Redis, In-Memory, S3, Azure Blob

---

### 4. **Content Moderation**

#### 🛡️ OpenAI Moderation
- **Status**: FREE (no license required, but needs OpenAI API key)
- **Configuration**: Enable in `proxy_config.yaml`
```yaml
litellm_settings:
  callbacks: ["openai_moderation"]
  moderation_check: true
```
- **Environment Variables**:
```bash
OPENAI_API_KEY="sk-..."  # Your OpenAI API key
```
- **What it does**: Checks requests/responses for harmful content
- **Categories**: hate, self-harm, sexual, violence, etc.

#### 🛡️ LLM Guard
- **Status**: FREE (no license required, but needs LLM Guard server)
- **Configuration**: Enable in `proxy_config.yaml`
```yaml
litellm_settings:
  callbacks: ["llmguard_moderations"]
```
- **Environment Variables**:
```bash
LLM_GUARD_API_BASE="http://your-llmguard-server:8192"
```

#### 🛡️ Google Text Moderation
- **Status**: FREE (no license required, but needs Google Cloud)
- **Configuration**: Enable in `proxy_config.yaml`
```yaml
litellm_settings:
  callbacks: ["google_text_moderation"]
```
- **Environment Variables**:
```bash
GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

---

### 5. **Budget & Spend Tracking**

#### 💰 Budget Management
- **Status**: ENTERPRISE (requires license)
- **Configuration**: Already enabled in `proxy_config.yaml`
```yaml
general_settings:
  enable_budget_tracking: true
  budget_duration: "30d"
  litellm_settings:
    default_max_budget: 100.0  # $100 default
    default_tpm_limit: 10000   # tokens per minute
    default_rpm_limit: 100     # requests per minute
```
- **Features**:
  - Set budgets per API key, team, or tag
  - Automatic budget resets (daily, weekly, monthly)
  - Budget alerts via Slack/email
  - Spend reports via `/spend/report` endpoint

#### 📊 Tag-Based Budgets
- **Status**: ENTERPRISE (requires license)
- **What it does**: Set USD budgets for custom tags (e.g., per project, customer)
- **Example**:
```bash
curl -X POST "http://localhost:4000/tag/budget" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "tag": "project-alpha",
    "max_budget": 500.0,
    "duration": "30d"
  }'
```

#### 📊 Spend Reports
- **Status**: ENTERPRISE (requires license)
- **Endpoint**: `/spend/report`
- **What it does**: Detailed spend analytics by model, user, team, tag

---

### 6. **Team-Based Features**

#### 👥 Team-Based Logging
- **Status**: ENTERPRISE (requires license)
- **What it does**: Each team can use their own Langfuse project or custom callbacks
- **Configuration**: Set per team via API
```bash
curl -X POST "http://localhost:4000/team/update" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "team_id": "team-123",
    "metadata": {
      "logging": {
        "langfuse_project": "team-123-project"
      }
    }
  }'
```

#### 🔇 Disable Logging per Team
- **Status**: ENTERPRISE (requires license)
- **What it does**: GDPR compliance - turn off all logging for specific teams
- **Configuration**: Set via API
```bash
curl -X POST "http://localhost:4000/team/update" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "team_id": "team-gdpr",
    "metadata": {
      "logging": {
        "disable_logging": true
      }
    }
  }'
```

---

### 7. **Custom Branding**

#### 🎨 Swagger Docs Customization
- **Status**: ENTERPRISE (requires license)
- **Environment Variables**:
```bash
DOCS_TITLE="Your Company API Gateway"
DOCS_DESCRIPTION="Internal LLM API for all teams"
DOCS_FILTERED="True"  # Hide admin routes from users
```
- **What it does**: Customize API documentation with your branding

#### 🌐 Public Model Hub
- **Status**: ENTERPRISE (requires license)
- **What it does**: Share a public page of available models for users

---

### 8. **Advanced Security**

#### 🔐 IP-Based Access Control
- **Status**: ENTERPRISE (requires license)
- **What it does**: Whitelist/blacklist IP addresses
- **Configuration**: Set per API key
```bash
curl -X POST "http://localhost:4000/key/generate" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "allowed_ips": ["192.168.1.0/24", "10.0.0.1"]
  }'
```

#### 🔐 Track Request IP Address
- **Status**: ENTERPRISE (requires license)
- **What it does**: Log IP address of every request for audit trails

#### 🔐 Key Rotations
- **Status**: ENTERPRISE (requires license)
- **What it does**: Automatic API key rotation with grace periods

#### 🔐 AWS KMS Key Decryption (Beta)
- **Status**: ENTERPRISE (requires license)
- **Environment Variables**:
```bash
USE_AWS_KMS="True"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION_NAME="us-east-1"

# Encrypted secrets (LiteLLM will decrypt at startup)
LITELLM_SECRET_AWS_KMS_DATABASE_URL="AQICAH..."
LITELLM_SECRET_AWS_KMS_OPENAI_API_KEY="AQICAH..."
```
- **What it does**: Store encrypted secrets in env, decrypt at runtime

---

## 🚀 Railway Deployment Configuration

### Required Environment Variables (Railway)

```bash
# Core Configuration
LITELLM_MASTER_KEY="sk-your-secure-master-key"
LITELLM_SALT_KEY="sk-your-32-char-salt-key-here"
DATABASE_URL="postgresql://..."  # Automatically set by Railway
PORT=4000
STORE_MODEL_IN_DB="True"

# UI Access
UI_USERNAME="admin"
UI_PASSWORD="your-secure-password"

# Redis (if using Railway Redis service)
REDIS_HOST="redis.railway.internal"
REDIS_PORT="6379"
REDIS_PASSWORD="..."  # From Railway Redis service

# Enterprise License (Optional - for premium features)
LITELLM_LICENSE="your-license-key"

# Observability (Optional)
LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_SECRET_KEY="sk-lf-..."

# Content Moderation (Optional)
OPENAI_API_KEY="sk-..."  # For OpenAI moderation
```

### Enabling Features on Railway

1. **Add Redis Service** (for caching):
   - In Railway dashboard: Add Service → Redis
   - Redis will automatically set `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`
   - Update `proxy_config.yaml` to use Redis caching

2. **Enable Prometheus** (requires license):
   - Set `LITELLM_LICENSE` in Railway environment variables
   - Prometheus will automatically start on port 9090
   - Access metrics at: `https://your-app.railway.app/metrics`

3. **Enable Langfuse** (optional):
   - Sign up at [langfuse.com](https://langfuse.com)
   - Add `LANGFUSE_PUBLIC_KEY` and `LANGFUSE_SECRET_KEY` to Railway
   - Update `proxy_config.yaml` to include `langfuse` in callbacks

---

## 📝 Summary: What Requires a License?

### ✅ FREE (No License Required)
- Audit logs
- Secret detection/redaction
- Banned keywords
- Max request/response size limits
- Redis caching
- Content moderation (OpenAI, LLM Guard, Google)
- Basic spend tracking
- Database storage
- Admin UI (basic)

### 🔐 ENTERPRISE (Requires License)
- **Security**: JWT auth, SSO, IP access control, key rotations, AWS KMS
- **Monitoring**: Prometheus metrics, advanced analytics
- **Budgets**: Tag-based budgets, model-specific budgets, spend reports
- **Teams**: Team-based logging, disable logging per team
- **Branding**: Custom Swagger docs, public model hub
- **Advanced**: Track request IPs, enforce required params

---

## 🎯 Recommended Setup for Production

### Minimal Setup (Free)
```yaml
# proxy_config.yaml
litellm_settings:
  cache: true  # Redis caching
  callbacks: ["hide_secrets", "banned_keywords"]

general_settings:
  audit_logs_enabled: true
  max_request_size_mb: 10
  max_parallel_requests: 100
```

### Full Enterprise Setup (With License)
```yaml
# proxy_config.yaml
litellm_settings:
  cache: true
  callbacks: ["prometheus", "hide_secrets", "openai_moderation"]
  success_callback: ["prometheus"]
  failure_callback: ["prometheus"]

general_settings:
  audit_logs_enabled: true
  enable_budget_tracking: true
  max_request_size_mb: 10
  prometheus:
    enabled: true
    port: 9090
```

```bash
# .env
LITELLM_LICENSE="your-license-key"
REDIS_HOST="redis.railway.internal"
REDIS_PASSWORD="..."
LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_SECRET_KEY="sk-lf-..."
```

---

## 📚 Additional Resources

- **LiteLLM Docs**: https://docs.litellm.ai/docs/proxy/enterprise
- **Get License**: https://forms.gle/sTDVprBs18M4V8Le8
- **GitHub**: https://github.com/BerriAI/litellm
- **Discord**: https://discord.com/invite/wuPM9dRgDw

---

## 🆘 Support

For enterprise support:
- Email: support@berri.ai
- Schedule call: https://calendly.com/d/4mp-gd3-k5k/litellm-1-1-onboarding-chat
- Discord: https://discord.com/invite/wuPM9dRgDw
