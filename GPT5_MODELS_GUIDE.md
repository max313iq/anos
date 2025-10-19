# GPT-5 Models Configuration Guide

## Available GPT-5 Models

Your Azure OpenAI deployment has **6 GPT-5 models** configured:

### 1. **gpt-5-codex** (Default)
- **Best for:** Code generation, debugging, technical tasks
- **API:** Responses API only
- **Context:** 400,000 tokens (272k input, 128k output)
- **Features:** Structured outputs, vision, tools, parallel calling
- **Optimized for:** Codex CLI & VS Code extension

```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-5-codex", "input": "Write a Python function to sort a list"}'
```

### 2. **gpt-5**
- **Best for:** Complex reasoning, analysis, general tasks
- **API:** Chat Completions & Responses API
- **Context:** 400,000 tokens (272k input, 128k output)
- **Features:** Full reasoning, vision, tools, structured outputs
- **Training data:** Up to September 30, 2024

```bash
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5",
    "messages": [{"role": "user", "content": "Explain quantum computing"}]
  }'
```

### 3. **gpt-5-mini**
- **Best for:** Fast reasoning, cost-effective tasks
- **API:** Chat Completions & Responses API
- **Context:** 400,000 tokens (272k input, 128k output)
- **Features:** Reasoning, vision, tools, structured outputs
- **Training data:** Up to May 31, 2024

```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-5-mini", "input": "Quick summary of AI trends"}'
```

### 4. **gpt-5-nano**
- **Best for:** Ultra-fast responses, simple tasks
- **API:** Chat Completions & Responses API
- **Context:** 400,000 tokens (272k input, 128k output)
- **Features:** Reasoning, vision, tools, structured outputs
- **Training data:** Up to May 31, 2024

```bash
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-nano",
    "messages": [{"role": "user", "content": "What is 2+2?"}]
  }'
```

### 5. **gpt-5-chat** (Preview)
- **Best for:** Conversational AI, chatbots
- **API:** Chat Completions & Responses API
- **Context:** 128,000 tokens (16k output)
- **Features:** Text/image input, text output only
- **Training data:** Up to September 30, 2024

```bash
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-chat",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

### 6. **gpt-5-pro**
- **Best for:** Advanced reasoning, complex analysis
- **API:** Responses API only
- **Context:** 400,000 tokens (272k input, 128k output)
- **Features:** Advanced reasoning, vision, tools, structured outputs
- **Training data:** Up to September 30, 2024

```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-5-pro", "input": "Analyze this complex problem..."}'
```

## Model Comparison

| Model | Context | Output | API Support | Best For |
|-------|---------|--------|-------------|----------|
| **gpt-5-codex** | 400k | 128k | Responses only | Code generation |
| **gpt-5** | 400k | 128k | Both | General reasoning |
| **gpt-5-mini** | 400k | 128k | Both | Fast reasoning |
| **gpt-5-nano** | 400k | 128k | Both | Ultra-fast tasks |
| **gpt-5-chat** | 128k | 16k | Both | Conversations |
| **gpt-5-pro** | 400k | 128k | Responses only | Advanced reasoning |

## Choosing the Right Model

### For Code Tasks
✅ **Use gpt-5-codex** - Optimized for code generation, debugging, technical documentation

### For Complex Reasoning
✅ **Use gpt-5** or **gpt-5-pro** - Full reasoning capabilities, deep analysis

### For Speed & Cost
✅ **Use gpt-5-mini** or **gpt-5-nano** - Faster responses, lower cost

### For Chat Applications
✅ **Use gpt-5-chat** - Optimized for conversational AI

## API Compatibility

### Chat Completions API (`/v1/chat/completions`)
✅ gpt-5
✅ gpt-5-mini
✅ gpt-5-nano
✅ gpt-5-chat
❌ gpt-5-codex (Responses API only)
❌ gpt-5-pro (Responses API only)

### Responses API (`/v1/responses`)
✅ All models support Responses API

## Features by Model

### Reasoning
✅ gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-codex, gpt-5-pro

### Vision (Image Processing)
✅ gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-codex, gpt-5-chat, gpt-5-pro

### Structured Outputs
✅ gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-codex, gpt-5-pro

### Function/Tool Calling
✅ gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-codex, gpt-5-pro

### Parallel Tool Calling
✅ gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-codex

## Usage Examples

### Code Generation (gpt-5-codex)
```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-codex",
    "input": "Create a REST API in Python using FastAPI with user authentication"
  }'
```

### Complex Analysis (gpt-5)
```bash
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5",
    "messages": [
      {"role": "user", "content": "Analyze the economic impact of AI on job markets"}
    ]
  }'
```

### Quick Task (gpt-5-nano)
```bash
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-nano",
    "messages": [{"role": "user", "content": "Translate hello to Spanish"}]
  }'
```

### Chatbot (gpt-5-chat)
```bash
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-chat",
    "messages": [
      {"role": "system", "content": "You are a friendly customer support agent"},
      {"role": "user", "content": "I need help with my order"}
    ]
  }'
```

## Default Model

The default model is set to **gpt-5-codex**. If you don't specify a model, requests will use gpt-5-codex.

To change the default, update `proxy_config.yaml`:
```yaml
general_settings:
  default_model: "gpt-5"  # or any other model
```

## Cost Optimization

### Lowest Cost → Highest Cost
1. **gpt-5-nano** - Fastest, cheapest
2. **gpt-5-mini** - Fast, affordable
3. **gpt-5-chat** - Moderate
4. **gpt-5** - Standard
5. **gpt-5-codex** - Specialized
6. **gpt-5-pro** - Premium

**Tip:** Use nano/mini for simple tasks, full models for complex reasoning.

## Enterprise Features

All GPT-5 models work with enterprise features:
✅ Content moderation
✅ Banned keywords
✅ Rate limiting
✅ Budget tracking
✅ Audit logging
✅ Prometheus metrics

## Testing All Models

```bash
# Test each model
for model in gpt-5-codex gpt-5 gpt-5-mini gpt-5-nano gpt-5-chat gpt-5-pro; do
  echo "Testing $model..."
  curl -s -X POST https://anos-production.up.railway.app/v1/responses \
    -H "Authorization: Bearer sk-1234" \
    -H "Content-Type: application/json" \
    -d "{\"model\": \"$model\", \"input\": \"Say hello\"}" | jq '.choices[0].message.content'
done
```

## Model Selection Guide

```
Need code generation? → gpt-5-codex
Need deep reasoning? → gpt-5 or gpt-5-pro
Need speed? → gpt-5-nano
Need balance? → gpt-5-mini
Need chat? → gpt-5-chat
```

## Summary

✅ **6 GPT-5 models** configured and ready
✅ **gpt-5-codex** set as default
✅ **All models** support Responses API
✅ **Most models** support Chat Completions API
✅ **Enterprise features** enabled for all models

**Your LiteLLM proxy is now configured with the full GPT-5 suite!** 🚀
