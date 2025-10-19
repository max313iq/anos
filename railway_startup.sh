#!/bin/bash
set -e

echo "🚀 LiteLLM Railway Startup Script"
echo "=================================="
echo ""

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL not set"
    exit 1
fi

if [ -z "$LITELLM_MASTER_KEY" ]; then
    echo "❌ ERROR: LITELLM_MASTER_KEY not set"
    exit 1
fi

echo "✅ Environment variables OK"
echo ""

# Clear old models from database to force reload from config
echo "🗑️  Clearing old models from database..."
python3 << 'PYTHON_SCRIPT'
import os
import asyncio

async def clear_models():
    try:
        from litellm.proxy.utils import PrismaClient
        
        prisma_client = PrismaClient(
            database_url=os.environ["DATABASE_URL"]
        )
        
        await prisma_client.connect()
        
        # Delete all models from database
        result = await prisma_client.db.litellm_proxymodeltable.delete_many()
        print(f"✅ Deleted old models from database")
        
        await prisma_client.disconnect()
    except Exception as e:
        print(f"⚠️  Warning: Could not clear models: {e}")
        print("   Continuing anyway...")

asyncio.run(clear_models())
PYTHON_SCRIPT

echo ""
echo "📝 Starting LiteLLM Proxy..."
echo "   Config: proxy_config.yaml"
echo "   Port: ${PORT:-4000}"
echo "   Store models in DB: True"
echo ""

# Start LiteLLM with config
# This will:
# 1. Read models from proxy_config.yaml
# 2. Store them in database (because store_model_in_db: true)
# 3. Serve from database going forward
exec litellm --config proxy_config.yaml --port ${PORT:-4000}
