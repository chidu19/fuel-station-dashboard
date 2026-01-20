# 🚀 START HERE - Run Your Dashboard Now!

## For Windows Users (Easiest)

### One-Click Start:
1. Open File Explorer
2. Navigate to: `C:\Users\chidambar.hk\OneDrive - Mu Sigma Business Solutions Pvt. Ltd\Desktop\Bunk Data Analysis Web App`
3. **Double-click**: `start.bat`
4. Wait 10 seconds...
5. Dashboard opens at http://localhost:3000 ✅

---

## For Windows Users (Manual Alternative)

### Terminal 1 - Backend:
```powershell
cd "C:\Users\chidambar.hk\OneDrive - Mu Sigma Business Solutions Pvt. Ltd\Desktop\Bunk Data Analysis Web App\backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Terminal 2 - Frontend (Open New Terminal):
```powershell
cd "C:\Users\chidambar.hk\OneDrive - Mu Sigma Business Solutions Pvt. Ltd\Desktop\Bunk Data Analysis Web App\frontend"
npm install
npm start
```

---

## For Mac Users

Open Terminal:
```bash
cd "/Users/chidambar.hk/OneDrive - Mu Sigma Business Solutions Pvt. Ltd/Desktop/Bunk Data Analysis Web App"
chmod +x start.sh
./start.sh
```

---

## For Linux Users

Open Terminal:
```bash
cd /path/to/"Bunk Data Analysis Web App"
chmod +x start.sh
./start.sh
```

---

## First Time Setup Checklist

- [ ] Python 3.8+ installed (check: `python --version`)
- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Ran start.bat or start.sh
- [ ] Dashboard opened at http://localhost:3000
- [ ] Backend running at http://localhost:5000
- [ ] Downloaded sample_data.csv
- [ ] Uploaded sample_data.csv to dashboard
- [ ] See data in dashboard ✅

---

## What You'll See

### Loading (First 5 seconds)
```
⏳ Loading dashboard...
```

### Dashboard (After loading)
```
⛽ Fuel Station Analytics Dashboard

KPI Cards:
- 💰 Total Sales: ₹1,234,567
- ⛽ Total Liters: 5,000 L
- 🚗 Petrol Sales: ₹750,000
- 🚙 Diesel Sales: ₹484,567
- 📊 Avg Transaction: ₹1,850

Charts:
- Fuel Distribution (Pie Chart)
- Payment Methods (Bar Chart)
- Daily Sales Trend (Line Chart)
- Hourly Pattern (Line Chart)
- Machine Activity (Bar Chart)
```

---

## Upload Data Instructions

1. Click "**Upload Data**" tab
2. Click "**📥 Download Template**" (to see required format)
3. Click "**📁 Choose File (CSV/Excel)**"
4. Select your CSV or Excel file
5. Dashboard updates automatically! ✅

---

## Troubleshooting

### Error: Python not found
```bash
# Install from: https://www.python.org
# During installation, check "Add Python to PATH"
```

### Error: Node not found
```bash
# Install from: https://nodejs.org
```

### Error: Port 5000 already in use
```bash
# Edit backend/app.py line 240:
# Change: app.run(port=5001)  # instead of 5000
```

### Error: Connection refused
```bash
# Make sure backend started first in Terminal 1
# Check: http://localhost:5000/api/health (should say "healthy")
```

### Dashboard shows no data
```bash
# 1. Upload sample_data.csv first
# 2. Press F5 to refresh
# 3. Check browser console (F12) for errors
```

---

## File Paths (if needed)

- **Project**: C:\Users\chidambar.hk\OneDrive - Mu Sigma Business Solutions Pvt. Ltd\Desktop\Bunk Data Analysis Web App
- **Backend**: ...Web App\backend
- **Frontend**: ...Web App\frontend
- **Database**: ...Web App\backend\fuel_station.db
- **Sample Data**: ...Web App\sample_data.csv

---

## All URLs

- **Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Download Template**: http://localhost:5000/api/download-template

---

## Documentation Files

1. **INSTALLATION_GUIDE.md** ← Read this for detailed setup
2. **README.md** ← Full technical documentation
3. **PROJECT_SUMMARY.md** ← What was created
4. **QUICK_START.md** ← 2-minute overview

---

## Support

If something doesn't work:
1. Check all terminals for error messages
2. Verify Python and Node.js are installed
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart both backend and frontend terminals
5. Check file permissions

---

**Ready? Start the dashboard now! 🚀**
