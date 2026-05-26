-- ============================================================================
-- MEDICUS LABS™ - PRODUCTION DATABASE SCHEMA
-- Compatible with FastAPI + SQLAlchemy + PostgreSQL/MySQL
-- ============================================================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    password_hash VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

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
    prediction JSON,
    confidence_score FLOAT,
    recommendations JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(36) PRIMARY KEY,
    analysis_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    report_path VARCHAR(500),
    report_url VARCHAR(500),
    report_data JSON,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    emailed_at TIMESTAMP,
    downloaded_count INT DEFAULT 0,
    FOREIGN KEY (analysis_id) REFERENCES analyses(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_analysis_id (analysis_id),
    INDEX idx_user_id (user_id),
    INDEX idx_generated_at (generated_at)
);

-- Analysis History
CREATE TABLE IF NOT EXISTS analysis_history (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    analysis_id VARCHAR(36),
    disease VARCHAR(255),
    confidence FLOAT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (analysis_id) REFERENCES analyses(id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Email Queue (for async email processing)
CREATE TABLE IF NOT EXISTS email_queue (
    id VARCHAR(36) PRIMARY KEY,
    report_id VARCHAR(36),
    user_email VARCHAR(255),
    recipient_name VARCHAR(255),
    sent_status BOOLEAN DEFAULT FALSE,
    scheduled_time TIMESTAMP,
    sent_at TIMESTAMP,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id),
    INDEX idx_sent_status (sent_status),
    INDEX idx_created_at (created_at)
);
