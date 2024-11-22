import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './AuthReq.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, Paper, Button } from '@mui/material';

export default function AuthReq() {
  const [formData, setFormData] = useState({
    treatmentType: '',
    insurancePlan: '',
    dateOfService: '',
    diagnosisCode: '',
    patientId: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.treatmentType) formErrors.treatmentType = 'Treatment type is required';
    if (!formData.insurancePlan) formErrors.insurancePlan = 'Insurance plan is required';
    if (!formData.dateOfService) formErrors.dateOfService = 'Date of service is required';
    if (!formData.diagnosisCode) formErrors.diagnosisCode = 'Diagnosis code is required';
    if (!formData.patientId) formErrors.patientId = 'Patient ID is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Logic to handle form submission
      console.log('Form data submitted:', formData);
      axios.post("http://localhost:5000/api/submitReport",formData).then((res)=>{
        if(res.data === 'success'){
            alert('Authorization request submitted successfully!');
            setFormData({
                treatmentType: '',
                insurancePlan: '',
                dateOfService: '',
                diagnosisCode: '',
                patientId: '',
            });
        }else{
            alert("Could not raise request at the moment, please try again later");
        }
      })
      
    }
  };

  return (
    <div className="auth-req-container">
      <Sidebar />
      <div className="form-container">
        <h2>Submit Prior Authorization Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
            />
            {errors.patientId && <span className="error">{errors.patientId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="treatmentType">Treatment Type:</label>
            <input
              type="text"
              id="treatmentType"
              name="treatmentType"
              value={formData.treatmentType}
              onChange={handleInputChange}
            />
            {errors.treatmentType && <span className="error">{errors.treatmentType}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="insurancePlan">Insurance Plan:</label>
            <input
              type="text"
              id="insurancePlan"
              name="insurancePlan"
              value={formData.insurancePlan}
              onChange={handleInputChange}
            />
            {errors.insurancePlan && <span className="error">{errors.insurancePlan}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfService">Date of Service:</label>
            <input
              type="date"
              id="dateOfService"
              name="dateOfService"
              value={formData.dateOfService}
              onChange={handleInputChange}
            />
            {errors.dateOfService && <span className="error">{errors.dateOfService}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="diagnosisCode">Diagnosis Code:</label>
            <input
              type="text"
              id="diagnosisCode"
              name="diagnosisCode"
              value={formData.diagnosisCode}
              onChange={handleInputChange}
            />
            {errors.diagnosisCode && <span className="error">{errors.diagnosisCode}</span>}
          </div>

          <button type="submit" className="submit-button">Submit Request</button>
        </form>
          <Link to='/viewRep'>View active authorization forms</Link>
      </div>
    </div>
  );
}
