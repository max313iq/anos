# LiteLLM Enterprise Setup Guide

## Overview

The LiteLLM Enterprise features are already included in this repository under the `enterprise/` folder. These features include:

- **Advanced Guardrails**: Content moderation, banned keywords, blocked users
- **Audit Logging**: Comprehensive logging for compliance
- **Custom Integrations**: Prometheus, Aporia AI, etc.
- **Enhanced Management**: Advanced key management, batch operations
- **Enterprise UI**: Additional dashboard features

## License Information

- **Development/Testing**: Free to use without a license
- **Production**: Requires a commercial license from BerriAI

Contact: [Schedule a call](https://calendly.com/d/4mp-gd3-k5k/litellm-1-1-onboarding-chat) or email info@berri.ai

## Current Status

✅ Enterprise code is already in your repository
✅ Enterprise features are automatically imported if available
❌ No license key set (running in open-source mode)

## How to Enable Enterprise Features

### Option 1: Development/Testing (No License Required)

The enterprise features are already available for development and testing. They're automatically loaded if the `enterprise` package is installed.

**Check if enterprise is available:**
```bash
python -c "import litellm_enterprise; print('Enterprise available')"
```

### Option 2: Production (License Required)

1. **Get a License Key:**
   - Contact BerriAI: https://calendly.com/d/4mp-gd3-k5k/litellm-1-1-onboarding-chat
   - Or email: info@berri.ai

2. **Add License to Railway:**
   ```bash
   LITELLM_LICENSE=<your-license-key>
   ```

3. **Restart the service**

## Enterprise Features Available

### 1. Content Moderation Guardrails

**OpenAI Moderation:**
```yaml
# In proxy_config.yaml
litellm_settings:
  callbacks: ["openai_moderation"]
  
general_settings:
  guardrails:
    - openai_moderation:
        enabled: true
```

**Google Text Moderation:**
```yaml
litellm_settings:
  callbacks: ["google_text_moderation"]
  
general_settings:
  guardrails:
    - google_text_moderation:
        enabled: true
        api_key: ${GOOGLE_API_KEY}
```

**Banned Keywords:**
```yaml
general_settings:
  guardrails:
    - banned_keywords:
        enabled: true
        keywords: ["spam", "abuse", "inappropriate"]
```

### 2. Blocked User List

```yaml
general_settings:
  guardrails:
    - blocked_user_list:
        enabled: true
        blocked_users:
          - user_id_1
          - user_id_2
```

### 3. Prometheus Metrics

```yaml
litellm_settings:
  callbacks: ["prometheus"]
  
general_settings:
  prometheus:
    enabled: true
    port: 9090
```

### 4. Audit Logging

Enterprise includes comprehensive audit logging for:
- All API requests
- Key generation/deletion
- User management
- Configuration changes

Automatically enabled with enterprise license.

### 5. Advanced Key Management

- Batch key operations
- Key rotation
- Advanced permissions
- Usage analytics per key

## Verify Enterprise Features

### Check License Status

```bash
curl https://anos-production.up.railway.app/health \
  -H "Authorization: Bearer sk-1234"
```

Look for `"premium": true` in the response.

### Check Available Features

```bash
curl https://anos-production.up.railway.app/enterprise/features \
  -H "Authorization: Bearer sk-1234"
```

### View Prometheus Metrics (if enabled)

```bash
curl https://anos-production.up.railway.app/metrics
```

## Railway Environment Variables for Enterprise

Add these to Railway for full enterprise functionality:

```bash
# License (required for production)
LITELLM_LICENSE=<your-license-key>

# Guardrails
GOOGLE_API_KEY=<your-google-api-key>  # For Google Text Moderation

# Prometheus
PROMETHEUS_PORT=9090

# Audit Logging
AUDIT_LOG_ENABLED=true
AUDIT_LOG_PATH=/app/logs/audit.log
```

## Enterprise Features in UI

With enterprise enabled, you'll see additional UI features:

1. **Advanced Analytics Dashboard**
2. **Audit Log Viewer**
3. **Guardrails Configuration**
4. **Batch Operations**
5. **Advanced User Management**

## Troubleshooting

### Enterprise Features Not Loading

**Check if enterprise package is installed:**
```bash
railway run python -c "import litellm_enterprise; print('OK')"
```

**Check Railway logs:**
```bash
railway logs --filter "enterprise"
```

### License Verification Failed

**Check license key:**
```bash
railway run python -c "from litellm.proxy.auth.litellm_license import LicenseCheck; lc = LicenseCheck(); print(lc.is_premium())"
```

Should return `True` if license is valid.

### Guardrails Not Working

**Verify callbacks are loaded:**
```bash
railway logs --filter "callbacks"
```

Look for messages like:
```
Loaded callbacks: ['openai_moderation', 'prometheus']
```

## Cost Considerations

### Open Source (Free)
- Core LiteLLM features
- Basic proxy functionality
- Standard UI

### Enterprise (Paid)
- All open source features
- Advanced guardrails
- Audit logging
- Prometheus metrics
- Priority support
- Custom integrations

**Pricing:** Contact BerriAI for pricing information

## Migration from Open Source to Enterprise

1. **No code changes required** - Enterprise features are already in the codebase
2. **Add license key** to Railway environment variables
3. **Enable desired features** in `proxy_config.yaml`
4. **Restart service**

All existing configurations and data remain intact.

## Support

- **Documentation:** https://docs.litellm.ai/docs/proxy/enterprise
- **Schedule Call:** https://calendly.com/d/4mp-gd3-k5k/litellm-1-1-onboarding-chat
- **Email:** info@berri.ai
- **GitHub Issues:** https://github.com/BerriAI/litellm/issues

## Summary

✅ **Enterprise code is already in your repository**
✅ **Free for development and testing**
✅ **No code changes needed to enable**
❌ **Production use requires a license**

To enable enterprise features in production:
1. Contact BerriAI for a license
2. Add `LITELLM_LICENSE` to Railway
3. Configure desired features in `proxy_config.yaml`
4. Restart and enjoy enterprise features!
