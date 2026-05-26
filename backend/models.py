"""
Database models for Medicus Labs
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, JSON, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()


class User(Base):
    """User model"""
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    password_hash = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}>"


class Analysis(Base):
    """Analysis model"""
    __tablename__ = "analyses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    patient_name = Column(String)
    patient_age = Column(Integer)
    patient_gender = Column(String)
    patient_mobile = Column(String)
    patient_email = Column(String)
    image_path = Column(String)
    image_url = Column(String)
    status = Column(String, default="pending")  # pending, processing, completed, failed
    prediction = Column(JSON)  # disease, confidence, probability
    confidence_score = Column(Float)
    recommendations = Column(JSON)  # list of recommendations
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Analysis {self.id}>"


class Report(Base):
    """Report model"""
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    analysis_id = Column(String, ForeignKey("analyses.id"))
    user_id = Column(String, ForeignKey("users.id"))
    report_path = Column(String)
    report_url = Column(String)
    report_data = Column(JSON)
    generated_at = Column(DateTime, default=datetime.utcnow)
    emailed_at = Column(DateTime, nullable=True)
    downloaded_count = Column(Integer, default=0)

    def __repr__(self):
        return f"<Report {self.id}>"


class AnalysisHistory(Base):
    """Analysis history model"""
    __tablename__ = "analysis_history"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    analysis_id = Column(String, ForeignKey("analyses.id"))
    disease = Column(String)
    confidence = Column(Float)
    image_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<AnalysisHistory {self.id}>"
