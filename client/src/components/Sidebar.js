import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  return (
    <div className="sidebar">
      <button id="dashboard-title">
        Patient Health Dashboard for Prior Authorization
      </button>
      <div className="button-container">
        
        <Link id="view-patients" className="btn" to="/filter">
          Looking for a particular patient ??
        </Link>
        <Link id="view-patients" className="btn" to="/dashboard">
          View All Patients
        </Link>
        <Link id="submit-prior-authorization" className="btn" to="/authReq">
          Submit Prior Authorization Request
        </Link>
        <button className='btn btn-success' onClick = {handleLogout}>Logout</button>
      </div>
    </div>
  );
}
