import React from 'react';
import './PatientInfo.css';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function PatientInfo({ patient, onBack }) {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  if (!token) {
    return (
      <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h5" color="error">Not Authorized</Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            You need to log in to access this page.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }
  return (
    <div className="patient-info-container">
      <button onClick={onBack} className="back-button">
        Back to Patient List
      </button>
      <h2>Patient Details</h2>
      <div className="patient-details">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Mobile:</strong> {patient.mobile}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Medical History:</strong> {patient.medical_history.join(', ')}</p>
        <p><strong>Treatment Plan:</strong> {patient.treatment_plan}</p>
      </div>
    </div>
  );
}
