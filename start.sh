#!/bin/bash

# Fuel Station Dashboard - macOS/Linux Start Script

echo "======================================="
echo "Fuel Station Analytics Dashboard"
echo "======================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "Starting Backend Server..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -q -r requirements.txt
python3 app.py &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo ""
echo "Starting Frontend Application..."
cd ../frontend
npm install > /dev/null 2>&1
npm start &
FRONTEND_PID=$!

echo ""
echo "======================================="
echo "Dashboard will open at http://localhost:3000"
echo "Backend API at http://localhost:5000"
echo ""
echo "Press CTRL+C to stop"
echo "======================================="

# Wait for both processes
wait
