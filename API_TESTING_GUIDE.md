# 🧪 API TESTING GUIDE - MEDICUS LABS™

**Complete guide to test all API endpoints and verify the 7-step workflow**

---

## ✅ SETUP BEFORE TESTING

### 1. Start Backend Server
```bash
# Terminal 1
cd medicuslabs
source venv/bin/activate
python app.py
```

### 2. Verify Backend is Running
```bash
# Terminal 2
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "Medicus Labs API",
  "version": "2.0.0",
  "timestamp": "2026-05-25T12:00:00.000000",
  "components": {
    "api": "operational",
    "database": "operational",
    "image_processor": "operational"
  }
}
```

---

## 📋 TEST CASES

### TEST 1: Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

**Expected Status**: `200 OK`

---

### TEST 2: Get Available Diseases
```bash
curl -X GET http://localhost:5000/api/diseases
```

**Expected Response**:
```json
{
  "status": "success",
  "data": {
    "available_diseases": ["acne", "eczema", "psoriasis", "melanoma", ...],
    "count": 8
  }
}
```

---

### TEST 3: Get Disease Information
```bash
curl -X GET http://localhost:5000/api/disease/acne
```

**Expected Response**:
```json
{
  "status": "success",
  "data": {
    "status": "success",
    "source": "GitHub Medical Database",
    "data": {
      "condition": "Acne",
      "severity_levels": ["Mild", "Moderate", "Severe"],
      "symptoms": [...],
      "precautions": [...],
      ...
    }
  }
}
```

---

### TEST 4: Complete Analysis Workflow (MAIN TEST)

This is the most important test - it exercises the complete 7-step workflow.

#### Step A: Get a Test Image
You need a skin image to test. Options:
1. Use any JPG/PNG image on your computer
2. Download a sample from ISIC Archive: https://www.isic-archive.com/
3. Create a dummy image: `convert -size 200x200 xc:pink test.jpg` (if ImageMagick installed)

#### Step B: Run Complete Analysis
```bash
curl -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=John Doe" \
  -F "age=25" \
  -F "gender=Male" \
  -F "mobile=+919876543210" \
  -F "email=test@example.com" \
  -F "image=@./test.jpg"
```

**Expected Response** (SUCCESS):
```json
{
  "status": "success",
  "analysis_id": "AN_20260525_120000",
  "report_id": "RPT_20260525_120000",
  "condition": "Acne",
  "confidence": "87.5%",
  "severity": "⚠️ Moderate - Consider professional consultation",
  "urgent": false,
  "isic_validated": true,
  "report_html": "<html>...</html>",
  "email_scheduled": true,
  "email_send_time": "2026-05-25 12:05:00",
  "timestamp": "2026-05-25T12:00:00.000000",
  "powered_by": {
    "isic": "ISIC Dermatology Reference Support",
    "ai": "Hugging Face Medical Vision Models",
    "database": "GitHub Clinical Guidance Database"
  }
}
```

**Response Status**: `200 OK`

#### Step C: Verify Workflow Completed
In the response, you should see:
- ✓ `condition` - AI detected the skin condition
- ✓ `confidence` - Shows prediction confidence
- ✓ `isic_validated: true` - Image passed ISIC validation
- ✓ `report_html` - HTML report generated
- ✓ `email_scheduled: true` - Email scheduled for 5 minutes
- ✓ `powered_by` - Shows all three integrations

---

### TEST 5: Invalid Image Test

Test what happens with poor quality image:

```bash
# Create a blank image (will fail validation)
convert -size 100x100 xc:white invalid.jpg

# Send it
curl -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=Test User" \
  -F "age=30" \
  -F "gender=Female" \
  -F "mobile=+919876543210" \
  -F "email=test@example.com" \
  -F "image=@./invalid.jpg"
```

**Expected Response** (ERROR):
```json
{
  "status": "error",
  "step": "isic_validation",
  "message": "Image too small. Minimum 200x200 pixels required.",
  "details": {
    "dimension": "100x100",
    "issue": "too_small"
  }
}
```

**Response Status**: `400 Bad Request`

---

### TEST 6: Missing Required Fields

```bash
# Missing email field
curl -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=Test User" \
  -F "image=@./test.jpg"
```

**Expected Response**:
```json
{
  "status": "error",
  "message": "No image file provided" or "Missing required fields"
}
```

---

### TEST 7: Authentication Endpoints (Skeleton)

```bash
# User Registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePassword123!",
    "full_name": "New User"
  }'
```

**Expected Response**:
```json
{
  "status": "success",
  "message": "Registration successful",
  "user_id": "USER_12345"
}
```

---

### TEST 8: User Login (Skeleton)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response**:
```json
{
  "status": "success",
  "message": "Login successful",
  "token": "jwt_token_here",
  "user_id": "USER_12345"
}
```

---

## 🔍 STEP-BY-STEP WORKFLOW VERIFICATION

Run the complete analysis and verify each step:

```bash
# Run analysis
RESULT=$(curl -s -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=John Doe" \
  -F "age=25" \
  -F "gender=Male" \
  -F "mobile=+919876543210" \
  -F "email=test@example.com" \
  -F "image=@./test.jpg")

# Extract fields
ANALYSIS_ID=$(echo $RESULT | jq -r '.analysis_id')
REPORT_ID=$(echo $RESULT | jq -r '.report_id')
CONDITION=$(echo $RESULT | jq -r '.condition')
CONFIDENCE=$(echo $RESULT | jq -r '.confidence')
ISIC=$(echo $RESULT | jq -r '.isic_validated')
EMAIL_SCHEDULED=$(echo $RESULT | jq -r '.email_scheduled')

# Print verification
echo "✓ STEP 1 - ISIC Validation: $ISIC"
echo "✓ STEP 3 - Hugging Face Prediction: $CONDITION ($CONFIDENCE)"
echo "✓ STEP 4 - Report Generated: $REPORT_ID"
echo "✓ STEP 6 - Email Scheduled: $EMAIL_SCHEDULED"
echo "✓ Analysis ID: $ANALYSIS_ID"
```

---

## 📊 EXPECTED BEHAVIOR

### Successful Analysis Flow:
1. **Image Upload** - File saved to `/uploads/`
2. **ISIC Validation** - Image quality checked
3. **GitHub Fetch** - Disease data loaded (runs concurrently after HF prediction)
4. **HF Prediction** - Condition identified + confidence calculated
5. **Report Gen** - HTML report created with styling
6. **Email Schedule** - Added to queue for 5-minute delivery
7. **Response** - Complete data returned to frontend

### Error Handling:
- **Invalid image** → Return error at Step 1
- **Blurry image** → Return error at Step 1
- **HF timeout** → Return error at Step 3
- **GitHub unavailable** → Use fallback data at Step 2

---

## 🛠️ DEBUGGING TIPS

### Check Server Logs
```bash
# In the terminal running Flask server, you'll see:
[INFO] Starting analysis AN_20260525_120000
[INFO] [AN_20260525_120000] Step 1: ISIC Validation
[INFO] [AN_20260525_120000] ✓ Image validation passed
[INFO] [AN_20260525_120000] Step 3: Hugging Face Prediction
[INFO] [AN_20260525_120000] ✓ Prediction: Acne (87.5%)
[INFO] [AN_20260525_120000] Step 4: Generating Report
[INFO] [AN_20260525_120000] ✓ Report generated: RPT_20260525_120000
```

### Test Individual Services

```bash
# Test ISIC service directly (Python)
python3 << 'EOF'
from isic_service import isic_validator
is_valid, msg, details = isic_validator.validate_image_quality('./test.jpg')
print(f"Valid: {is_valid}")
print(f"Message: {msg}")
print(f"Details: {details}")
EOF

# Test Hugging Face service
python3 << 'EOF'
from huggingface_service import hf_predictor
result = hf_predictor.predict_disease('./test.jpg')
print(result)
EOF

# Test GitHub service
python3 << 'EOF'
from github_service import github_db
result = github_db.fetch_disease_data('acne')
print(result)
EOF
```

### Check File System
```bash
# Verify image was saved
ls -lah uploads/

# Check uploaded images
find uploads -name "*.jpg" -o -name "*.png"
```

---

## 📈 PERFORMANCE TESTING

### Test Response Time
```bash
# Measure complete analysis time
time curl -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=John Doe" \
  -F "age=25" \
  -F "gender=Male" \
  -F "mobile=+919876543210" \
  -F "email=test@example.com" \
  -F "image=@./test.jpg"

# Should complete in < 30 seconds
```

### Load Testing (with Apache Bench)
```bash
# Install Apache Bench if needed
# On Mac: brew install httpd
# On Ubuntu: sudo apt-get install apache2-utils

# Test health endpoint (100 requests, 10 concurrent)
ab -n 100 -c 10 http://localhost:5000/api/health

# Expected: All requests succeed, < 200ms average response time
```

---

## ✅ TESTING CHECKLIST

Before deployment, verify:

- [ ] Health check returns 200 OK
- [ ] Can get list of diseases
- [ ] Can get disease information
- [ ] Can upload valid image and complete analysis
- [ ] Invalid image is rejected with proper error
- [ ] Response includes all required fields
- [ ] Report HTML is present and contains patient data
- [ ] Email is scheduled (check `email_send_time`)
- [ ] All three integrations are mentioned in response
- [ ] Error messages are user-friendly
- [ ] Server doesn't crash on unexpected input
- [ ] Image files are cleaned up after processing (if applicable)
- [ ] Logs show detailed step information

---

## 🔐 SECURITY TESTING

### SQL Injection Test
```bash
curl -X POST http://localhost:5000/api/analysis/start \
  -F "full_name='; DROP TABLE users; --" \
  -F "age=25" \
  -F "email=test@example.com" \
  -F "image=@./test.jpg"

# Should be safe (SQLAlchemy ORM prevents this)
```

### File Upload Security Test
```bash
# Try uploading malicious file
echo "malicious content" > shell.php
curl -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=Hacker" \
  -F "image=@./shell.php"

# Should be rejected (only image files allowed)
```

---

## 📝 NOTES FOR DEVELOPERS

1. **Add more validation** - Validate patient data formats (email, phone)
2. **Database storage** - Implement database models to persist analysis records
3. **Authentication** - Implement JWT token validation for all endpoints
4. **Rate limiting** - Add Flask-Limiter to prevent API abuse
5. **Caching** - Cache GitHub disease data to reduce API calls
6. **Async tasks** - Use Celery for email sending and long operations
7. **Monitoring** - Add error tracking with Sentry
8. **Logging** - Store logs in database or external service

---

## 🎯 FINAL VERIFICATION

Run this comprehensive test:

```bash
#!/bin/bash

echo "=== MEDICUS LABS API TEST SUITE ==="
echo ""

echo "1. Testing Health Check..."
curl -s http://localhost:5000/api/health | jq '.status'

echo "2. Testing Disease List..."
curl -s http://localhost:5000/api/diseases | jq '.data.count'

echo "3. Testing Disease Info..."
curl -s http://localhost:5000/api/disease/acne | jq '.data.status'

echo "4. Testing Complete Analysis..."
curl -s -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=Test User" \
  -F "age=25" \
  -F "gender=Male" \
  -F "mobile=+919876543210" \
  -F "email=test@example.com" \
  -F "image=@./test.jpg" | jq '{
    status: .status,
    condition: .condition,
    confidence: .confidence,
    isic_validated: .isic_validated,
    email_scheduled: .email_scheduled
  }'

echo ""
echo "=== ALL TESTS COMPLETE ==="
```

Save as `test_api.sh` and run:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

**You're ready to test! 🚀**

