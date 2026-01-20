import React, { memo } from 'react';
import './StatCard.css';

const StatCard = memo(({ title, value, subtitle, icon, color }) => {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
        <p className="stat-subtitle">{subtitle}</p>
      </div>
    </div>
  );
});

export default StatCard;
