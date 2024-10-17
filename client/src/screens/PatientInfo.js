import React from 'react';
import './PatientInfo.css';

export default function PatientInfo({ patient, onBack }) {
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
