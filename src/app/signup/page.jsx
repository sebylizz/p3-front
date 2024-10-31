"use client";

import React from 'react';
import addCustomer from '../addCustomerFetcher';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

export default function SignUp() {

async function passData(event) {

  // Prevents the default form submission behavior
  event.preventDefault();

  let newSignUp = {};
  newSignUp.firstName = document.getElementById("FirstName").value;
  newSignUp.lastName = document.getElementById("LastName").value;
  newSignUp.email = document.getElementById("Email").value;
  newSignUp.password = document.getElementById("Password").value;

  await addCustomer(newSignUp);
}

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="85vh" 
      bgcolor="#f5f5f5"
    >
      <Box 
        p={4} 
        bgcolor="white" 
        borderRadius={2} 
        boxShadow={3} 
        width="100%" 
        maxWidth="400px"
      >

        
        <form onSubmit={passData}>
          {/* First Name Field */}
          <TextField
            id="FirstName"
            label="FirstName"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          {/* Last Name Field */}
          <TextField
            id="LastName"
            label="LastName"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          {/* Email Field */}
          <TextField
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          {/* Password Field */}
          <TextField
            id="Password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          {/* Sign Up Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2, mb: 1 }}
          >
            Sign Up
          </Button>
        </form>

        {/* Link to Login Page */}
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}