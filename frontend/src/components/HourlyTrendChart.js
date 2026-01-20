import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Charts.css';

const HourlyTrendChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const chartData = Object.entries(data).map(([hour, values]) => ({
    hour,
    sales: parseFloat(values.sales),
    count: values.count,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.hour}</p>
          <p className="value">Sales: ₹{parseFloat(payload[0].payload.sales).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="count">Transactions: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrapper">
      <h3>⏰ Hourly Sales Pattern</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1abc9c" opacity={0.1} />
          <XAxis dataKey="hour" stroke="#bdc3c7" />
          <YAxis stroke="#bdc3c7" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#3498db" strokeWidth={2} name="Sales (₹)" dot={{ fill: '#3498db', r: 5 }} />
          <Line type="monotone" dataKey="count" stroke="#27ae60" strokeWidth={2} name="Transactions" dot={{ fill: '#27ae60', r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyTrendChart;
