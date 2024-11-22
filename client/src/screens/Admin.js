import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  // Fetch pending reports from the backend
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('http://localhost:5000/api/reports/pending', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then((response) => {
          setReports(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the reports:", error);
        });
    }
  }, []);

  // Function to update the status of a report (Grant or Reject)
  const updateReportStatus = (id, status) => {
    const authToken = localStorage.getItem('authToken');
    axios.patch(`http://localhost:5000/api/reports/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then((response) => {
        // Update the report status locally to avoid re-fetching all reports
        setReports((prevReports) => prevReports.map((report) => 
          report._id === id ? { ...report, status } : report
        ));
      })
      .catch((error) => {
        console.error("There was an error updating the report status:", error);
      });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };

  // Check for auth token
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
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
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center" style={{ margin: '20px 0' }}>
          Pending Reports
        </Typography>
        <Button className="btn btn-success" onClick={handleLogout} style={{ marginBottom: '20px' }}>
          Logout
        </Button>
        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Patient ID: {report.patientId}</Typography>
                  <Typography variant="body1">Treatment Type: {report.treatmentType}</Typography>
                  <Typography variant="body1">Insurance Plan: {report.insurancePlan}</Typography>
                  <Typography variant="body1">Date of Service: {new Date(report.dateOfService).toLocaleDateString()}</Typography>
                  <Typography variant="body1">Diagnosis Code: {report.diagnosisCode}</Typography>
                  <Typography variant="body2" color="textSecondary">Status: {report.status || 'Pending'}</Typography>

                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => updateReportStatus(report._id, 'granted')}
                    >
                      Grant
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => updateReportStatus(report._id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
