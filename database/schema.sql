-- ============================================================================
-- MEDICUS LABS™ - PRODUCTION SUPABASE / POSTGRESQL DATABASE SCHEMA
-- Fully compatible with Supabase SQL Editor & SQLAlchemy ORM
-- ============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    password_hash VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- Analysis Records
CREATE TABLE IF NOT EXISTS analyses (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_age INT,
    patient_gender VARCHAR(50),
    patient_mobile VARCHAR(20),
    patient_email VARCHAR(255),
    image_path VARCHAR(500),
    image_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pending',
    prediction JSONB,
    confidence_score FLOAT,
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses (user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_status ON analyses (status);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses (created_at);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(36) PRIMARY KEY,
    analysis_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    report_path VARCHAR(500),
    report_url VARCHAR(500),
    report_data JSONB,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    emailed_at TIMESTAMP WITH TIME ZONE,
    downloaded_count INT DEFAULT 0,
    FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reports_analysis_id ON reports (analysis_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports (user_id);
CREATE INDEX IF NOT EXISTS idx_reports_generated_at ON reports (generated_at);

-- Analysis History Table
CREATE TABLE IF NOT EXISTS analysis_history (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    analysis_id VARCHAR(36),
    disease VARCHAR(255),
    confidence FLOAT,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_history_user_id ON analysis_history (user_id);
CREATE INDEX IF NOT EXISTS idx_history_created_at ON analysis_history (created_at);

-- Email Queue Table
CREATE TABLE IF NOT EXISTS email_queue (
    id VARCHAR(36) PRIMARY KEY,
    report_id VARCHAR(36),
    user_email VARCHAR(255),
    recipient_name VARCHAR(255),
    sent_status BOOLEAN DEFAULT FALSE,
    scheduled_time TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_email_queue_sent_status ON email_queue (sent_status);
CREATE INDEX IF NOT EXISTS idx_email_queue_created_at ON email_queue (created_at);
