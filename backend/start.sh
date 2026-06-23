#!/bin/bash

set -euo pipefail

# Change to the backend directory so that all paths are relative to it
cd backend

# Start the FastAPI backend in the current deployment environment.
exec uvicorn main:app \
    --host 0.0.0.0 \
    --port "${PORT:-8000}" \
    --proxy-headers \
    --forwarded-allow-ips='*' \
    --log-level info
