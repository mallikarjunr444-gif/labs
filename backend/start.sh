#!/bin/bash

set -euo pipefail

# Start the FastAPI backend in the current deployment environment.
exec uvicorn backend.main:app \
    --host 0.0.0.0 \
    --port "${PORT:-8000}" \
    --proxy-headers \
    --forwarded-allow-ips='*' \
    --log-level info
