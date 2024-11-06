"use client"
import React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import loginFunction from '../lib/loginFunction.js';
import cook from '../lib/cookies.js';


export default function Login() {
    // State hooks for email, password, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // Handle login button click
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevents page reload

        try {
            // Call login function with email and password
            const result = await loginFunction(email, password);

            // If login is successful, redirect to the main page
            if (result.success) {
                await cook(result.data.token);
                window.location.href = '/'; // Redirect to main page
            } else {
                // Set error message if login fails
                setErrorMessage("Password or email was not correct");
            }
        } catch (error) {
            // Set error message if login fails due to other issues
            console.log(error);
            setErrorMessage("Password or email was not correct");
        }
    };

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

                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                    />

                    {/* Password Field */}
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                    />

                    {/* Error Message */}
                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errorMessage}
                        </Typography>
                    )}

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
