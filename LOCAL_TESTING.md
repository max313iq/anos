# LiteLLM Proxy - Local Testing Guide

## 🚀 Quick Start

The proxy is **already running** on your local machine!

### Connection Details
- **URL**: `http://localhost:4000`
- **Master Key**: `sk-1234`
- **Database**: Railway PostgreSQL (connected)
- **License**: `34INT32940IUNNMJ` (Enterprise)

---

## 📊 Status Check

```bash
# Check if proxy is running
curl http://localhost:4000/health -H "Authorization: Bearer sk-1234"

# List available models
curl http://localhost:4000/v1/models -H "Authorization: Bearer sk-1234"
```

**Current Status**:
- ✅ **3 Healthy Endpoints**: gpt-5, gpt-5-codex
- ⚠️ **5 Unhealthy Endpoints**: Placeholder models (gpt-5-mini, gpt-5-nano, gpt-5-chat, gpt-5-pro)

---

## 💻 Usage Examples

### Python (OpenAI SDK)

```python
import openai

client = openai.OpenAI(
    api_key="sk-1234",
    base_url="http://localhost:4000/v1"
)

# Chat completion
response = client.chat.completions.create(
    model="gpt-5",  # or "gpt-5-codex"
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms"}
    ],
    max_tokens=500
)

print(response.choices[0].message.content)
print(f"Tokens used: {response.usage.total_tokens}")
```

### cURL

```bash
# Simple chat completion
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5",
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'

# With streaming
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5",
    "messages": [{"role": "user", "content": "Count to 10"}],
    "stream": true
  }'
```

### JavaScript/TypeScript

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-1234',
  baseURL: 'http://localhost:4000/v1'
});

async function chat() {
  const response = await client.chat.completions.create({
    model: 'gpt-5',
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  });
  
  console.log(response.choices[0].message.content);
}

chat();
```

---

## 🌐 Web Interfaces

### Admin UI
- **URL**: http://localhost:4000/ui
- **Username**: `admin`
- **Password**: `admin`
- **Features**: 
  - View API keys
  - Monitor usage
  - Manage teams
  - View spend analytics

### Swagger API Docs
- **URL**: http://localhost:4000/docs
- **Features**: Interactive API documentation with "Try it out" functionality

---

## 📡 Available Endpoints

### Core Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check with endpoint status |
| `/v1/models` | GET | List available models |
| `/v1/chat/completions` | POST | Chat completions (OpenAI compatible) |
| `/v1/completions` | POST | Text completions |
| `/v1/embeddings` | POST | Generate embeddings |

### Management Endpoints (Require Master Key)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/key/generate` | POST | Generate new API key |
| `/key/update` | POST | Update API key settings |
| `/key/delete` | POST | Delete API key |
| `/key/info` | GET | Get key information |
| `/spend/tags` | GET | View spend by tags |
| `/user/new` | POST | Create new user |
| `/team/new` | POST | Create new team |

---

## 🔑 API Key Management

### Generate a New API Key

```bash
curl -X POST http://localhost:4000/key/generate \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "models": ["gpt-5", "gpt-5-codex"],
    "max_budget": 100.0,
    "budget_duration": "30d",
    "metadata": {
      "user": "john@example.com",
      "team": "engineering"
    }
  }'
```

### Set Rate Limits

```bash
curl -X POST http://localhost:4000/key/generate \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "models": ["gpt-5"],
    "max_budget": 50.0,
    "tpm_limit": 10000,
    "rpm_limit": 100,
    "max_parallel_requests": 10
  }'
```

### View Key Information

```bash
curl http://localhost:4000/key/info?key=sk-your-key-here \
  -H "Authorization: Bearer sk-1234"
```

---

## 📊 Monitoring & Analytics

### View Spend by Tags

```bash
curl http://localhost:4000/spend/tags \
  -H "Authorization: Bearer sk-1234"
```

### Check Logs

```bash
# View real-time logs
tail -f litellm.log

# Search for errors
grep -i error litellm.log

# View last 50 lines
tail -50 litellm.log
```

---

## 🛠️ Management Commands

### Start Proxy (if not running)

```bash
cd /workspaces/litellm

# Set environment variables and start
DATABASE_URL="postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@hopper.proxy.rlwy.net:16649/railway" \
LITELLM_LICENSE="34INT32940IUNNMJ" \
litellm --config proxy_config.yaml --port 4000 > litellm.log 2>&1 &
```

### Stop Proxy

```bash
pkill -f litellm
```

### Restart Proxy

```bash
pkill -f litellm && sleep 2
DATABASE_URL="postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@hopper.proxy.rlwy.net:16649/railway" \
LITELLM_LICENSE="34INT32940IUNNMJ" \
litellm --config proxy_config.yaml --port 4000 > litellm.log 2>&1 &
```

### Check if Running

```bash
ps aux | grep litellm | grep -v grep
```

---

## 🧪 Testing Different Models

### Test GPT-5 (Full Model)

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5",
    "messages": [{"role": "user", "content": "Explain AI in one sentence"}]
  }'
```

### Test GPT-5 Codex (Code Generation)

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "Write a Python function to calculate fibonacci"}]
  }'
```

---

## 🐛 Troubleshooting

### Proxy Not Responding

```bash
# Check if process is running
ps aux | grep litellm

# Check logs for errors
tail -50 litellm.log

# Restart proxy
pkill -f litellm && sleep 2
DATABASE_URL="postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@hopper.proxy.rlwy.net:16649/railway" \
LITELLM_LICENSE="34INT32940IUNNMJ" \
litellm --config proxy_config.yaml --port 4000 > litellm.log 2>&1 &
```

### Authentication Errors

Make sure you're using the correct master key:
```bash
# Correct
curl http://localhost:4000/health -H "Authorization: Bearer sk-1234"

# Incorrect (will fail)
curl http://localhost:4000/health -H "Authorization: Bearer wrong-key"
```

### Database Connection Issues

Check if DATABASE_URL is set correctly:
```bash
echo $DATABASE_URL
# Should output: postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@hopper.proxy.rlwy.net:16649/railway
```

### Model Not Found Errors

Some models are placeholders and don't exist in Azure yet:
- ✅ **Working**: `gpt-5`, `gpt-5-codex`
- ⚠️ **Placeholder**: `gpt-5-mini`, `gpt-5-nano`, `gpt-5-chat`, `gpt-5-pro`

Use the working models for testing.

---

## 📈 Performance Tips

### Enable Caching (Requires Redis)

To reduce costs and latency, enable Redis caching:

1. Install Redis locally:
   ```bash
   # macOS
   brew install redis
   redis-server
   
   # Linux
   sudo apt-get install redis-server
   sudo systemctl start redis
   ```

2. Update `proxy_config.yaml`:
   ```yaml
   litellm_settings:
     cache: true
     cache_params:
       type: "redis"
       host: "localhost"
       port: 6379
       ttl: 600
   ```

3. Restart proxy

### Monitor Token Usage

```bash
# View spend by tags
curl http://localhost:4000/spend/tags \
  -H "Authorization: Bearer sk-1234"
```

---

## 🔒 Security Notes

### For Local Development
- Master key is `sk-1234` (simple for testing)
- Database is on Railway (production database)
- All requests are logged to the database

### For Production
- Change master key to a secure random string
- Use environment variables for secrets
- Enable rate limiting per key
- Set budget limits
- Enable audit logging

---

## 📚 Additional Resources

- **Configuration**: `proxy_config.yaml`
- **Environment Variables**: `.env`
- **Enterprise Features**: `ENTERPRISE_FEATURES.md`
- **Logs**: `litellm.log`

---

## 🆘 Need Help?

1. Check logs: `tail -50 litellm.log`
2. View health status: `curl http://localhost:4000/health -H "Authorization: Bearer sk-1234"`
3. Check documentation: https://docs.litellm.ai/
4. GitHub Issues: https://github.com/BerriAI/litellm/issues

---

**Status**: ✅ Proxy is running and ready for testing!
