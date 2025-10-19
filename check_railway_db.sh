#!/bin/bash

# Script to check Railway database and diagnose issues

echo "=== Checking Railway Database Setup ==="
echo ""

echo "1. Testing /health endpoint..."
curl -s https://anos-production.up.railway.app/health
echo ""
echo ""

echo "2. Testing /v1/models endpoint..."
curl -s https://anos-production.up.railway.app/v1/models \
  -H "Authorization: Bearer sk-1234" | jq '.' 2>/dev/null || echo "Failed or not JSON"
echo ""
echo ""

echo "3. Testing /model_group/info endpoint..."
curl -s https://anos-production.up.railway.app/model_group/info \
  -H "Authorization: Bearer sk-1234"
echo ""
echo ""

echo "4. Testing /v2/model/info endpoint..."
curl -s https://anos-production.up.railway.app/v2/model/info \
  -H "Authorization: Bearer sk-1234" | jq '.' 2>/dev/null || echo "Failed or not JSON"
echo ""
echo ""

echo "=== Diagnosis ==="
echo "If you see 'Internal Server Error', the database is not initialized."
echo ""
echo "Fix: Run database migrations in Railway:"
echo "  1. Go to Railway Dashboard"
echo "  2. Click your service"
echo "  3. Go to Settings → Deploy"
echo "  4. Add this to 'Start Command':"
echo "     litellm --config /app/proxy_config.yaml --port 4000 --detailed_debug"
echo ""
echo "Or manually run migrations:"
echo "  railway run python -m litellm.proxy.db_migrations"
