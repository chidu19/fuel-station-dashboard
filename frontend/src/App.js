import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import DailySalesAnalysis from './components/DailySalesAnalysis';
import Filter from './components/Filter';
import './App.css';

// API Base URL from environment or localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Cache duration constant (5 minutes in ms)
const CACHE_DURATION = 5 * 60 * 1000;

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({});

  // Client-side cache for reducing API calls
  const cacheRef = React.useRef({});
  const cacheTimeRef = React.useRef({});

  const fetchDashboardData = useCallback(async (filterParams = {}) => {
    // Generate cache key from filter params
    const cacheKey = JSON.stringify(filterParams);
    const now = Date.now();
    
    // Return cached data if valid
    if (cacheRef.current[cacheKey] && now - cacheTimeRef.current[cacheKey] < CACHE_DURATION) {
      setData(cacheRef.current[cacheKey]);
      return;
    }
    
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterParams.start_date) params.append('start_date', filterParams.start_date);
      if (filterParams.end_date) params.append('end_date', filterParams.end_date);
      
      const response = await axios.get(`${API_URL}/api/dashboard-stats`, { params });
      
      // Cache the response
      cacheRef.current[cacheKey] = response.data;
      cacheTimeRef.current[cacheKey] = now;
      
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleApplyFilter = (filterParams) => {
    setFilters(filterParams);
    fetchDashboardData(filterParams);
  };

  const handleClearFilter = () => {
    setFilters({});
    fetchDashboardData();
  };

  const handleUploadSuccess = () => {
    fetchDashboardData(filters);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>⛽ Fuel Station Analytics Dashboard</h1>
        <p>Real-time Performance Monitoring & Analysis</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily Analysis
        </button>
        <button
          className={`nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Data
        </button>
      </nav>

      <div className="app-content">
        {activeTab === 'dashboard' && (
          <>
            <Filter onApplyFilter={handleApplyFilter} onClearFilter={handleClearFilter} />
            <Dashboard data={data} loading={loading} onRefresh={() => fetchDashboardData(filters)} />
          </>
        )}
        {activeTab === 'daily' && (
          <DailySalesAnalysis />
        )}
        {activeTab === 'upload' && (
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;
