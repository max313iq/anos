#!/bin/bash

echo "=== Testing LiteLLM Enterprise Features ==="
echo ""

RAILWAY_URL="https://anos-production.up.railway.app"
MASTER_KEY="sk-1234"

echo "1. Testing banned keywords guardrail..."
echo "   Sending request with banned word 'spam'..."
curl -s -X POST "$RAILWAY_URL/v1/chat/completions" \
  -H "Authorization: Bearer $MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "How to spam people"}]
  }' | jq '.' 2>/dev/null || echo "Request blocked or failed"
echo ""
echo ""

echo "2. Testing normal request (no banned keywords)..."
curl -s -X POST "$RAILWAY_URL/v1/chat/completions" \
  -H "Authorization: Bearer $MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-codex",
    "messages": [{"role": "user", "content": "Hello, how are you?"}]
  }' | jq '.choices[0].message.content' 2>/dev/null || echo "Request failed"
echo ""
echo ""

echo "3. Checking if Prometheus metrics endpoint exists..."
curl -s "$RAILWAY_URL/metrics" | head -5 || echo "Prometheus not enabled (requires prometheus_client package)"
echo ""
echo ""

echo "4. Checking enterprise features in health endpoint..."
curl -s "$RAILWAY_URL/health" | jq '.' 2>/dev/null || echo "Health check failed"
echo ""
echo ""

echo "=== Enterprise Features Summary ==="
echo "✅ Banned Keywords: Configured (blocks: spam, abuse, hack, exploit)"
echo "✅ Blocked User List: Available (disabled by default)"
echo "⚠️  Prometheus: Requires prometheus_client package"
echo "✅ All features FREE for development/testing"
echo ""
echo "To enable more features, see ENTERPRISE_SETUP.md"
