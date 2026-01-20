import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Charts.css';

const MachineActivityChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const chartData = Object.entries(data).map(([machine, values]) => ({
    name: machine,
    sales: parseFloat(values.sales),
    liters: parseFloat(values.liters),
    transactions: values.count,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
          <p className="value">Sales: ₹{parseFloat(payload[0].payload.sales).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="liters">Liters: {parseFloat(payload[0].payload.liters).toLocaleString('en-IN', { maximumFractionDigits: 0 })} L</p>
          <p className="count">Transactions: {payload[0].payload.transactions}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrapper">
      <h3>🤖 Machine Activity</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1abc9c" opacity={0.1} />
          <XAxis dataKey="name" stroke="#bdc3c7" />
          <YAxis stroke="#bdc3c7" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="sales" fill="#3498db" name="Sales (₹)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="liters" fill="#27ae60" name="Liters" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MachineActivityChart;
