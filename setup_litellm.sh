#!/bin/bash
set -e

echo "=== LiteLLM Configuration Setup ==="

# Your specific configuration
CONFIG_URL="https://raw.githubusercontent.com/max313iq/anos/main/proxy_config.yaml"
CONFIG_FILE="/app/proxy_config.yaml"

# Download your config
echo "Downloading config from: $CONFIG_URL"
curl -sSf "$CONFIG_URL" -o "$CONFIG_FILE"

# Verify config was downloaded
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Failed to download config file"
    exit 1
fi

echo "✅ Config downloaded successfully"

# Set your environment variables
export DATABASE_URL="postgresql://postgres:ewJimjnmajcUjpxXDnjEUuOJoWEqiliE@hopper.proxy.rlwy.net:16649/railway"
export LITELLM_MASTER_KEY="sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
export LITELLM_SALT_KEY="sk-1234"
export UI_USERNAME="admin"
export UI_PASSWORD="admin123!@#"
export PORT="4000"

echo "Environment variables set:"
echo "📊 DATABASE_URL: [hidden]"
echo "🔑 LITELLM_MASTER_KEY: [hidden]"
echo "🧂 LITELLM_SALT_KEY: [hidden]"
echo "👤 UI_USERNAME: $UI_USERNAME"
echo "🔒 UI_PASSWORD: [hidden]"
echo "🌐 PORT: $PORT"

# Start LiteLLM
echo "🚀 Starting LiteLLM with your configuration..."
litellm --config "$CONFIG_FILE"
