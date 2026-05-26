"""
Medicus Labs - Main Flask Application
Complete AI-Powered Dermatology Analysis Platform
"""

import os
import json
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['DEBUG'] = os.getenv('FLASK_ENV') == 'development'
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max file size

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import services
from isic_service import isic_validator
from huggingface_service import hf_predictor
from github_service import github_db
from report_generator import report_generator
from email_service import email_service

# ============================================================================
# HEALTH CHECK ENDPOINT
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """System health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "Medicus Labs API",
        "version": "2.0.0",
        "timestamp": datetime.now().isoformat(),
        "components": {
            "api": "operational",
            "database": "operational",
            "image_processor": "operational"
        }
    }), 200


# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register new user (simplified for now)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'full_name']
        if not all(field in data for field in required_fields):
            return jsonify({"status": "error", "message": "Missing required fields"}), 400
        
        # TODO: Add user to database
        
        return jsonify({
            "status": "success",
            "message": "Registration successful",
            "user_id": "USER_12345"
        }), 201
    
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login"""
    try:
        data = request.get_json()
        
        # Validate credentials
        if not data.get('email') or not data.get('password'):
            return jsonify({"status": "error", "message": "Email and password required"}), 400
        
        # TODO: Verify credentials in database
        # TODO: Generate JWT token
        
        return jsonify({
            "status": "success",
            "message": "Login successful",
            "token": "jwt_token_here",
            "user_id": "USER_12345"
        }), 200
    
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================================
# ANALYSIS ENDPOINTS
# ============================================================================

@app.route('/api/analysis/start', methods=['POST'])
def start_analysis():
    """
    Start complete 7-step analysis workflow
    
    Request body:
    {
        "patient": {
            "full_name": "John Doe",
            "age": 25,
            "gender": "Male",
            "mobile": "+91...",
            "email": "john@example.com"
        },
        "image": <binary file>
    }
    """
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({
                "status": "error",
                "message": "No image file provided"
            }), 400
        
        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({
                "status": "error",
                "message": "No image selected"
            }), 400
        
        # Get patient data
        patient_data = request.form.to_dict() if request.form else {}
        
        # Generate analysis ID
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        analysis_id = f"AN_{timestamp}"
        
        # Create uploads directory if not exists
        os.makedirs('uploads', exist_ok=True)
        
        # Save image temporarily
        image_path = f"uploads/{analysis_id}_{image_file.filename}"
        image_file.save(image_path)
        
        logger.info(f"Starting analysis {analysis_id}")
        
        # ======================================================
        # STEP 1: ISIC VALIDATION LAYER
        # ======================================================
        logger.info(f"[{analysis_id}] Step 1: ISIC Validation")
        
        is_valid, validation_msg, validation_details = isic_validator.validate_image_quality(image_path)
        
        if not is_valid:
            os.remove(image_path)  # Clean up
            return jsonify({
                "status": "error",
                "step": "isic_validation",
                "message": validation_msg,
                "details": validation_details
            }), 400
        
        logger.info(f"[{analysis_id}] ✓ Image validation passed")
        
        # ======================================================
        # STEP 2: GITHUB DISEASE DATABASE
        # ======================================================
        logger.info(f"[{analysis_id}] Step 2: GitHub Database (will be populated after HF prediction)")
        
        # Disease data will be fetched after we know the condition
        disease_data = None
        
        # ======================================================
        # STEP 3: HUGGING FACE PREDICTION
        # ======================================================
        logger.info(f"[{analysis_id}] Step 3: Hugging Face Prediction")
        
        hf_result = hf_predictor.predict_disease(image_path)
        
        if hf_result.get("status") != "success":
            os.remove(image_path)  # Clean up
            return jsonify({
                "status": "error",
                "step": "huggingface_prediction",
                "message": hf_result.get("message", "Prediction failed")
            }), 500
        
        condition = hf_result.get("condition")
        confidence = hf_result.get("raw_confidence", 0)
        
        logger.info(f"[{analysis_id}] ✓ Prediction: {condition} ({confidence:.1f}%)")
        
        # ======================================================
        # STEP 2 (CONTINUED): FETCH GITHUB DISEASE DATA
        # ======================================================
        logger.info(f"[{analysis_id}] Step 2 (continued): Fetching disease guidance")
        
        disease_data = github_db.fetch_disease_data(condition)
        
        logger.info(f"[{analysis_id}] ✓ Disease data loaded")
        
        # ======================================================
        # STEP 3.5: FETCH ISIC SIMILAR IMAGES (for reference)
        # ======================================================
        logger.info(f"[{analysis_id}] Fetching ISIC reference images")
        
        isic_references = isic_validator.fetch_similar_images(condition, limit=3)
        
        logger.info(f"[{analysis_id}] ✓ ISIC references loaded")
        
        # ======================================================
        # STEP 4: GENERATE INSTANT REPORT
        # ======================================================
        logger.info(f"[{analysis_id}] Step 4: Generating Report")
        
        report_data = {
            "patient": patient_data,
            "image_path": image_path,
            "condition": condition,
            "confidence": confidence,
            "isic_validation": is_valid,
            "disease_data": disease_data,
            "analysis_id": analysis_id
        }
        
        report_result = report_generator.generate_report(report_data)
        
        if report_result.get("status") != "success":
            os.remove(image_path)
            return jsonify({
                "status": "error",
                "message": "Report generation failed"
            }), 500
        
        report_id = report_result.get("report_id")
        
        logger.info(f"[{analysis_id}] ✓ Report generated: {report_id}")
        
        # ======================================================
        # STEP 5: PDF GENERATION (handled on frontend)
        # ======================================================
        logger.info(f"[{analysis_id}] Step 5: PDF ready for download")
        
        # ======================================================
        # STEP 6: SCHEDULE EMAIL DELIVERY
        # ======================================================
        logger.info(f"[{analysis_id}] Step 6: Scheduling email (5 minutes)")
        
        email_schedule = email_service.schedule_email(
            recipient_email=patient_data.get('email'),
            analysis_data=report_data,
            delay_minutes=5
        )
        
        logger.info(f"[{analysis_id}] ✓ Email scheduled for {email_schedule.get('scheduled_time')}")
        
        # ======================================================
        # RETURN SUCCESS RESPONSE
        # ======================================================
        
        return jsonify({
            "status": "success",
            "analysis_id": analysis_id,
            "report_id": report_id,
            "condition": condition,
            "confidence": f"{confidence:.1f}%",
            "severity": report_result.get("summary", {}).get("severity", "Unknown"),
            "urgent": report_result.get("summary", {}).get("urgent", False),
            "isic_validated": is_valid,
            "report_html": report_result.get("html_content"),
            "email_scheduled": True,
            "email_send_time": email_schedule.get("scheduled_time"),
            "timestamp": datetime.now().isoformat(),
            "powered_by": {
                "isic": "ISIC Dermatology Reference Support",
                "ai": "Hugging Face Medical Vision Models",
                "database": "GitHub Clinical Guidance Database"
            }
        }), 200
    
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": f"Analysis failed: {str(e)}"
        }), 500


@app.route('/api/analysis/<analysis_id>', methods=['GET'])
def get_analysis(analysis_id):
    """Get analysis details"""
    try:
        # TODO: Fetch from database
        return jsonify({
            "status": "success",
            "analysis_id": analysis_id
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================================
# REPORT ENDPOINTS
# ============================================================================

@app.route('/api/report/<report_id>', methods=['GET'])
def get_report(report_id):
    """Get report details"""
    try:
        # TODO: Fetch from database
        return jsonify({
            "status": "success",
            "report_id": report_id
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/api/report/<report_id>/download', methods=['GET'])
def download_report(report_id):
    """Download report as PDF"""
    try:
        # TODO: Generate and return PDF
        return jsonify({
            "status": "success",
            "message": "PDF download available"
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================================
# HISTORY ENDPOINTS
# ============================================================================

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get user analysis history"""
    try:
        user_id = request.args.get('user_id')
        
        if not user_id:
            return jsonify({
                "status": "error",
                "message": "User ID required"
            }), 400
        
        # TODO: Fetch from database
        return jsonify({
            "status": "success",
            "user_id": user_id,
            "analyses": []
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================================
# DISEASE DATABASE ENDPOINTS
# ============================================================================

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    """Get list of all available diseases"""
    try:
        diseases = github_db.get_all_diseases()
        return jsonify({
            "status": "success",
            "data": diseases
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/api/disease/<disease_name>', methods=['GET'])
def get_disease_info(disease_name):
    """Get disease information"""
    try:
        disease_data = github_db.fetch_disease_data(disease_name)
        return jsonify({
            "status": "success",
            "data": disease_data
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({"status": "error", "message": "Endpoint not found"}), 404


@app.errorhandler(500)
def server_error(error):
    logger.error(f"Server error: {str(error)}")
    return jsonify({"status": "error", "message": "Internal server error"}), 500


# ============================================================================
# BACKGROUND TASK SCHEDULER
# ============================================================================

def schedule_email_task():
    """Background task to send scheduled emails"""
    logger.info("Email scheduler running...")
    # TODO: Query database for scheduled emails and send them
    pass


# Initialize scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=schedule_email_task, trigger="interval", minutes=1)
scheduler.start()

# Shutdown scheduler when app closes
atexit.register(lambda: scheduler.shutdown())


# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info("=" * 60)
    logger.info("🏥 Medicus Labs™ - Dermatology Analysis Platform")
    logger.info("Version: 2.0.0")
    logger.info("=" * 60)
    logger.info(f"Starting Flask server on port {port}")
    logger.info(f"Debug mode: {debug}")
    logger.info(f"ISIC API: {os.getenv('ISIC_API_BASE_URL')}")
    logger.info(f"Hugging Face: Configured")
    logger.info(f"Email Service: Resend API")
    logger.info("=" * 60)
    
    app.run(host='0.0.0.0', port=port, debug=debug)
