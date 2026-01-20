import React from 'react';
import StatCard from './StatCard';
import FuelDistributionChart from './FuelDistributionChart';
import DailyTrendChart from './DailyTrendChart';
import HourlyTrendChart from './HourlyTrendChart';
import MachineActivityChart from './MachineActivityChart';
import PaymentMethodChart from './PaymentMethodChart';
import PaymentMixChart from './PaymentMixChart';
import './Dashboard.css';

const Dashboard = ({ data, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="loader"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard empty">
        <p>No data available. Please upload data first.</p>
        <button onClick={onRefresh} className="btn-refresh">
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Top KPI Cards */}
      <div className="kpi-grid">
        <StatCard
          title="Total Sales"
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

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-box">
          <FuelDistributionChart data={data.fuel_distribution} />
        </div>
        <div className="chart-box">
          <PaymentMixChart data={data.payment_methods} />
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box full-width">
          <PaymentMethodChart data={data.payment_methods} />
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box full-width">
          <DailyTrendChart data={data.daily_trend} />
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box full-width">
          <HourlyTrendChart data={data.hourly_trend} />
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box full-width">
          <MachineActivityChart data={data.machines_activity} />
        </div>
      </div>

      <div className="refresh-container">
        <button onClick={onRefresh} className="btn-refresh">
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
