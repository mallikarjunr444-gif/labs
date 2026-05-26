#!/bin/bash

# Build script for Render deployment
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Creating uploads directory..."
mkdir -p uploads
mkdir -p reports

echo "✅ Build completed successfully!"
