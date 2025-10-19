# Azure OpenAI Model Configuration Fix

## The Problem

Error: `The chatCompletion operation does not work with the specified model, gpt-5-codex`

**Root Cause:** `gpt-5-codex` is not a valid Azure OpenAI model name.

## Valid Azure OpenAI Models

Azure OpenAI uses **deployment names** that you create in your Azure portal. Common models:

### GPT-4 Models
- `gpt-4` - GPT-4 base model
- `gpt-4-32k` - GPT-4 with 32k context
- `gpt-4-turbo` - GPT-4 Turbo (128k context)
- `gpt-4o` - GPT-4 Omni (latest, multimodal)
- `gpt-4o-mini` - Smaller, faster GPT-4 Omni

### GPT-3.5 Models
- `gpt-35-turbo` - GPT-3.5 Turbo (note: 35, not 3.5)
- `gpt-35-turbo-16k` - GPT-3.5 with 16k context

### O1 Models (Reasoning)
- `o1-preview` - O1 preview model
- `o1-mini` - Smaller O1 model

## How to Find Your Deployment Name

### Option 1: Azure Portal

1. Go to https://portal.azure.com
2. Navigate to your Azure OpenAI resource
3. Click **"Model deployments"** or **"Deployments"**
4. You'll see a list of your deployments with names like:
   - `my-gpt-4-deployment`
   - `gpt-4-turbo-prod`
   - `gpt-35-turbo`

### Option 2: Azure OpenAI Studio

1. Go to https://oai.azure.com
2. Select your resource
3. Go to **"Deployments"** tab
4. Copy the **"Deployment name"** (not the model name)

### Option 3: Test with API

```bash
# List your deployments
curl "https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/openai/deployments?api-version=2024-02-15-preview" \
  -H "api-key: 81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
```

## Fix Your Configuration

Once you know your deployment name, update `proxy_config.yaml`:

### Example 1: If your deployment is named "gpt-4"

```yaml
model_list:
  - model_name: "gpt-4"  # Your custom name for LiteLLM
    litellm_params:
      model: "azure/gpt-4"  # azure/ + your deployment name
      api_base: "https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/"
      api_key: "81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
      api_version: "2024-02-15-preview"
```

### Example 2: If your deployment is named "my-gpt-4-turbo"

```yaml
model_list:
  - model_name: "gpt-4-turbo"  # Your custom name
    litellm_params:
      model: "azure/my-gpt-4-turbo"  # azure/ + deployment name
      api_base: "https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/"
      api_key: "81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
      api_version: "2024-02-15-preview"
```

### Example 3: Multiple Models

```yaml
model_list:
  - model_name: "gpt-4"
    litellm_params:
      model: "azure/gpt-4"  # Your GPT-4 deployment
      api_base: "https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/"
      api_key: "81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
      api_version: "2024-02-15-preview"
  
  - model_name: "gpt-35-turbo"
    litellm_params:
      model: "azure/gpt-35-turbo"  # Your GPT-3.5 deployment
      api_base: "https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/"
      api_key: "81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
      api_version: "2024-02-15-preview"
```

## Common Mistakes

❌ **Wrong:** `model: "azure/gpt-5-codex"` (doesn't exist)
✅ **Right:** `model: "azure/gpt-4"` (your actual deployment)

❌ **Wrong:** `model: "gpt-4"` (missing azure/ prefix)
✅ **Right:** `model: "azure/gpt-4"`

❌ **Wrong:** `api_version: "2025-04-01-preview"` (future date)
✅ **Right:** `api_version: "2024-02-15-preview"` (current version)

## Temporary Fix (Use GPT-3.5 Turbo)

If you're not sure of your deployment name, try the most common one:

```yaml
model_list:
  - model_name: "gpt-35-turbo"
    litellm_params:
      model: "azure/gpt-35-turbo"
      api_base: "https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/"
      api_key: "81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
      api_version: "2024-02-15-preview"
```

## Test Your Configuration

```bash
# Test with curl
curl -X POST https://anos-production.up.railway.app/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-35-turbo",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Next Steps

1. **Find your actual Azure deployment name** (see methods above)
2. **Update `proxy_config.yaml`** with correct deployment name
3. **Commit and push** to Railway
4. **Test** the endpoint

## Need Help?

If you're still stuck, share:
1. Your Azure OpenAI resource name
2. Screenshot of your deployments page
3. The exact deployment name you want to use
