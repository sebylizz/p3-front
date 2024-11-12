'use client';
import React from 'react';
import emailSender from '../lib/forgotPasswordFetcher';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ForgotPassword() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = {email: document.getElementById("Email").value};

        await emailSender(email);
        window.location.href = '/';
        
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
                <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'black' }}>
                    Submit Email for password reset
                </Typography>

                <form onSubmit={handleSubmit}>
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