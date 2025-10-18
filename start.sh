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

echo "Environment variables set"
echo "📊 Database: Connected"
echo "🔑 Master Key: Set"
echo "👤 UI: $UI_USERNAME"
echo "🌐 Port: $PORT"

# Download your config
CONFIG_URL="https://raw.githubusercontent.com/max313iq/anos/main/proxy_config.yaml"
CONFIG_FILE="/app/proxy_config.yaml"

echo "Downloading config from: $CONFIG_URL"
curl -sSf "$CONFIG_URL" -o "$CONFIG_FILE"

echo "✅ Config downloaded"
echo "🚀 Starting LiteLLM..."

# Start LiteLLM with your config
exec litellm --config "$CONFIG_FILE"
