# LiteLLM Responses API Guide

## Overview

The `/v1/responses` endpoint is **already enabled** in your LiteLLM proxy. It follows the OpenAI Responses API specification for creating and managing AI responses.

## Endpoint: `/v1/responses`

This endpoint provides an alternative to `/v1/chat/completions` with a simpler interface.

## Usage

### Create a Response

```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-35-turbo",
    "input": "Tell me about AI"
  }'
```

### Response Format

```json
{
  "id": "resp_abc123",
  "object": "response",
  "created": 1234567890,
  "model": "gpt-35-turbo",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "AI stands for Artificial Intelligence..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}
```

## Available Endpoints

### 1. Create Response
```bash
POST /v1/responses
POST /responses  # Alternative path
```

**Request Body:**
```json
{
  "model": "gpt-35-turbo",
  "input": "Your prompt here",
  "temperature": 0.7,  // Optional
  "max_tokens": 1000,  // Optional
  "stream": false      // Optional
}
```

### 2. Get Response by ID
```bash
GET /v1/responses/{response_id}
GET /responses/{response_id}  # Alternative path
```

**Example:**
```bash
curl -X GET https://anos-production.up.railway.app/v1/responses/resp_abc123 \
  -H "Authorization: Bearer sk-1234"
```

### 3. Delete Response
```bash
DELETE /v1/responses/{response_id}
DELETE /responses/{response_id}  # Alternative path
```

**Example:**
```bash
curl -X DELETE https://anos-production.up.railway.app/v1/responses/resp_abc123 \
  -H "Authorization: Bearer sk-1234"
```

### 4. Get Response Input Items
```bash
GET /v1/responses/{response_id}/input_items
```

### 5. Cancel Response
```bash
POST /v1/responses/{response_id}/cancel
```

**Example:**
```bash
curl -X POST https://anos-production.up.railway.app/v1/responses/resp_abc123/cancel \
  -H "Authorization: Bearer sk-1234"
```

## Differences from Chat Completions

| Feature | `/v1/chat/completions` | `/v1/responses` |
|---------|------------------------|-----------------|
| Input Format | `messages` array | Simple `input` string |
| Response ID | `id` field | `id` field with `resp_` prefix |
| Streaming | Supported | Supported |
| Function Calling | Supported | Supported |
| Cancellation | Not available | Available via `/cancel` |
| Retrieval | Not available | Available via GET |

## When to Use `/v1/responses`

✅ **Use `/v1/responses` when:**
- You want a simpler API interface
- You need to retrieve responses by ID later
- You want to cancel long-running requests
- You're building a response management system

✅ **Use `/v1/chat/completions` when:**
- You need full conversation history
- You're following standard OpenAI patterns
- You need complex message structures
- You're using existing OpenAI SDKs

## Examples

### Simple Question
```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-35-turbo",
    "input": "What is 2+2?"
  }'
```

### With Temperature
```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-35-turbo",
    "input": "Write a creative story",
    "temperature": 0.9,
    "max_tokens": 500
  }'
```

### Streaming Response
```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-35-turbo",
    "input": "Tell me a long story",
    "stream": true
  }'
```

### Retrieve Response Later
```bash
# 1. Create response
RESPONSE_ID=$(curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-35-turbo",
    "input": "Hello"
  }' | jq -r '.id')

# 2. Get response by ID
curl -X GET https://anos-production.up.railway.app/v1/responses/$RESPONSE_ID \
  -H "Authorization: Bearer sk-1234"
```

## Using with Your Models

The `/v1/responses` endpoint works with **all your configured models**:

```bash
# Use gpt-35-turbo
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-35-turbo",
    "input": "Hello"
  }'

# Use any other model you've configured
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-4",
    "input": "Hello"
  }'
```

## Enterprise Features Apply

All enterprise features work with `/v1/responses`:

✅ **Content Moderation** - Harmful content is blocked
✅ **Banned Keywords** - Spam/abuse keywords are filtered
✅ **Rate Limiting** - Per-key limits apply
✅ **Budget Tracking** - Costs are tracked
✅ **Audit Logging** - All requests are logged
✅ **Prometheus Metrics** - Metrics are collected

## Error Handling

### Invalid Model
```json
{
  "error": {
    "message": "Invalid model specified",
    "type": "invalid_request_error",
    "code": 400
  }
}
```

### Rate Limit Exceeded
```json
{
  "error": {
    "message": "Rate limit exceeded",
    "type": "rate_limit_error",
    "code": 429
  }
}
```

### Content Moderation Block
```json
{
  "error": {
    "message": "Content violates usage policies",
    "type": "content_filter_error",
    "code": 400
  }
}
```

## Testing

Test the endpoint is working:

```bash
# Simple test
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234" \
  -d '{
    "model": "gpt-35-turbo",
    "input": "Say hello"
  }'
```

Expected response:
```json
{
  "id": "resp_...",
  "object": "response",
  "created": 1234567890,
  "model": "gpt-35-turbo",
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
    "prompt_tokens": 3,
    "completion_tokens": 10,
    "total_tokens": 13
  }
}
```

## UI Integration

The `/v1/responses` endpoint is **already available** in your Railway deployment. No configuration changes needed!

You can use it immediately with any HTTP client, SDK, or custom application.

## SDK Examples

### Python
```python
import requests

response = requests.post(
    "https://anos-production.up.railway.app/v1/responses",
    headers={
        "Authorization": "Bearer sk-1234",
        "Content-Type": "application/json"
    },
    json={
        "model": "gpt-35-turbo",
        "input": "Hello, world!"
    }
)

print(response.json())
```

### JavaScript
```javascript
const response = await fetch('https://anos-production.up.railway.app/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk-1234',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-35-turbo',
    input: 'Hello, world!'
  })
});

const data = await response.json();
console.log(data);
```

### cURL
```bash
curl -X POST https://anos-production.up.railway.app/v1/responses \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-35-turbo", "input": "Hello, world!"}'
```

## Summary

✅ **Already Enabled** - No configuration needed
✅ **Works with All Models** - Use any configured model
✅ **Enterprise Features** - All guardrails and tracking apply
✅ **OpenAI Compatible** - Follows OpenAI Responses API spec
✅ **Additional Features** - Cancellation, retrieval, management

**The `/v1/responses` endpoint is ready to use right now!** 🚀
