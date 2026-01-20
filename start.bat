@echo off
REM Fuel Station Dashboard - Windows Start Script

echo ===============================================
echo Fuel Station Analytics Dashboard
echo ===============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Starting Backend Server...
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -q -r requirements.txt && python wsgi.py"

echo Waiting for backend to start...
timeout /t 5

echo.
echo Starting Frontend Application...
start cmd /k "cd frontend && npm install && npm start"

echo.
echo ===============================================
echo Dashboard will open at http://localhost:3001
echo Backend API at http://localhost:5000
echo.
echo Press CTRL+C in the terminal windows to stop
echo ===============================================
pause
