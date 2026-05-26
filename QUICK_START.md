# 🚀 MEDICUS LABS™ - QUICK START GUIDE

**Build the complete AI-powered dermatology platform in 30 minutes!**

---

## ✅ PREREQUISITES

Before starting, ensure you have:
- Python 3.8+ installed
- Node.js 16+ installed
- Git installed
- API Keys ready:
  - Hugging Face: `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` ✓ (You provided)
  - Resend API Key (free signup at resend.com)
  - GitHub account (for disease database)

---

## 📦 STEP 1: SETUP BACKEND (10 minutes)

### 1.1 Create Python Virtual Environment
```bash
# Navigate to project directory
cd medicuslabs

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### 1.2 Install Dependencies
```bash
# Install all required packages
pip install -r requirements.txt
```

### 1.3 Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual API keys
# Important keys to fill:
# - HF_API_TOKEN=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 (already provided)
# - RESEND_API_KEY=re_... (get from resend.com)
# - DATABASE_URL (for production, or leave as sqlite for development)
# - SECRET_KEY (generate with: python -c "import secrets; print(secrets.token_hex(32))")
```

### 1.4 Setup Database (Development with SQLite)
```bash
# For development, SQLite works fine
# No additional setup needed - Flask will create database.db on first run

# For production PostgreSQL:
# 1. Install PostgreSQL
# 2. Create database: createdb medicuslabs
# 3. Update DATABASE_URL in .env
```

### 1.5 Test Backend
```bash
# Start Flask development server
python app.py

# You should see:
# ============================================================
# 🏥 Medicus Labs™ - Dermatology Analysis Platform
# Version: 2.0.0
# ============================================================
# Starting Flask server on port 5000
# ...

# Test health endpoint in another terminal:
curl http://localhost:5000/api/health

# Expected response:
# {"status": "healthy", "service": "Medicus Labs API", ...}
```

---

## 🎨 STEP 2: SETUP FRONTEND (10 minutes)

### 2.1 Create React App
```bash
# In a new terminal (keep backend running)
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

### 2.2 Install Frontend Dependencies
```bash
npm install -D tailwindcss postcss autoprefixer
npm install axios framer-motion html2canvas jspdf react-router-dom react-toastify

# Setup Tailwind
npx tailwindcss init -p
```

### 2.3 Create Frontend Environment File
```bash
# Create .env file for React
cat > .env << EOF
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Medicus Labs
EOF
```

### 2.4 Test Frontend
```bash
# Start development server
npm run dev

# Frontend will start on http://localhost:5173
# You should see Vite development message
```

---

## 📋 STEP 3: KEY FILES TO UNDERSTAND

### Backend Services (Already Created)

1. **isic_service.py** - ISIC validation
   - Validates image quality
   - Detects blur, lighting issues
   - Checks if image is actual skin

2. **huggingface_service.py** - AI prediction
   - Sends image to Hugging Face API
   - Gets condition + confidence
   - Returns structured results

3. **github_service.py** - Medical database
   - Fetches disease guidance from GitHub
   - Provides precautions, medicines, recommendations
   - Has fallback data if GitHub is unavailable

4. **report_generator.py** - Report creation
   - Generates professional HTML reports
   - Integrates patient data + medical guidance
   - Premium healthcare formatting

5. **email_service.py** - Email delivery
   - Sends professional emails via Resend API
   - Scheduled after 5 minutes
   - Beautiful email template

6. **app.py** - Main Flask application
   - All API endpoints
   - 7-step workflow orchestration
   - Error handling

---

## 🔗 STEP 4: API ENDPOINTS OVERVIEW

### Health Check
```bash
GET /api/health
# Check if API is running
```

### Analysis Workflow
```bash
POST /api/analysis/start
# Request:
{
  "patient": {
    "full_name": "John Doe",
    "age": 25,
    "gender": "Male",
    "mobile": "+919876543210",
    "email": "john@example.com"
  },
  "image": <binary file>
}

# Response:
{
  "status": "success",
  "analysis_id": "AN_20260525_120000",
  "condition": "Acne",
  "confidence": "87.5%",
  "report_html": "...",
  "email_scheduled": true,
  "email_send_time": "2026-05-25 12:05:00"
}
```

### Get Diseases
```bash
GET /api/diseases
# Get list of all available diseases
```

### Get Disease Info
```bash
GET /api/disease/acne
# Get detailed information about acne
```

---

## 🧪 STEP 5: TEST THE COMPLETE WORKFLOW

### 5.1 Test with Sample Image
```bash
# Use any JPG/PNG image of skin (or download a sample)
curl -X POST http://localhost:5000/api/analysis/start \
  -F "full_name=John Doe" \
  -F "age=25" \
  -F "gender=Male" \
  -F "mobile=+919876543210" \
  -F "email=test@example.com" \
  -F "image=@/path/to/skin/image.jpg"
```

### 5.2 Check Health
```bash
curl http://localhost:5000/api/health
```

### 5.3 Get Available Diseases
```bash
curl http://localhost:5000/api/diseases
```

---

## 🎯 STEP 6: INTEGRATION CHECKLIST

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5173`
- [ ] Image upload working
- [ ] ISIC validation working
- [ ] Hugging Face prediction working
- [ ] GitHub disease database accessible
- [ ] Report generation working
- [ ] Email scheduling working
- [ ] PDF download functionality
- [ ] All error handling in place

---

## 📱 STEP 7: BUILD FRONTEND COMPONENTS

Create the following React components:

### Pages to Build
1. **Home.tsx** - Landing page with features
2. **Login.tsx** - User authentication
3. **Register.tsx** - User signup
4. **Analysis.tsx** - Image upload & processing
5. **Report.tsx** - Display analysis results
6. **Dashboard.tsx** - User history & reports

### Components to Build
1. **Navbar.tsx** - Navigation
2. **ImageUploadZone.tsx** - Drag-drop upload
3. **LoadingAnimation.tsx** - Processing indicator
4. **ReportDisplay.tsx** - Result showcase
5. **PDFExport.tsx** - Download functionality

---

## 🚀 STEP 8: DEPLOYMENT

### Option A: Railway (Recommended - FREE)
```bash
# 1. Push code to GitHub
git add .
git commit -m "Deploy Medicus Labs"
git push origin main

# 2. Go to railway.app
# 3. Connect your GitHub repo
# 4. Add environment variables
# 5. Auto-deploy

# Access at: https://your-project.railway.app
```

### Option B: Local Docker
```bash
# Build Docker image
docker build -t medicuslabs .

# Run container
docker run -p 5000:5000 --env-file .env medicuslabs
```

### Option C: Heroku
```bash
# 1. Install Heroku CLI
brew install heroku

# 2. Create app
heroku create medicuslabs-app

# 3. Deploy
git push heroku main

# 4. Open app
heroku open
```

---

## 📊 EXPECTED WORKFLOW FLOW

```
User uploads image
         ↓
✓ STEP 1: ISIC validates image quality
         ↓
✓ STEP 2: GitHub loads disease guidance
         ↓
✓ STEP 3: Hugging Face predicts condition
         ↓
✓ STEP 4: Report generator creates HTML report
         ↓
✓ STEP 5: Frontend handles PDF download
         ↓
✓ STEP 6: Email scheduled (after 5 minutes)
         ↓
✓ STEP 7: User receives professional email
         ↓
Analysis complete!
```

---

## 🔑 IMPORTANT API KEYS SETUP

### 1. Hugging Face Token (Already Provided ✓)
```
HF_API_TOKEN=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
```

### 2. Resend Email API
```bash
# 1. Go to https://resend.com
# 2. Sign up (free)
# 3. Create API key
# 4. Add to .env:
RESEND_API_KEY=re_your_key_here
```

### 3. ISIC API (No key needed)
```bash
# ISIC Archive is free and doesn't require authentication
# Already configured in isic_service.py
```

---

## 🐛 COMMON ISSUES & FIXES

### Issue: `ModuleNotFoundError: No module named 'flask'`
**Fix:**
```bash
pip install -r requirements.txt
```

### Issue: `Port 5000 already in use`
**Fix:**
```bash
# Use different port
python app.py --port 5001
```

### Issue: Hugging Face API timeout
**Fix:**
```bash
# Model might be cold. Wait 30 seconds and retry.
# Or use a smaller model in HF_MODEL_NAME
```

### Issue: Email not sending
**Fix:**
```bash
# 1. Check RESEND_API_KEY in .env
# 2. Verify email address format
# 3. Check logs: tail -f medicuslabs.log
```

---

## 📚 FILE STRUCTURE

```
medicuslabs/
├── app.py                    # Main Flask app (API endpoints)
├── isic_service.py           # ISIC validation service
├── huggingface_service.py    # Hugging Face integration
├── github_service.py         # GitHub disease database
├── report_generator.py       # Report creation
├── email_service.py          # Email delivery service
├── requirements.txt          # Python dependencies
├── .env.example              # Environment template
├── .env                      # Your config (add to .gitignore)
├── Procfile                  # Railway/Heroku deployment
├── docker-compose.yml        # Docker setup
└── frontend/                 # React app (to be created)
    ├── src/
    │   ├── pages/           # React pages
    │   ├── components/      # React components
    │   ├── services/        # API services
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```

---

## ✨ NEXT STEPS

1. **Complete Frontend** - Build all React components
2. **Database Models** - Add SQLAlchemy models for data persistence
3. **Authentication** - Implement JWT token system
4. **Testing** - Write unit and integration tests
5. **Monitoring** - Setup error tracking (Sentry)
6. **Analytics** - Track user behavior
7. **Mobile App** - Build React Native version (future)

---

## 💡 TIPS & TRICKS

- **Fast development**: Keep backend and frontend running in separate terminals
- **Debug mode**: Add `print()` statements, they show in server logs
- **Test APIs**: Use Postman or curl for quick testing
- **Environment**: Create separate `.env.development` and `.env.production`
- **Performance**: Cache ISIC/GitHub responses to reduce API calls

---

## 📞 SUPPORT

If you encounter issues:
1. Check logs: `tail -f medicuslabs.log`
2. Verify API keys in `.env`
3. Test health endpoint: `curl http://localhost:5000/api/health`
4. Check GitHub issues for solutions
5. Review error messages carefully

---

## 🎉 YOU'RE READY!

You now have a fully functional backend for Medicus Labs™. 

**Next:** Build the React frontend using the components outline above, and your complete AI-powered dermatology platform will be ready!

**Questions?** Refer to `MEDICUS_LABS_COMPLETE_PLAN.md` for the full implementation guide.

---

**Happy Coding! 🚀**
