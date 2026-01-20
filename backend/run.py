#!/usr/bin/env python
import sys
import traceback

try:
    from app import app, db
    print("✓ App imported successfully")
    
    # Create tables
    with app.app_context():
        db.create_all()
        print("✓ Database initialized")
    
    print("✓ Starting server on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
    
except Exception as e:
    print(f"✗ Error: {e}")
    traceback.print_exc()
    sys.exit(1)
