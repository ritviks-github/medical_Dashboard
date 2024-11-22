import React from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  // Check for authToken
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
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Add your content here */}
        <Typography variant="h4" gutterBottom>
          Welcome to the Home Page
        </Typography>
        {/* You can place your other content here */}
        <Link to='/filter' className='btn btn-success'>Find a Patient</Link>
        <p style={{fontWeight:'100'}}>Here you can look for details of a particular patient</p>
        <Link to='/dashboard' className='btn btn-success'>View all Patients</Link>
        <p style={{fontWeight:'100'}}>Contains a list of patients and their respective details</p>
        <Link to='/authReq' className='btn btn-success'>Make an Authorization Request</Link>
        <p style={{fontWeight:'100'}}>You need an approval to avail your mediclaim</p>
        <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
        <p style={{fontWeight:'50'}}>In case you're using the tool on a mobile phone,Logout may not be visible, Click on the above Logout button to Logout</p>
      </div>
    </div>
  );
}
