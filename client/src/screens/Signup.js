import React, { useEffect, useState } from 'react';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import { TextField, Button, Container, Box, Typography, Card, CardContent, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const token = localStorage.getItem("authToken");
  useEffect(()=>{
    if(token){
      navigate('/home');
    }
  },[]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  // Function to check email validity
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validator.isEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  // Function to check password strength using zxcvbn
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const result = zxcvbn(value);
    if (value && value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setPasswordStrength('');
    } else {
      setPasswordError('');
      setPasswordStrength(result.score); // zxcvbn returns a score from 0 to 4
    }
  };

  // Function to display password strength feedback
  const getPasswordStrengthFeedback = () => {
    switch (passwordStrength) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  // Function to check if passwords match
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value && value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Function to check phone number validity
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (value && !/^\d{10}$/.test(value)) {
      setPhoneError('Phone number must be exactly 10 digits.');
    } else {
      setPhoneError('');
    }
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      name &&
      age &&
      gender &&
      email &&
      password &&
      confirmPassword &&
      phone &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !phoneError
    );
  };
  const navigate = useNavigate();
  const handleSignupRequest = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/api/signup",{name,age,gender,email,password,phone}).then((res)=>{
        if(res.data === 'success'){
            alert("User Signed up succesfully");
            navigate('/login');
        }else if(res.data === 'login'){
            alert("User already exists, Press OK to redirect to login page");
            navigate('/login')
        }
        else{
            alert("There is some trouble signing up the user, please try again later. Thank you for your cooperation :)");
        }
    })
  }

  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
      <Card style={{ backgroundColor: '#f9f9f9', boxShadow: '0px 5px 15px rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding="20px">
            <Typography variant="h4" style={{ color: '#2e7d32', marginBottom: '20px' }}>Create Your Account</Typography>

            <TextField label="Full Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />

            <TextField label="Age" type="number" variant="outlined" fullWidth margin="normal" value={age} onChange={(e) => setAge(e.target.value)} />

            <TextField label="Gender" select variant="outlined" fullWidth margin="normal" value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError || getPasswordStrengthFeedback()}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />

            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={handlePhoneChange}
              error={!!phoneError}
              helperText={phoneError}
            />

            <Button
              variant="contained"
              fullWidth
              style={{
                backgroundColor: isFormValid() ? '#2e7d32' : '#aaa',
                color: '#fff',
                marginTop: '20px',
                padding: '10px',
                cursor: isFormValid() ? 'pointer' : 'not-allowed',
              }}
              disabled={!isFormValid()}
              onClick = {handleSignupRequest}
            >
              Sign Up
            </Button>

            <Typography variant="body2" style={{ color: '#888', marginTop: '15px' }}>
              Already have an account? <Link to="/login" style={{ color: '#2e7d32', textDecoration: 'none' }}>Login here</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
