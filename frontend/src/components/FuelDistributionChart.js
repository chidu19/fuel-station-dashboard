import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './Charts.css';

const FuelDistributionChart = ({ data }) => {
  if (!data) return null;

  const chartData = Object.entries(data).map(([key, val]) => ({
    name: key,
    value: parseFloat(val.sales),
    liters: parseFloat(val.liters),
  }));

  const COLORS = ['#3498db', '#27ae60'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].name}</p>
          <p className="value">₹{parseFloat(payload[0].value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="liters">{payload[0].payload.liters.toLocaleString('en-IN', { maximumFractionDigits: 0 })} L</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrapper">
      <h3>⛽ Fuel Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${((value / chartData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FuelDistributionChart;
