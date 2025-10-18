#!/bin/bash

# LiteLLM Proxy Server Startup Script
# Configuration stored in /usr/litellm/

export DATABASE_URL="postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
export LITELLM_MASTER_KEY="sk-GlKcxTq8V92f7zVZPvAQFMlqhc5tAC6_GsSe5-1Br_s"
export LITELLM_SALT_KEY="sk-a1b2c3d4e5f6"
export PORT=4000
export STORE_MODEL_IN_DB="True"

cd /workspaces/litellm
poetry run litellm --config litellm/proxy/proxy_config.yaml --port 4000 --host 0.0.0.0
