import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onApplyFilter, onClearFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  const handleApply = () => {
    if (startDate || endDate) {
      const filterParams = {
        start_date: startDate ? new Date(startDate).toISOString().split('T')[0] : null,
        end_date: endDate ? new Date(endDate).toISOString().split('T')[0] : null,
      };
      onApplyFilter(filterParams);
      setActiveFilter(true);
    }
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setActiveFilter(false);
    onClearFilter();
  };

  return (
    <div className="filter-container">
      <button className={`filter-toggle ${activeFilter ? 'active-filter' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        🔍 {isOpen ? 'Hide' : 'Show'} Filters
        {activeFilter && <span className="filter-badge">Active</span>}
      </button>

      {isOpen && (
        <div className="filter-panel">
          <div className="filter-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            <button className="btn-apply" onClick={handleApply} disabled={!startDate && !endDate}>
              ✓ Apply Filter
            </button>
            <button className="btn-clear" onClick={handleClear} disabled={!activeFilter}>
              ✕ Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
