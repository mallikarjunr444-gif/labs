"""
Medicus Labs - FastAPI Backend
AI-Powered Dermatology Analysis Platform
"""

import os
import logging
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from datetime import datetime
import aiofiles
from pathlib import Path

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create upload directory
UPLOAD_DIR = Path("./uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# ============================================================================
# LIFESPAN MANAGER
# ============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown logic"""
    logger.info("🚀 Starting Medicus Labs API...")
    yield
    logger.info("🛑 Shutting down Medicus Labs API...")


# ============================================================================
# INITIALIZE FASTAPI APP
# ============================================================================

app = FastAPI(
    title="Medicus Labs API",
    description="AI-Powered Dermatology Analysis Platform",
    version="2.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

# Serve built frontend (if available) — assets + SPA fallback
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if FRONTEND_DIST.exists():
    assets_dir = FRONTEND_DIST / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")


# ============================================================================
# CORS MIDDLEWARE
# ============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# HEALTH CHECK ENDPOINT
# ============================================================================

@app.get("/api/health")
async def health_check():
    """System health check endpoint"""
    return {
        "status": "healthy",
        "service": "Medicus Labs API",
        "version": "2.0.0",
        "timestamp": datetime.now().isoformat(),
        "environment": os.getenv("ENVIRONMENT", "development"),
    }


# ============================================================================
# ANALYSIS ENDPOINTS
# ============================================================================

@app.post("/api/analysis/start")
async def start_analysis(
    file: UploadFile = File(...),
    fullName: str = Form(...),
    age: str = Form(...),
    gender: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(...),
):
    """
    Start dermatology analysis with image upload and patient information
    """
    try:
        logger.info(f"📸 Starting analysis for patient: {fullName}")

        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file uploaded")

        if not file.content_type or "image" not in file.content_type:
            raise HTTPException(status_code=400, detail="File must be an image")

        # Save uploaded file
        file_extension = Path(file.filename).suffix
        file_path = UPLOAD_DIR / f"{datetime.now().timestamp()}{file_extension}"

        async with aiofiles.open(file_path, 'wb') as f:
            content = await file.read()
            await f.write(content)

        logger.info(f"✅ File saved: {file_path}")

        # TODO: Integrate with HuggingFace API for predictions
        # prediction = await hf_predictor.predict(file_path)

        analysis_result = {
            "status": "success",
            "analysis_id": f"analysis_{datetime.now().timestamp()}",
            "patient": {
                "name": fullName,
                "age": age,
                "gender": gender,
                "mobile": mobile,
                "email": email,
            },
            "image_path": str(file_path),
            "prediction": {
                "disease": "Melanoma Risk Assessment",
                "confidence": 0.85,
                "probability": {
                    "benign": 0.12,
                    "suspicious": 0.88,
                },
            },
            "recommendations": [
                "Consult with a dermatologist immediately",
                "Avoid sun exposure",
                "Monitor for changes",
            ],
            "timestamp": datetime.now().isoformat(),
        }

        logger.info(f"✅ Analysis complete for {fullName}")
        return analysis_result

    except Exception as e:
        logger.error(f"❌ Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.get("/api/analysis/{analysis_id}")
async def get_analysis_result(analysis_id: str):
    """Get analysis result by ID"""
    try:
        # TODO: Fetch from database
        return {
            "analysis_id": analysis_id,
            "status": "completed",
            "result": {
                "disease": "Assessment Result",
                "confidence": 0.85,
            }
        }
    except Exception as e:
        logger.error(f"❌ Error fetching analysis: {str(e)}")
        raise HTTPException(status_code=404, detail="Analysis not found")


# ============================================================================
# REPORT ENDPOINTS
# ============================================================================

@app.post("/api/reports/{analysis_id}/generate")
async def generate_report(analysis_id: str):
    """Generate PDF report for analysis"""
    try:
        logger.info(f"📄 Generating report for analysis: {analysis_id}")

        # TODO: Generate PDF using report_generator
        # pdf_path = await report_generator.generate(analysis_id)

        return {
            "status": "success",
            "report_id": f"report_{datetime.now().timestamp()}",
            "analysis_id": analysis_id,
            "message": "Report generated successfully",
        }

    except Exception as e:
        logger.error(f"❌ Report generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Report generation failed")


@app.get("/api/reports/{report_id}/download")
async def download_report(report_id: str):
    """Download PDF report"""
    try:
        # TODO: Retrieve PDF from storage
        logger.info(f"📥 Downloading report: {report_id}")

        # Placeholder for actual PDF download
        return {
            "status": "success",
            "report_id": report_id,
        }

    except Exception as e:
        logger.error(f"❌ Download failed: {str(e)}")
        raise HTTPException(status_code=404, detail="Report not found")


@app.post("/api/reports/{report_id}/email")
async def email_report(report_id: str, email: str):
    """Email report to user"""
    try:
        logger.info(f"📧 Sending report {report_id} to {email}")

        # TODO: Integrate with email_service
        # await email_service.send_report(report_id, email)

        return {
            "status": "success",
            "message": f"Report sent to {email}",
        }

    except Exception as e:
        logger.error(f"❌ Email failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# ============================================================================
# HISTORY ENDPOINTS
# ============================================================================

@app.get("/api/history")
async def get_analysis_history(limit: int = 10):
    """Get user's analysis history"""
    try:
        logger.info(f"📋 Fetching analysis history (limit: {limit})")

        # TODO: Fetch from database
        return {
            "status": "success",
            "analyses": [],
            "total": 0,
        }

    except Exception as e:
        logger.error(f"❌ Error fetching history: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch history")


@app.delete("/api/history/{history_id}")
async def delete_history_entry(history_id: str):
    """Delete history entry"""
    try:
        logger.info(f"🗑️ Deleting history entry: {history_id}")

        # TODO: Delete from database
        return {
            "status": "success",
            "message": "History entry deleted",
        }

    except Exception as e:
        logger.error(f"❌ Delete failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete entry")


# ============================================================================
# VALIDATION ENDPOINTS
# ============================================================================

@app.post("/api/validate/image")
async def validate_image(file: UploadFile = File(...)):
    """Validate uploaded image"""
    try:
        if not file.content_type or "image" not in file.content_type:
            return {
                "valid": False,
                "message": "File must be an image",
            }

        # Read file
        content = await file.read()
        size_mb = len(content) / (1024 * 1024)

        if size_mb > 10:
            return {
                "valid": False,
                "message": "File size must be less than 10MB",
            }

        logger.info(f"✅ Image validated: {file.filename}")

        return {
            "valid": True,
            "message": "Image is valid",
            "file_name": file.filename,
            "file_size_mb": round(size_mb, 2),
            "content_type": file.content_type,
        }

    except Exception as e:
        logger.error(f"❌ Validation failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Image validation failed")


# ============================================================================
# ROOT ENDPOINT
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint — serve SPA index if built, else JSON"""
    try:
        index_file = FRONTEND_DIST / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file), media_type="text/html")
    except Exception:
        pass

    return {
        "message": "Welcome to Medicus Labs API",
        "docs": "/api/docs",
        "version": "2.0.0",
    }


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Handle HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "message": exc.detail,
            "timestamp": datetime.now().isoformat(),
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handle general exceptions"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal server error",
            "timestamp": datetime.now().isoformat(),
        },
    )


# SPA fallback for non-API routes: return index.html so client-side routing works
@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    # Let API routes be handled by existing endpoints
    if full_path.startswith("api"):
        raise HTTPException(status_code=404)

    index_file = FRONTEND_DIST / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file), media_type="text/html")

    raise HTTPException(status_code=404, detail="Not found")


# ============================================================================
# RUN SERVER
# ============================================================================

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "false").lower() == "true"

    logger.info(f"🚀 Starting server on port {port}...")

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=debug,
        log_level="info",
    )
