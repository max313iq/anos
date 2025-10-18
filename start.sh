#!/bin/bash
set -e

echo "=== LiteLLM Startup ==="

# Set your environment variables
export DATABASE_URL="postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@hopper.proxy.rlwy.net:16649/railway"
export LITELLM_MASTER_KEY="sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
export LITELLM_SALT_KEY="sk-1234"
export UI_USERNAME="admin"
export UI_PASSWORD="admin123!@#"
export PORT="4000"

# Azure OpenAI credentials
export AZURE_API_BASE="https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/"
export AZURE_API_KEY="81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
export AZURE_API_VERSION="2025-04-01-preview"

echo "Environment variables set"

# Create config file directly
CONFIG_FILE="/app/proxy_config.yaml"
cat > "$CONFIG_FILE" << 'EOF'
model_list:
  - model_name: "gpt-5-codex"
    litellm_params:
      model: "azure/gpt-5-codex"
      api_base: "https://ai-uea1sub1618ai763855450353.cognitiveservices.azure.com/"
      api_key: "81pOESDtLwIIHjfSS7RytcJ2yUd6eF1ksZsgDtW737fh0J9giZ72JQQJ99BJACfhMk5XJ3w3AAAAACOGYbD2"
      api_version: "2025-04-01-preview"

litellm_settings:
  drop_params: true
  set_verbose: true

general_settings:
  default_model: "gpt-5-codex"
EOF

echo "✅ Config file created"
echo "Config file content:"
cat "$CONFIG_FILE"

echo "🚀 Starting LiteLLM..."
exec litellm --config "$CONFIG_FILE"
