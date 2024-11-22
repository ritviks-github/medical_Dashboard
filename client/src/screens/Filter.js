import React, { useState } from 'react';
import './Filter.css';
import axios from 'axios';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Filter() {
  const [mobile, setMobile] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
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
  // Handle input change for the mobile number
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  // Handle form submission to perform search
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to search for patients by mobile number
      const response = await axios.get(`http://localhost:5000/api/patients/search?mobile=${mobile}`);
      const searchResults = response.data;

      // Check if the search returned any results
      if (searchResults.length > 0) {
        setSearchResults(searchResults);
        setErrorMessage('');
      } else {
        setSearchResults([]);
        setErrorMessage('No patient found with the entered mobile number.');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setErrorMessage('An error occurred while searching. Please try again later.');
    }
  };

  return (
    <div className="filter-container">
      <h3>Search Patient by Mobile Number</h3>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="filter-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleMobileChange}
            placeholder="Enter mobile number"
          />
        </div>
        <button type="submit" className="filter-button">Search</button>
      </form>

      {/* Display search results */}
      <div className="search-results">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {searchResults.length > 0 && (
          <table className="results-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Medical History</th>
                <th>Treatment Plan</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.age}</td>
                  <td>{patient.medical_history.join(', ')}</td>
                  <td>{patient.treatment_plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
