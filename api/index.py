"""
LiteLLM Proxy Server for Vercel Deployment
"""
import os
import sys

# Add the parent directory to the path so we can import litellm
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from litellm.proxy.proxy_server import app, initialize

# Initialize the proxy server
# This will load the config from environment variables or default config
initialize()

# Export the FastAPI app for Vercel
# Vercel will use this as the ASGI application
handler = app
