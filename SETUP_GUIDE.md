# Medicus Labs™ - Complete Setup and Deployment Guide

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Development Setup](#development-setup)
3. [Running Locally](#running-locally)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Deployment Guide](#deployment-guide)
7. [API Documentation](#api-documentation)
8. [Troubleshooting](#troubleshooting)

---

## 📁 Project Structure

```
medicus-labs/
├── frontend/                      # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── pages/                # Page components (Home, Analysis, Login, Register, etc.)
│   │   ├── sections/             # Landing page sections (10 premium sections)
│   │   ├── lib/                  # Utilities
│   │   │   ├── supabase.ts       # Supabase client & auth
│   │   │   └── api.ts            # API client for backend
│   │   ├── styles/               # Global CSS and Tailwind
│   │   ├── App.tsx               # Main app component
│   │   └── index.tsx             # Entry point
│   ├── package.json              # Frontend dependencies
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── postcss.config.js         # PostCSS config
│   ├── vite.config.ts            # Vite bundler config
│   ├── tsconfig.json             # TypeScript config
│   ├── .env.local                # Development environment variables
│   └── .env.example              # Environment template
│
├── backend/                       # FastAPI backend
│   ├── main.py                   # FastAPI application & endpoints
│   ├── models.py                 # SQLAlchemy database models
│   ├── report_generator.py       # PDF report generation
│   ├── requirements.txt          # Python dependencies
│   ├── build.sh                  # Render build script
│   ├── start.sh                  # Render start script
│   └── render.yaml               # Render deployment config
│
├── database/                      # Database configuration
│   └── schema.sql                # Database schema and tables
│
├── .env.example                  # Root environment template
├── docker-compose.yml            # Docker Compose configuration
├── Dockerfile                    # Docker image config
└── README.md                     # Project README

```

---

## 🚀 Development Setup

### Prerequisites

- **Node.js** 18.x or higher
- **Python** 3.9 or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **Supabase** account (for auth & database)

### Frontend Setup

```bash
# Navigate to frontend directory
cd /Users/malikarjunr/labs/frontend

# Install dependencies
npm install

# Create .env.local from template
cp .env.example .env.local

# Edit .env.local with your configuration
# VITE_API_URL=http://localhost:8000
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend Setup

```bash
# Navigate to backend directory
cd /Users/malikarjunr/labs/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env

# Edit .env with your configuration
```

---

## 🏃 Running Locally

### Frontend Development

```bash
cd /Users/malikarjunr/labs/frontend

# Start Vite development server
npm run dev

# Server runs on http://localhost:5173
```

### Backend Development

```bash
cd /Users/malikarjunr/labs/backend

# Make sure venv is activated
source venv/bin/activate

# Start FastAPI server
python main.py

# Server runs on http://localhost:8000
# API docs at http://localhost:8000/api/docs
```

### Full Stack Development (in separate terminals)

**Terminal 1 - Frontend:**
```bash
cd /Users/malikarjunr/labs/frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd /Users/malikarjunr/labs/backend
source venv/bin/activate
python main.py
```

**Terminal 3 - Database (if using PostgreSQL):**
```bash
# If using local PostgreSQL
# docker-compose up db
```

---

## 🔐 Environment Configuration

### Frontend Environment Variables (.env.local or .env.production)

```env
# API Configuration
VITE_API_URL=http://localhost:8000  # Development
# VITE_API_URL=https://api.yourdomain.com  # Production

# Supabase Configuration
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=false
```

### Backend Environment Variables (.env)

```env
# Environment
ENVIRONMENT=development
DEBUG=true
PORT=8000

# Database
DATABASE_URL=sqlite:///./medicus.db
# For production PostgreSQL:
# DATABASE_URL=postgresql://user:password@db:5432/medicusdb

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your_api_key
SUPABASE_SERVICE_KEY=your_service_role_key

# AI/ML
HUGGING_FACE_API_KEY=hf_xxx
HF_MODEL_NAME=microsoft/resnet-50

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:8000

# JWT
SECRET_KEY=your-super-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Email
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Storage
STORAGE_TYPE=local
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

---

## 💾 Database Setup

### Using SQLite (Development)

The backend uses SQLite by default for development. No setup needed - database file will be created automatically.

### Using PostgreSQL (Production)

1. **Create Supabase project:**
   - Go to https://supabase.com
   - Create a new project
   - Copy the database credentials

2. **Update environment variables:**
   ```env
   DATABASE_URL=postgresql://user:password@db.xxx.supabase.co:5432/postgres
   ```

3. **Initialize database schema:**
   ```bash
   cd /Users/malikarjunr/labs/backend
   
   # Using SQLAlchemy (automatic)
   # The schema will be created on first run
   
   # Or manually using psql:
   # psql DATABASE_URL < ../database/schema.sql
   ```

### Database Tables

- **users**: User accounts and authentication
- **analyses**: Analysis records with predictions
- **reports**: Generated PDF reports
- **analysis_history**: Historical analysis data
- **email_queue**: Email delivery queue

---

## 🌐 Deployment Guide

### Option 1: Deploy Frontend to Vercel

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Choose "Next.js" or "Vite" framework

3. **Configure Environment Variables:**
   ```
   VITE_API_URL = https://your-api.onrender.com
   VITE_SUPABASE_URL = your_supabase_url
   VITE_SUPABASE_ANON_KEY = your_anon_key
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Option 2: Deploy Backend to Render

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Create Render Service:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select branch: main

3. **Configure:**
   - Environment: Python 3.11
   - Build Command: `bash build.sh`
   - Start Command: `bash start.sh`

4. **Add Environment Variables:**
   ```
   ENVIRONMENT=production
   DEBUG=false
   DATABASE_URL=your_postgresql_url
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_api_key
   HUGGING_FACE_API_KEY=your_hf_key
   ALLOWED_ORIGINS=https://your-app.vercel.app
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Render will deploy automatically

### Option 3: Deploy with Docker

```bash
# Build Docker image
docker build -t medicus-labs:latest .

# Run with Docker Compose
docker-compose up -d

# Access the app
# Frontend: http://localhost
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/api/docs
```

---

## 📚 API Documentation

### Base URL
- Development: `http://localhost:8000`
- Production: `https://your-api.onrender.com`

### Health Check
```http
GET /api/health
```

### Analysis Endpoints

#### Start Analysis
```http
POST /api/analysis/start
Content-Type: multipart/form-data

Parameters:
- file: Image file (required)
- fullName: Patient name (required)
- age: Patient age
- gender: Gender (Male/Female/Other)
- mobile: Mobile number (required)
- email: Email address (required)

Response:
{
  "status": "success",
  "analysis_id": "analysis_xxx",
  "prediction": {
    "disease": "Disease name",
    "confidence": 0.85,
    "probability": {...}
  },
  "recommendations": [...]
}
```

#### Get Analysis Result
```http
GET /api/analysis/{analysis_id}
```

### Report Endpoints

#### Generate Report
```http
POST /api/reports/{analysis_id}/generate
```

#### Download Report
```http
GET /api/reports/{report_id}/download
```

#### Email Report
```http
POST /api/reports/{report_id}/email
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Validation Endpoints

#### Validate Image
```http
POST /api/validate/image
Content-Type: multipart/form-data

Parameters:
- file: Image file to validate
```

---

## 🔧 Troubleshooting

### Frontend Issues

**Q: "Cannot find module '@supabase/supabase-js'"**
```bash
npm install @supabase/supabase-js
```

**Q: Build fails with TypeScript errors**
```bash
# Clear build cache
rm -rf dist node_modules
npm install
npm run build
```

**Q: Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

### Backend Issues

**Q: ModuleNotFoundError: No module named 'fastapi'**
```bash
source venv/bin/activate
pip install -r requirements.txt
```

**Q: "Address already in use" for port 8000**
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
python main.py --port 8001
```

**Q: CORS errors when calling API**
- Ensure `ALLOWED_ORIGINS` environment variable includes your frontend URL
- For development: `http://localhost:5173,http://localhost:3000`
- For production: `https://your-app.vercel.app`

### Database Issues

**Q: "relation ... does not exist"**
```bash
# Reinitialize database
python main.py
```

**Q: PostgreSQL connection refused**
- Check Supabase connection string
- Verify credentials in .env
- Test with: `psql <DATABASE_URL>`

---

## 📞 Support & Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **React Documentation**: https://react.dev
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev

---

## 📄 License

Medicus Labs™ - AI-Powered Dermatology Analysis Platform

Built with ❤️ for Healthcare Innovation

**Version**: 2.0.0  
**Last Updated**: May 26, 2026
