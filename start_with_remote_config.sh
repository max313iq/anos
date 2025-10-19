#!/bin/bash
set -e

echo "=== LiteLLM Startup with Remote Config ==="

# Check if we should use local optimized config
if [ -z "$LITELLM_CONFIG_URL" ] && [ -f "proxy_config_optimized.yaml" ]; then
    echo "Using local optimized config (proxy_config_optimized.yaml)"
    CONFIG_FILE="proxy_config_optimized.yaml"
    echo "Starting LiteLLM on port ${PORT:-4000}..."
    echo "Using config: $CONFIG_FILE"
    
    # Determine how to run litellm (poetry or direct)
    if command -v poetry &> /dev/null && [ -f "pyproject.toml" ]; then
        echo "Using poetry to run litellm..."
        exec poetry run litellm --config "$CONFIG_FILE" --port "${PORT:-4000}" --host 0.0.0.0
    elif command -v litellm &> /dev/null; then
        echo "Using system litellm..."
        exec litellm --config "$CONFIG_FILE" --port "${PORT:-4000}" --host 0.0.0.0
    else
        echo "ERROR: litellm command not found"
        exit 1
    fi
fi

# Default GitHub raw URL - LiteLLM stock repository
DEFAULT_CONFIG_URL="https://raw.githubusercontent.com/BerriAI/litellm/main/proxy_server_config.yaml"

# Use environment variable if set, otherwise use default stock config
CONFIG_URL="${LITELLM_CONFIG_URL:-$DEFAULT_CONFIG_URL}"

echo "Config URL: $CONFIG_URL"
echo "Downloading config from GitHub..."

# Determine config directory (use /app if writable, otherwise current directory)
if [ -w /app ] 2>/dev/null || mkdir -p /app 2>/dev/null; then
    CONFIG_DIR="/app"
else
    CONFIG_DIR="."
fi

CONFIG_FILE="${CONFIG_DIR}/proxy_config_downloaded.yaml"

# Download the config file
if curl -fsSL "$CONFIG_URL" -o "$CONFIG_FILE"; then
    echo "✅ Config downloaded successfully to $CONFIG_FILE"
    echo "Config file size: $(wc -c < "$CONFIG_FILE") bytes"
else
    echo "❌ Failed to download config from $CONFIG_URL"
    echo "Checking if local config exists..."
    if [ -f "proxy_config.yaml" ]; then
        echo "Using local proxy_config.yaml"
        CONFIG_FILE="proxy_config.yaml"
    elif [ -f "proxy_config_optimized.yaml" ]; then
        echo "Using local proxy_config_optimized.yaml"
        CONFIG_FILE="proxy_config_optimized.yaml"
    else
        echo "ERROR: No config file available"
        exit 1
    fi
fi

echo "Starting LiteLLM on port ${PORT:-4000}..."
echo "Using config: $CONFIG_FILE"

# Determine how to run litellm (poetry or direct)
if command -v poetry &> /dev/null && [ -f "pyproject.toml" ]; then
    echo "Using poetry to run litellm..."
    exec poetry run litellm --config "$CONFIG_FILE" --port "${PORT:-4000}" --host 0.0.0.0
elif command -v litellm &> /dev/null; then
    echo "Using system litellm..."
    exec litellm --config "$CONFIG_FILE" --port "${PORT:-4000}" --host 0.0.0.0
else
    echo "ERROR: litellm command not found"
    echo "Please install litellm or run with poetry"
    exit 1
fi
