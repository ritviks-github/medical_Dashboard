import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewReports.css';

export default function ViewReports() {
  const [reports, setReports] = useState([]);

  // Fetching reports from the backend API
  useEffect(() => {
    axios.get('http://localhost:5000/api/allReports')
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  return (
    <div className="view-reports-container">
      <h2 className="reports-heading">All Reports</h2>
      <div className="reports-table-wrapper">
        {reports.length > 0 ? (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report ID</th>
                
                <th>Treatment Type</th>
                <th>Diagnosis Code</th>
                <th>Date of Service</th>
                <th>Insurance Plan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report._id}</td>
                  <td>{report.treatmentType}</td>
                  <td>{report.diagnosisCode}</td>
                  <td>{new Date(report.dateOfService).toLocaleDateString()}</td>
                  <td>{report.insurancePlan}</td>
                  <td>{report.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reports found</p>
        )}
      </div>
    </div>
  );
}
