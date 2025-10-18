#!/usr/bin/env python3
"""
Test Supabase database connection
Run this on your local machine to verify database credentials
"""

import sys

try:
    import psycopg2
except ImportError:
    print("❌ psycopg2 not installed")
    print("\nInstall it with:")
    print("  pip install psycopg2-binary")
    sys.exit(1)

# Your database connection string
DATABASE_URL = "postgresql://postgres.mqlogafnamygvtkpwwbu:Vf498S8C8HY3xNwq@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

print("🔍 Testing Supabase connection...")
print(f"Host: aws-0-us-east-1.pooler.supabase.com")
print(f"Port: 6543")
print(f"Database: postgres")
print()

try:
    # Try to connect
    print("⏳ Connecting...")
    conn = psycopg2.connect(DATABASE_URL)
    
    # Test query
    cursor = conn.cursor()
    cursor.execute("SELECT 1 as test;")
    result = cursor.fetchone()
    
    print("✅ CONNECTION SUCCESSFUL!")
    print(f"✅ Test query result: {result[0]}")
    
    # Check if LiteLLM tables exist
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE 'LiteLLM%'
        ORDER BY table_name;
    """)
    tables = cursor.fetchall()
    
    if tables:
        print(f"\n✅ Found {len(tables)} LiteLLM tables:")
        for table in tables:
            print(f"   - {table[0]}")
    else:
        print("\n⚠️  No LiteLLM tables found (database is empty)")
    
    # Close connection
    cursor.close()
    conn.close()
    
    print("\n✅ Database is working correctly!")
    print("✅ You can use this connection string in Render")
    
except psycopg2.OperationalError as e:
    print("❌ CONNECTION FAILED!")
    print(f"\nError: {e}")
    print("\n🔍 Possible issues:")
    print("  1. Supabase project is paused (check dashboard)")
    print("  2. Wrong password")
    print("  3. Network/firewall blocking connection")
    print("  4. Project was deleted")
    print("\n📝 Next steps:")
    print("  1. Go to: https://supabase.com/dashboard")
    print("  2. Check if project 'mqlogafnamygvtkpwwbu' exists")
    print("  3. Check if it's paused (click Resume)")
    print("  4. Get fresh connection string from Settings → Database")
    
except Exception as e:
    print(f"❌ Unexpected error: {e}")

print("\n" + "="*60)
