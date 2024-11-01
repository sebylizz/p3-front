
"use client"
import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';



export default function Login() {
  
  

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="85vh" 
      bgcolor="black"
    >
      <Box 
        p={4} 
        bgcolor="white" 
        borderRadius={2} 
        boxShadow={3} 
        width="100%" 
        maxWidth="400px"
      >
        
        <form>
          {/* Email Field */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2, mb: 1 }}
          >
            Login
          </Button>
        </form>

        {/* Forgot Password and Sign Up Links */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Link href="/forgot_password" underline="hover">
            Forgot Password?
          </Link>
          <Link href="/signup" underline="hover">
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
