"""
Database ORM models for Medicus Labs (Supabase PostgreSQL / SQLite)
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, JSON, ForeignKey, Boolean
from datetime import datetime
import uuid
from database import Base


class User(Base):
    """User model"""
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255))
    password_hash = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}>"


class Analysis(Base):
    """Analysis model"""
    __tablename__ = "analyses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    patient_name = Column(String(255), nullable=False)
    patient_age = Column(Integer)
    patient_gender = Column(String(50))
    patient_mobile = Column(String(20))
    patient_email = Column(String(255))
    image_path = Column(String(500))
    image_url = Column(String(500))
    status = Column(String(50), default="pending", index=True)  # pending, processing, completed, failed
    prediction = Column(JSON)  # disease, confidence, probability
    confidence_score = Column(Float)
    recommendations = Column(JSON)  # list of recommendations
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Analysis {self.id}>"


class Report(Base):
    """Report model"""
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    analysis_id = Column(String(36), ForeignKey("analyses.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    report_path = Column(String(500))
    report_url = Column(String(500))
    report_data = Column(JSON)
    generated_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)
    emailed_at = Column(DateTime(timezone=True), nullable=True)
    downloaded_count = Column(Integer, default=0)

    def __repr__(self):
        return f"<Report {self.id}>"


class AnalysisHistory(Base):
    """Analysis history model"""
    __tablename__ = "analysis_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    analysis_id = Column(String(36), ForeignKey("analyses.id", ondelete="SET NULL"), nullable=True)
    disease = Column(String(255))
    confidence = Column(Float)
    image_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)

    def __repr__(self):
        return f"<AnalysisHistory {self.id}>"


class EmailQueue(Base):
    """Async email queue model"""
    __tablename__ = "email_queue"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    report_id = Column(String(36), ForeignKey("reports.id", ondelete="SET NULL"), nullable=True)
    user_email = Column(String(255))
    recipient_name = Column(String(255))
    sent_status = Column(Boolean, default=False, index=True)
    scheduled_time = Column(DateTime(timezone=True))
    sent_at = Column(DateTime(timezone=True), nullable=True)
    retry_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)

    def __repr__(self):
        return f"<EmailQueue {self.id} (sent={self.sent_status})>"
