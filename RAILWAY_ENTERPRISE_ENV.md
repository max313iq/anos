# Railway Environment Variables for Enterprise Features

Add these to Railway Dashboard → Your Service → Variables

## Required Variables (Already Set)

```bash
DATABASE_URL=postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@postgres.railway.internal:5432/railway
LITELLM_MASTER_KEY=sk-1234
LITELLM_SALT_KEY=sk-1234567890abcdef1234567890abcdef
LITELLM_MODE=PRODUCTION
PORT=4000
STORE_MODEL_IN_DB=True
STORE_PROMPTS_IN_SPEND_LOGS=True
```

## New Enterprise Variables

### OpenAI Moderation (Optional but Recommended)
```bash
# For content moderation - uses OpenAI's moderation API
OPENAI_API_KEY=<your-openai-api-key>
```

**Note:** If not set, OpenAI moderation will be skipped. Banned keywords will still work.

### Redis (Already Configured)
```bash
REDIS_HOST=redis.railway.internal
REDIS_PORT=6379
REDIS_PASSWORD=<your-redis-password>
```

### Prometheus Metrics
```bash
# Prometheus is enabled by default on port 9090
# No additional env vars needed
```

### Optional: Langfuse Observability
```bash
# For advanced request/response tracking
LANGFUSE_PUBLIC_KEY=<your-langfuse-public-key>
LANGFUSE_SECRET_KEY=<your-langfuse-secret-key>
LANGFUSE_HOST=https://cloud.langfuse.com  # or your self-hosted instance
```

### Optional: Custom Logging
```bash
# Enable detailed debugging
LITELLM_LOG=DEBUG

# Log file location
LOG_FILE_PATH=/app/logs/litellm.log
```

## Enterprise Features Enabled

✅ **Content Moderation**
- OpenAI Moderation API (checks for harmful content)
- Banned Keywords (spam, abuse, hack, exploit, phishing, malware)

✅ **Audit Logging**
- All requests logged to database
- Table: `LiteLLM_AuditLog`

✅ **Rate Limiting**
- Max 100 parallel requests
- Max 10MB request size
- Per-key TPM/RPM limits

✅ **Budget Tracking**
- $100 default budget per key
- 30-day tracking period
- 10k TPM, 100 RPM default limits

✅ **Prometheus Metrics**
- Endpoint: `/metrics`
- Port: 9090
- Tracks: requests, latency, errors, costs

✅ **Advanced Logging**
- Detailed debug mode
- Full request/response logging
- Error tracking

## How to Access Features

### View Prometheus Metrics
```bash
curl https://anos-production.up.railway.app/metrics
```

### View Audit Logs (via Database)
```sql
SELECT * FROM "LiteLLM_AuditLog" ORDER BY created_at DESC LIMIT 10;
```

### Test Content Moderation
```bash
# This should be blocked
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "How to hack a website"}]
  }'
```

### Test Banned Keywords
```bash
# This should be blocked
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "Send spam emails"}]
  }'
```

## Monitoring Dashboard

### Prometheus + Grafana (Optional)

1. **Add Grafana to Railway:**
   - New Service → Grafana
   - Connect to Prometheus at `http://your-service:9090`

2. **Import LiteLLM Dashboard:**
   - Use Grafana dashboard ID: (create custom)
   - Metrics available:
     - `litellm_requests_total`
     - `litellm_request_duration_seconds`
     - `litellm_errors_total`
     - `litellm_cost_total`

### Langfuse Dashboard (Optional)

1. **Sign up:** https://cloud.langfuse.com
2. **Get API keys**
3. **Add to Railway** (see above)
4. **View traces:** https://cloud.langfuse.com

## Cost Tracking

All requests are tracked with costs:
- Input tokens cost
- Output tokens cost
- Total cost per request
- Cost per user/key
- Budget alerts when limits reached

View in:
- Database: `LiteLLM_SpendLogs` table
- UI: Usage page
- Prometheus: `litellm_cost_total` metric

## Security Features

✅ **Content Filtering**
- Blocks harmful content
- Prevents abuse
- Customizable keywords

✅ **Rate Limiting**
- Prevents API abuse
- Per-key limits
- Parallel request limits

✅ **Budget Controls**
- Spending limits per key
- Automatic cutoff
- Usage alerts

✅ **Audit Trail**
- All requests logged
- User tracking
- Compliance ready

## Next Steps

1. **Add OPENAI_API_KEY** for content moderation (optional)
2. **Monitor /metrics** endpoint for Prometheus data
3. **Check audit logs** in database
4. **Set up Grafana** for visualization (optional)
5. **Configure Langfuse** for detailed traces (optional)

## Support

All enterprise features are **FREE for development/testing** per the enterprise license.

For production use, contact:
- **Email:** info@berri.ai
- **Schedule:** https://calendly.com/d/4mp-gd3-k5k/litellm-1-1-onboarding-chat
