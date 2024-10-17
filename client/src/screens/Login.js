import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/api/login",{email,password}).then((res)=>{
        if(res.data.success){
            const token = res.data.authToken;
            localStorage.setItem("authToken",token);
            alert("User logged in successfully, click OK to redirect to Home screen");
            navigate('/home');
        }else if(res.data === 'signup'){
            alert("User not found, click OK to redirect to Signup page");
            navigate('/');
        }else if(res.data === 'invalid'){
            alert("Invalid email id or password, Kindly look into the details you have entered");
        }
        else{
            alert("Could not log you in at the moment, Please try again later. Thank you for your cooperation :)");
        }
    })

  }
  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
      <Card style={{ backgroundColor: '#f9f9f9', boxShadow: '0px 5px 15px rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding="20px">
            <Typography variant="h4" style={{ color: '#2e7d32', marginBottom: '20px' }}>Medical Dashboard Login</Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#fff' },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#fff' },
              }}
            />

            <Button
              onClick = {handleLogin}
              variant="contained"
              fullWidth
              style={{ backgroundColor: '#2e7d32', color: '#fff', marginTop: '20px', padding: '10px' }}
            >
              Login
            </Button>

            <Typography variant="body2" style={{ color: '#888', marginTop: '15px' }}>
              Forgot your password? <Link style={{ color: '#2e7d32', textDecoration: 'none' }}>Reset it here</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
