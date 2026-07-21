#!/usr/bin/env python3
"""
Supabase Database Initialization & Health Utility for Medicus Labs
Usage:
    python init_supabase.py
"""

import sys
import os
import logging

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import check_db_connection, init_db, engine, DATABASE_URL
from sqlalchemy import inspect

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("init_supabase")


def main():
    print("\n" + "=" * 70)
    print(" 🏥 MEDICUS LABS™ — SUPABASE DATABASE INITIALIZER & HEALTH CHECK")
    print("=" * 70)

    # 1. Inspect Environment Variable
    raw_db = os.getenv("DATABASE_URL") or os.getenv("SUPABASE_DB_URL")
    if raw_db:
        db_masked = raw_db.split("@")[-1] if "@" in raw_db else raw_db
        print(f"📌 Target Database Host: {db_masked}")
        if "supabase" in raw_db:
            print("🚀 Target Environment: Live Supabase PostgreSQL Project")
        else:
            print("ℹ️ Target Environment: Custom PostgreSQL")
    else:
        print("⚠️ DATABASE_URL not set in environment.")
        print("💡 Falling back to local SQLite database (sqlite:///./medicus.db)")

    print("\n[Step 1/3] Testing database connectivity...")
    health = check_db_connection()
    if health["connected"]:
        print(f"✅ Connection Successful! Provider: {health['provider']} ({health['type']})")
    else:
        print(f"❌ Connection Failed: {health.get('error')}")
        print("\n💡 Troubleshooting Tips:")
        print("   1. Verify DATABASE_URL in backend/.env is formatted as:")
        print("      postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres")
        print("   2. Check if your database password contains special characters and url-encode them.")
        print("   3. Ensure your internet connection allows outbound port 5432 / 6543 access.")
        sys.exit(1)

    print("\n[Step 2/3] Initializing tables and indices...")
    success = init_db()
    if not success:
        print("❌ Database initialization failed. Check logs above.")
        sys.exit(1)

    print("\n[Step 3/3] Inspecting database tables...")
    try:
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print(f"✅ Database contains {len(tables)} tables:")
        for tbl in sorted(tables):
            cols = len(inspector.get_columns(tbl))
            print(f"   • Table '{tbl}' ({cols} columns)")
    except Exception as e:
        print(f"⚠️ Could not inspect tables: {str(e)}")

    print("\n" + "=" * 70)
    print(" 🎉 SUPABASE DATABASE IS CONNECTED & READY FOR PRODUCTION!")
    print("=" * 70 + "\n")


if __name__ == "__main__":
    main()
