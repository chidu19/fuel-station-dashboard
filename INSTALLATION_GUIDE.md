# 🚀 Complete Fuel Station Dashboard - Installation & Deployment Guide

## ✅ What's Included

Your complete fuel station analytics dashboard with:
- **Backend**: Flask API with SQLite database
- **Frontend**: React dashboard with interactive charts
- **Database**: SQLite (no setup required)
- **Colors**: Green & Blue theme (as requested)
- **Features**: All analytics for decision-making
- **Data Format**: CSV/Excel upload with automatic merging

---

## 🎯 Quick Start (Windows - Recommended for First Run)

### Option 1: One-Click Start (Easiest)
1. Double-click `start.bat` in the project root
2. Wait 5-10 seconds for terminals to appear
3. Dashboard opens automatically at `http://localhost:3000`

### Option 2: Manual Start (if Option 1 doesn't work)

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend (open new terminal):**
```bash
cd frontend
npm install
npm start
```
✅ Frontend opens at http://localhost:3000

---

## 🎯 Quick Start (macOS/Linux)

**Terminal 1:**
```bash
chmod +x start.sh
./start.sh
```

Or manually:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

**Terminal 2:**
```bash
cd frontend
npm install
npm start
```

---

## 📊 First Use - Load Sample Data

1. **Dashboard opens** → You'll see "No data available" message
2. Go to **Upload Data** tab
3. Click **Download Template** (optional - to see format)
4. Upload the included **sample_data.csv** file
5. Dashboard automatically updates with data! 🎉

---

## 🔄 Uploading Your Actual Data

1. Prepare your fuel station data in CSV or Excel format
2. Ensure it has all required columns:
   - transaction_id, date, time, fuel, machine_no
   - nozzle_no, liters, unit_price, amount, payment_type
3. Go to **Upload Data** tab
4. Select your file
5. Click **Choose File (CSV/Excel)**
6. ✅ Data merges automatically with existing data in database

### Multi-day Upload Example:
- **Day 1**: Upload Monday's data → Dashboard shows Monday analytics
- **Day 2**: Upload Tuesday's data → Dashboard combines Monday + Tuesday data
- **Day 3**: Upload Wednesday's data → Dashboard combines all three days
- System automatically prevents duplicate entries

---

## 📈 Dashboard Analytics Explained

### KPI Cards (Top Row)
- **Total Sales (₹)**: Complete revenue from all transactions
- **Total Liters (L)**: Complete fuel volume dispensed
- **Petrol Sales (₹)**: Revenue from petrol only
- **Diesel Sales (₹)**: Revenue from diesel only
- **Avg Transaction**: Average value per transaction

### Charts (Below KPIs)
1. **Fuel Distribution** - Petrol vs Diesel comparison (pie chart)
2. **Payment Methods** - How customers pay (cash/card/UPI)
3. **Daily Sales Trend** - Sales pattern over days (bar chart)
4. **Hourly Sales Pattern** - Peak selling hours (line chart)
5. **Machine Activity** - Performance per fuel pump

---

## 🔧 System Requirements

### Minimum Requirements
- **Windows/Mac/Linux** PC
- **Python 3.8+** (download from python.org)
- **Node.js 14+** (download from nodejs.org)
- **2GB RAM**
- **500MB Disk Space**

### Check if Installed
```bash
python --version
node --version
npm --version
```

---

## 🗂️ Project Structure

```
Bunk Data Analysis Web App/
├── backend/                    # Flask API
│   ├── app.py                 # Main application
│   ├── requirements.txt       # Python dependencies
│   ├── fuel_station.db        # SQLite database (auto-created)
│   └── Dockerfile
│
├── frontend/                   # React Dashboard
│   ├── src/
│   │   ├── components/        # All dashboard charts & upload
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
│
├── sample_data.csv            # Sample data for testing
├── README.md                  # Full documentation
├── QUICK_START.md            # This file
├── start.bat                 # Windows starter script
├── start.sh                  # Mac/Linux starter script
└── docker-compose.yml        # Docker deployment option
```

---

## 📝 Data Format Example

Your CSV/Excel must have these columns (exact names):

```
transaction_id | date       | time     | fuel   | machine_no | nozzle_no | liters | unit_price | amount | payment_type
TXN001        | 2024-01-20 | 08:30:00 | Petrol | 1          | 1         | 50.5   | 95.5       | 4823.75| Cash
TXN002        | 2024-01-20 | 08:45:00 | Diesel | 1          | 2         | 40.0   | 87.3       | 3492.00| Card
```

---

## 🐳 Docker Deployment (Optional - Advanced)

If you have Docker installed:

```bash
docker-compose up -d
```

Then open http://localhost:3000

---

## 🎨 Color Scheme

As requested:
- **Blue (#3498db)** - Petrol, Sales metrics, Primary charts
- **Green (#27ae60)** - Diesel, Liters, Secondary metrics
- **Dark Green (#0f4c3a)** - Background

---

## 💾 Database & Data Storage

- **Type**: SQLite (serverless, file-based)
- **Location**: `backend/fuel_station.db`
- **Size**: Grows with data (handles millions of records)
- **Backup**: Copy `fuel_station.db` file to backup

### Why SQLite?
✅ Free (no license cost)
✅ No installation needed
✅ Portable (single file)
✅ Scalable to large datasets
✅ Built-in duplicate detection

---

## 🔗 API Endpoints (for developers)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/health | Check API status |
| POST | /api/upload | Upload CSV/Excel file |
| GET | /api/dashboard-stats | Get all dashboard data |
| GET | /api/transactions | Query transactions |
| GET | /api/download-template | Get CSV template |
| GET | /api/stats-by-date | Date-range statistics |

---

## 🆘 Troubleshooting

### Error: "Python is not installed"
- Download Python from https://www.python.org
- Add to PATH during installation
- Restart terminal and try again

### Error: "npm not found"
- Download Node.js from https://nodejs.org
- This automatically installs npm
- Restart terminal and try again

### Error: "Port 5000 already in use"
- Another app is using port 5000
- Stop the other app OR
- Change port in `backend/app.py` line: `app.run(port=5001)`

### Error: "Connection refused" (frontend can't reach backend)
- Ensure backend is running first
- Check firewall settings
- Try http://localhost:5000/api/health in browser

### Error: "No data showing" after upload
- Verify upload was successful (green checkmark)
- Try uploading sample_data.csv first
- Refresh dashboard (F5)
- Check browser console (F12) for errors

---

## 📊 Usage Workflow

1. **Setup**: Run start.bat/start.sh
2. **Wait**: 5-10 seconds for apps to load
3. **Upload**: Go to "Upload Data" tab
4. **Select**: Choose your CSV/Excel file
5. **Analyze**: Dashboard auto-updates with insights
6. **Monitor**: Real-time metrics refresh every 30 seconds
7. **Repeat**: Upload next day's data → Combined analytics

---

## 🎯 Decision Making Examples

### What You Can Discover:

**Peak Hours** → Hourly Trend chart
- *Insight*: Busy hours from 8am-10am
- *Decision*: Schedule more staff during peak hours

**Fuel Preference** → Fuel Distribution chart
- *Insight*: 60% petrol, 40% diesel
- *Decision*: Maintain inventory accordingly

**Machine Performance** → Machine Activity chart
- *Insight*: Machine 1 has 50% more revenue
- *Decision*: Prioritize maintenance for high-performing machines

**Payment Methods** → Payment Distribution chart
- *Insight*: 70% card payments
- *Decision*: Ensure card terminals are always working

**Daily Trends** → Daily Sales Trend chart
- *Insight*: Weekends have 30% higher sales
- *Decision*: Plan promotional activities accordingly

---

## 🚀 Next Steps

1. ✅ Run the application (start.bat or manual setup)
2. ✅ Upload sample_data.csv to see dashboard working
3. ✅ Upload your actual transaction data
4. ✅ Analyze trends and make business decisions
5. ✅ Set up daily/weekly uploads for ongoing monitoring

---

## 📞 Support & Maintenance

- **Database Backup**: Copy `backend/fuel_station.db` regularly
- **Logs**: Check terminal output for errors
- **Clear Data**: Delete `backend/fuel_station.db` and restart to begin fresh
- **Update Data**: Just upload new files - automatic merging!

---

## 🎓 For Production Deployment

To deploy to a server:
1. Use Docker (docker-compose up)
2. Or use cloud platforms (Heroku, AWS, DigitalOcean)
3. Database backups to cloud storage
4. Set up SSL certificates for HTTPS

---

**You're all set! Start with `start.bat` and enjoy your dashboard! 🎉**
