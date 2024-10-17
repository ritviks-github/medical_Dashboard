import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import './Dashboard.css';
import PatientInfo from './PatientInfo';

export default function Dashboard() {
  const [patientData, setPatientData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch patient data from the server
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/patients')
      .then((res) => {
        setPatientData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, []);

  // Handle row click to set the selected patient
  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {selectedPatient ? (
          // If a patient is selected, show the PatientInfo component
          <PatientInfo patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
        ) : (
          // Otherwise, show the patient list
          <>
            <h2>Patient List</h2>
            <div className="patient-table">
              {patientData.length > 0 ? (
                <table>
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
                    {patientData.map((patient, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(patient)}
                        className="clickable-row"
                      >
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
              ) : (
                <p>Loading patient data...</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}