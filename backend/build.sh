#!/bin/bash

# Build script for Render deployment
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Building React frontend..."
if [ -d "frontend" ]; then
  cd frontend
  npm install
  npm run build
  cd ..
fi

echo "Creating uploads directory..."
mkdir -p uploads
mkdir -p reports
mkdir -p backend/reports

echo "✅ Build completed successfully!"
