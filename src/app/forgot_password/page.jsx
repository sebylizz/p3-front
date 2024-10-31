//retrieve forgotten password or make new or sum shit
'use client';
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to handle the email submission
    console.log('Email submitted');
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
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
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'black'}}>
          Submit Email for password reset
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
