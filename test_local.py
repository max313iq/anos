#!/usr/bin/env python3
"""
LiteLLM Local Proxy Test Script
Tests the locally running proxy with various requests
"""

import openai
import json
import sys

# Configure client
client = openai.OpenAI(
    api_key="sk-1234",
    base_url="http://localhost:4000/v1"
)

def print_section(title):
    """Print a formatted section header"""
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def test_models():
    """Test listing available models"""
    print_section("1. Testing Model List")
    try:
        models = client.models.list()
        print(f"✅ Found {len(models.data)} models:")
        for model in models.data:
            print(f"   - {model.id}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_simple_chat():
    """Test a simple chat completion"""
    print_section("2. Testing Simple Chat Completion")
    try:
        response = client.chat.completions.create(
            model="gpt-5",
            messages=[
                {"role": "user", "content": "Say 'Hello from LiteLLM!' and nothing else"}
            ],
            max_tokens=20
        )
        
        content = response.choices[0].message.content
        print(f"✅ Response received:")
        print(f"   Model: {response.model}")
        print(f"   Content: {content}")
        print(f"   Tokens: {response.usage.total_tokens}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_codex():
    """Test GPT-5 Codex for code generation"""
    print_section("3. Testing GPT-5 Codex (Code Generation)")
    try:
        response = client.chat.completions.create(
            model="gpt-5-codex",
            messages=[
                {"role": "user", "content": "Write a Python function that returns 'Hello World'"}
            ],
            max_tokens=100
        )
        
        content = response.choices[0].message.content
        print(f"✅ Code generated:")
        print(f"   Model: {response.model}")
        print(f"   Response:\n{content}")
        print(f"   Tokens: {response.usage.total_tokens}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_streaming():
    """Test streaming responses"""
    print_section("4. Testing Streaming")
    try:
        print("✅ Streaming response:")
        print("   ", end="", flush=True)
        
        stream = client.chat.completions.create(
            model="gpt-5",
            messages=[
                {"role": "user", "content": "Count from 1 to 5"}
            ],
            stream=True,
            max_tokens=50
        )
        
        for chunk in stream:
            if chunk.choices[0].delta.content:
                print(chunk.choices[0].delta.content, end="", flush=True)
        
        print("\n")
        return True
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

def test_with_metadata():
    """Test request with metadata for tracking"""
    print_section("5. Testing with Metadata (Spend Tracking)")
    try:
        response = client.chat.completions.create(
            model="gpt-5",
            messages=[
                {"role": "user", "content": "What is 2+2?"}
            ],
            max_tokens=20,
            extra_body={
                "metadata": {
                    "user": "test-user",
                    "team": "engineering",
                    "project": "local-testing"
                }
            }
        )
        
        print(f"✅ Request with metadata successful:")
        print(f"   Response: {response.choices[0].message.content}")
        print(f"   Metadata will be tracked in database")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("  🚀 LiteLLM Local Proxy Test Suite")
    print("="*60)
    print(f"\n📍 Testing proxy at: http://localhost:4000")
    print(f"🔑 Using master key: sk-1234")
    
    results = []
    
    # Run tests
    results.append(("List Models", test_models()))
    results.append(("Simple Chat", test_simple_chat()))
    results.append(("Codex (Code Gen)", test_codex()))
    results.append(("Streaming", test_streaming()))
    results.append(("Metadata Tracking", test_with_metadata()))
    
    # Summary
    print_section("Test Summary")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n{'='*60}")
    print(f"  Results: {passed}/{total} tests passed")
    print(f"{'='*60}\n")
    
    if passed == total:
        print("🎉 All tests passed! Proxy is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the output above for details.")
        return 1

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
        sys.exit(1)
