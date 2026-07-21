"""
Database Connection & Session Management for Medicus Labs
Supports Supabase PostgreSQL & SQLite Fallback
"""

import os
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Base class for SQLAlchemy ORM models
Base = declarative_base()

# Obtain database connection URL from environment
raw_db_url = os.getenv("DATABASE_URL") or os.getenv("SUPABASE_DB_URL")

def get_formatted_db_url(url: str | None) -> str:
    """Format and normalize database connection string for SQLAlchemy"""
    if not url:
        return "sqlite:///./medicus.db"
    
    # Standardize postgres protocol for SQLAlchemy 2.0+
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    
    # Ensure sslmode=require for Supabase / remote PostgreSQL if not specified
    if "postgresql" in url and "sslmode" not in url:
        separator = "&" if "?" in url else "?"
        url = f"{url}{separator}sslmode=require"
        
    return url

DATABASE_URL = get_formatted_db_url(raw_db_url)

# Engine configuration based on database driver
engine_kwargs = {}

if DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    # PostgreSQL pool settings for Supabase
    engine_kwargs["pool_pre_ping"] = True
    engine_kwargs["pool_size"] = 10
    engine_kwargs["max_overflow"] = 20

engine = create_engine(DATABASE_URL, **engine_kwargs)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """FastAPI Dependency for database sessions"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_db_connection() -> dict:
    """Check database health and return detailed status"""
    db_type = "postgresql" if "postgresql" in DATABASE_URL else "sqlite"
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1")).scalar()
            if result == 1:
                return {
                    "connected": True,
                    "type": db_type,
                    "provider": "Supabase" if db_type == "postgresql" else "SQLite (Local)",
                    "status": "healthy"
                }
    except Exception as e:
        logger.error(f"Database health check failed ({db_type}): {str(e)}")
        return {
            "connected": False,
            "type": db_type,
            "provider": "Supabase" if db_type == "postgresql" else "SQLite (Local)",
            "status": "unhealthy",
            "error": str(e)
        }


def init_db():
    """Initialize database tables"""
    try:
        # Import models to ensure they are registered with Base metadata
        import models  # noqa: F401
        Base.metadata.create_all(bind=engine)
        db_provider = "Supabase PostgreSQL" if "postgresql" in DATABASE_URL else "SQLite"
        logger.info(f"✅ Database tables initialized successfully on {db_provider}!")
        return True
    except Exception as e:
        logger.error(f"❌ Failed to initialize database tables: {str(e)}")
        return False
