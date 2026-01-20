import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from './StatCard';
import HourlyTrendChart from './HourlyTrendChart';
import PaymentMethodChart from './PaymentMethodChart';
import PaymentMixChart from './PaymentMixChart';
import MachineActivityChart from './MachineActivityChart';
import FuelDistributionChart from './FuelDistributionChart';
import './DailySalesAnalysis.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DailySalesAnalysis = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const initializeDates = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/dashboard-stats`);
        if (response.data.daily_trend) {
          const dates = Object.keys(response.data.daily_trend).sort().reverse();
          setAvailableDates(dates);
          
          if (dates.length > 0) {
            const dateToUse = dates[0];
            setSelectedDate(dateToUse);
            await fetchDailyData(dateToUse);
          }
        }
      } catch (error) {
        console.error('Error initializing dates:', error);
        setLoading(false);
      }
    };
    
    initializeDates();
  }, []);

  const fetchDailyData = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/dashboard-stats`, {
        params: {
          start_date: date,
          end_date: date,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching daily data:', error);
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchDailyData(date);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="daily-analysis loading">
        <div className="loader"></div>
        <p>Loading daily analysis...</p>
      </div>
    );
  }

  if (!data || data.total_transactions === 0) {
    return (
      <div className="daily-analysis">
        <div className="date-selector-container">
          <div className="date-selector">
            <label htmlFor="date-picker">Select Date:</label>
            <input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        <div className="daily-analysis empty">
          <p>No data available for {formatDate(selectedDate)}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-analysis">
      {/* Date Selector */}
      <div className="date-selector-container">
        <div className="date-selector">
          <label htmlFor="date-picker">Select Date:</label>
          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          <p className="date-display">{formatDate(selectedDate)}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="date-navigation">
          <button 
            onClick={() => {
              const currentIndex = availableDates.indexOf(selectedDate);
              if (currentIndex < availableDates.length - 1) {
                handleDateChange(availableDates[currentIndex + 1]);
              }
            }}
            disabled={availableDates.indexOf(selectedDate) >= availableDates.length - 1}
            className="nav-btn-prev"
          >
            ◀ Previous Day
          </button>
          <button 
            onClick={() => {
              const currentIndex = availableDates.indexOf(selectedDate);
              if (currentIndex > 0) {
                handleDateChange(availableDates[currentIndex - 1]);
              }
            }}
            disabled={availableDates.indexOf(selectedDate) <= 0}
            className="nav-btn-next"
          >
            Next Day ▶
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <StatCard
          title="Daily Sales"
          value={`₹${data.total_sales?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
          subtitle={`${data.total_transactions} transactions`}
          icon="💰"
          color="blue"
        />
        <StatCard
          title="Total Liters"
          value={`${data.total_liters?.toLocaleString('en-IN', { maximumFractionDigits: 0 })} L`}
          subtitle="Fuel dispensed"
          icon="⛽"
          color="green"
        />
        <StatCard
          title="Petrol Sales"
          value={`₹${data.petrol_sales?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
          subtitle={`${data.petrol_liters?.toLocaleString('en-IN', { maximumFractionDigits: 0 })} L`}
          icon="🚗"
          color="blue"
        />
        <StatCard
          title="Diesel Sales"
          value={`₹${data.diesel_sales?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
          subtitle={`${data.diesel_liters?.toLocaleString('en-IN', { maximumFractionDigits: 0 })} L`}
          icon="🚙"
          color="green"
        />
        <StatCard
          title="Avg Transaction"
          value={`₹${data.average_transaction_value?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
          subtitle="Per transaction"
          icon="📊"
          color="blue"
        />
      </div>

      {/* Charts - Top Row */}
      <div className="charts-container">
        <div className="chart-box">
          <FuelDistributionChart data={data.fuel_distribution} />
        </div>
        <div className="chart-box">
          <PaymentMixChart data={data.payment_methods} />
        </div>
      </div>

      {/* Hourly Trend - Full Width */}
      <div className="charts-container">
        <div className="chart-box full-width">
          <h3>⏰ Hourly Sales Trend</h3>
          <HourlyTrendChart data={data.hourly_trend} />
        </div>
      </div>

      {/* Payment Methods - Full Width */}
      <div className="charts-container">
        <div className="chart-box full-width">
          <PaymentMethodChart data={data.payment_methods} />
        </div>
      </div>

      {/* Machine Activity - Full Width */}
      <div className="charts-container">
        <div className="chart-box full-width">
          <MachineActivityChart data={data.machines_activity} />
        </div>
      </div>
    </div>
  );
};

export default DailySalesAnalysis;
