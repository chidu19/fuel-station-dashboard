import React, { useRef, useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const FileUpload = ({ onUploadSuccess }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [uploadStats, setUploadStats] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      setMessageType('error');
      setMessage('❌ Please upload a CSV or Excel file');
      return;
    }

    setLoading(true);
    setMessage('⏳ Uploading file...');
    setMessageType('info');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStats({
        added: response.data.added,
        skipped: response.data.skipped,
      });

      setMessageType('success');
      setMessage(`✅ ${response.data.message}`);
      onUploadSuccess();
      fileInputRef.current.value = '';
    } catch (error) {
      setMessageType('error');
      setMessage(`❌ ${error.response?.data?.error || 'Upload failed'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDatabase = async () => {
    // Confirmation dialog
    const confirmed = window.confirm(
      '⚠️ This will permanently delete ALL data from the database!\n\nAre you sure you want to continue?'
    );
    
    if (!confirmed) return;

    setLoading(true);
    setMessage('⏳ Deleting all data...');
    setMessageType('info');

    try {
      await axios.delete(`${API_URL}/api/clear-database`);
      setMessageType('success');
      setMessage('✅ Database cleared successfully! All data has been deleted.');
      setUploadStats(null);
      onUploadSuccess(); // Refresh dashboard
    } catch (error) {
      setMessageType('error');
      setMessage(`❌ ${error.response?.data?.error || 'Failed to delete data'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          <h2>📤 Upload Transaction Data</h2>
          <p>Upload CSV or Excel files containing fuel station transaction data</p>
        </div>

        <div className="upload-info">
          <h3>Required Columns:</h3>
          <ul>
            <li>transaction_id - Unique transaction identifier</li>
            <li>date - Date in YYYY-MM-DD format</li>
            <li>time - Time in HH:MM:SS format</li>
            <li>fuel - Type of fuel (Petrol/Diesel)</li>
            <li>machine_no - Machine number</li>
            <li>nozzle_no - Nozzle number</li>
            <li>liters - Liters dispensed</li>
            <li>unit_price - Price per liter</li>
            <li>amount - Total transaction amount</li>
            <li>payment_type - Payment method</li>
          </ul>
        </div>

        <div className="upload-actions">
          <label className="upload-label">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.xlsx"
              disabled={loading}
              className="file-input"
            />
            <span className={`upload-btn ${loading ? 'disabled' : ''}`}>
              {loading ? '⏳ Uploading...' : '📁 Choose File (CSV/Excel)'}
            </span>
          </label>

          <button
            onClick={handleDeleteDatabase}
            className="delete-btn"
            disabled={loading}
            title="Delete all data from database"
          >
            🗑️ Delete All Data
          </button>
        </div>

        {message && (
          <div className={`message message-${messageType}`}>
            {message}
          </div>
        )}

        {uploadStats && (
          <div className="upload-stats">
            <div className="stat">
              <span className="stat-label">Records Added:</span>
              <span className="stat-value success">{uploadStats.added}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Records Skipped:</span>
              <span className="stat-value warning">{uploadStats.skipped}</span>
            </div>
          </div>
        )}

        <div className="file-requirements">
          <h4>📋 File Requirements:</h4>
          <ul>
            <li>File format: .csv or .xlsx</li>
            <li>Maximum file size: 100 MB</li>
            <li>Duplicate transactions (by transaction_id) will be skipped</li>
            <li>Data from multiple uploads will be combined in the database</li>
          </ul>
        </div>

        <div className="note-box">
          <strong>💡 Tip:</strong> You can upload data from multiple days. Each upload automatically combines with existing data in the database. Duplicate transaction IDs are automatically detected and skipped.
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
