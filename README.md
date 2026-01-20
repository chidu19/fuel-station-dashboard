# Fuel Station Analytics Dashboard

A comprehensive full-stack web application for real-time fuel station transaction analysis and reporting.

## 🎯 Features

- **Real-time Dashboard**: Monitor fuel sales, revenue, and key metrics
- **Multi-channel Data Upload**: Support for CSV and Excel file uploads
- **Automatic Data Merging**: New uploads automatically combine with existing data
- **Duplicate Detection**: Automatic detection and skipping of duplicate transactions
- **Advanced Analytics**:
  - Total Sales and Revenue
  - Fuel Type Analysis (Petrol vs Diesel)
  - Daily and Hourly Sales Trends
  - Machine Performance Metrics
  - Payment Method Distribution
- **Green & Blue Theme**: Professional color scheme optimized for data visualization
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **SQLite Database**: Free, scalable database solution suitable for large datasets

## 🏗️ Project Structure

```
Bunk Data Analysis Web App/
├── backend/
│   ├── app.py                 # Flask backend application
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment configuration
│   └── fuel_station.db        # SQLite database (auto-created)
├── frontend/
│   ├── public/
│   │   └── index.html        # Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js   # Main dashboard component
│   │   │   ├── FileUpload.js  # File upload component
│   │   │   ├── StatCard.js    # KPI stat cards
│   │   │   ├── FuelDistributionChart.js
│   │   │   ├── DailyTrendChart.js
│   │   │   ├── HourlyTrendChart.js
│   │   │   ├── MachineActivityChart.js
│   │   │   ├── PaymentMethodChart.js
│   │   │   └── *.css          # Component styles
│   │   ├── App.js             # Main app component
│   │   ├── App.css            # App styles
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   └── package.json           # JavaScript dependencies
└── sample_data.csv            # Sample transaction data

```

## 📋 Data Format

The application expects transaction data in the following CSV/Excel format:

| Column | Type | Description |
|--------|------|-------------|
| transaction_id | String | Unique identifier for the transaction |
| date | Date (YYYY-MM-DD) | Transaction date |
| time | Time (HH:MM:SS) | Transaction time |
| fuel | String | Type of fuel (Petrol/Diesel) |
| machine_no | Integer | Fuel pump machine number |
| nozzle_no | Integer | Nozzle number |
| liters | Float | Liters of fuel dispensed |
| unit_price | Float | Price per liter |
| amount | Float | Total transaction amount |
| payment_type | String | Payment method (Cash/Card/UPI, etc.) |

## 🚀 Getting Started

### Prerequisites

- Python 3.8+ (for backend)
- Node.js 14+ (for frontend)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the backend server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📊 Dashboard Metrics

### Key Performance Indicators (KPIs)

- **Total Sales**: Cumulative revenue from all transactions
- **Total Liters**: Total fuel dispensed (liters)
- **Petrol Sales**: Revenue from petrol transactions
- **Diesel Sales**: Revenue from diesel transactions
- **Average Transaction Value**: Mean transaction amount

### Analytics Visualizations

1. **Fuel Distribution Pie Chart**: Shows petrol vs diesel sales percentage
2. **Daily Sales Trend**: Line/bar chart showing sales pattern over days
3. **Hourly Sales Pattern**: Identifies peak selling hours
4. **Machine Activity**: Performance metrics for each fuel pump
5. **Payment Methods**: Distribution of different payment types
6. **Transaction Count**: Number of transactions per time period

## 💾 Database

The application uses SQLite, a serverless, file-based database that:
- Requires no installation or configuration
- Automatically handles schema creation
- Scales well with large datasets
- Stores data in `fuel_station.db` file

### Database Features

- **Automatic Backup**: Database file can be easily backed up
- **Duplicate Prevention**: Unique constraint on transaction_id
- **Data Integrity**: Foreign key support and data validation
- **Scalability**: Supports millions of records efficiently

## 📤 Data Upload Workflow

1. Click "Upload Data" tab
2. Download the template (optional, to understand format)
3. Select a CSV or Excel file with transaction data
4. Click "Choose File" to upload
5. The system will:
   - Validate the file format
   - Check for required columns
   - Detect and skip duplicate transactions
   - Combine new data with existing records
   - Update the dashboard automatically

## 🎨 Design Features

- **Color Scheme**: Green (#27ae60) and Blue (#3498db)
- **Dark Theme**: Easy on the eyes, professional appearance
- **Responsive Layout**: Adapts to all screen sizes
- **Interactive Charts**: Hover for detailed information
- **Real-time Updates**: Dashboard refreshes every 30 seconds or on-demand

## 🔧 API Endpoints

### Dashboard Statistics
```
GET /api/dashboard-stats
```
Returns aggregated statistics for the dashboard

### File Upload
```
POST /api/upload
```
Upload CSV/Excel file with transaction data

### Transaction Queries
```
GET /api/transactions?fuel=Petrol&date_from=2024-01-20&date_to=2024-01-21
```
Query transactions with optional filters

### Template Download
```
GET /api/download-template
```
Download CSV template with sample data

### Date-based Statistics
```
GET /api/stats-by-date?date_from=2024-01-20&date_to=2024-01-21
```
Get statistics for a specific date range

## 📈 Usage Scenarios

### Daily Operations
1. Start the dashboard to monitor real-time sales
2. Download daily transaction report from POS/fuel pump system
3. Upload the day's data to the dashboard
4. Review KPIs and trends

### Weekly/Monthly Analysis
1. Filter data by date range
2. Analyze fuel-wise sales trends
3. Identify peak hours and busy periods
4. Track machine performance
5. Monitor payment method preferences

### Decision Making
- **Pricing Decisions**: Based on demand patterns
- **Inventory Planning**: Based on daily consumption trends
- **Staff Scheduling**: Based on hourly transaction patterns
- **Machine Maintenance**: Based on machine activity metrics

## 🔐 Data Privacy

- All data is stored locally in SQLite database
- No data is sent to external servers
- Database file can be encrypted or moved as needed
- Regular backups recommended

## 🛠️ Troubleshooting

### Backend fails to start
- Ensure Python 3.8+ is installed
- Check if port 5000 is available
- Verify all dependencies are installed: `pip install -r requirements.txt`

### Frontend fails to connect
- Ensure backend is running on port 5000
- Check firewall settings
- Clear browser cache and refresh

### Upload fails
- Verify file format is CSV or Excel
- Check if all required columns are present
- Ensure column names match exactly

### No data in dashboard
- Upload transaction data first
- Check if upload was successful
- Verify database file was created

## 📞 Support

For issues or feature requests, check:
1. Error messages in browser console
2. Backend server logs
3. Database file in `backend/fuel_station.db`

## 📝 License

This project is provided as-is for fuel station analytics purposes.

## 🎓 Future Enhancements

- User authentication
- Advanced reporting and export
- Predictive analytics
- Multi-station support
- Real-time data sync
- Mobile app
- SMS alerts for anomalies
