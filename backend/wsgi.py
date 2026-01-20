"""
WSGI entry point for Gunicorn
Production: gunicorn wsgi:app
Development: python wsgi.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app import app, db

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    print("\n" + "="*60)
    print("⛽ Fuel Station Dashboard Backend")
    print("="*60)
    print("Starting server...")
    print("Access at: http://localhost:5000")
    print("API: http://localhost:5000/api/health")
    print("="*60 + "\n")
    
    try:
        app.run(
            host='127.0.0.1',
            port=5000,
            debug=False,
            use_reloader=False,
            threaded=True,
            ssl_context=None
        )
    except KeyboardInterrupt:
        print("\n\nServer stopped.")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
