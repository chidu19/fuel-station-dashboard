import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Charts.css';

const PaymentMethodChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const chartData = Object.entries(data).map(([method, count]) => ({
    name: method,
    count,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = chartData.reduce((sum, d) => sum + d.count, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
          <p className="value">Transactions: {payload[0].value}</p>
          <p className="percentage">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrapper">
      <h3>💳 Payment Methods</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1abc9c" opacity={0.1} />
          <XAxis dataKey="name" stroke="#bdc3c7" />
          <YAxis stroke="#bdc3c7" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#3498db" name="Transactions" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentMethodChart;
