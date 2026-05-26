#!/usr/bin/env python3
"""Simple HTTP server for serving React SPA with proper routing"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 8080
DIST_DIR = Path(__file__).parent

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Try to serve the file directly first
        path = DIST_DIR / self.path.lstrip('/')
        
        if path.is_file():
            # It's a file, serve it
            return super().do_GET()
        
        # It's not a file, so serve index.html for client-side routing
        self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        # Add CORS headers for API calls
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIST_DIR)
    
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        print(f"✓ React Frontend Server running on http://localhost:{PORT}")
        print(f"  Serving from: {DIST_DIR}")
        print(f"  Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✓ Server stopped")
