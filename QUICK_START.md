# Fuel Station Dashboard - Quick Start Guide

## Installation & Startup (Windows)

### Step 1: Install Backend Dependencies
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Backend will run on http://localhost:5000

### Step 2: Install Frontend Dependencies (in another terminal)
```bash
cd frontend
npm install
npm start
```
Frontend will open at http://localhost:3000

### Step 3: Upload Sample Data
1. Go to "Upload Data" tab
2. Download template or use sample_data.csv
3. Upload to see dashboard populate with data

## Features Overview

✅ **Total Sales** - Complete revenue tracking
✅ **Total Liters** - Fuel volume metrics
✅ **Petrol vs Diesel** - Fuel-type analysis
✅ **Hourly Patterns** - Peak hour identification
✅ **Machine Performance** - Individual pump metrics
✅ **Payment Methods** - Transaction method tracking
✅ **Daily Trends** - Sales pattern analysis

## Required Data Columns (for CSV upload)

- transaction_id
- date (YYYY-MM-DD)
- time (HH:MM:SS)
- fuel (Petrol/Diesel)
- machine_no
- nozzle_no
- liters
- unit_price
- amount
- payment_type

## Color Scheme

- **Blue (#3498db)**: Petrol, Sales, Primary metrics
- **Green (#27ae60)**: Diesel, Liters, Secondary metrics
- **Dark Green (#0f4c3a)**: Background

## Keyboard Shortcuts

- Tab switch between Dashboard and Upload Data
- Refresh button to update data manually

---
For detailed documentation, see README.md
