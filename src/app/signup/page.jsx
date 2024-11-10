"use client";

import React, { useState } from 'react';
import addCustomer from '../lib/addCustomerFetcher';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

export default function SignUp() {
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    async function passData(event) {
        event.preventDefault();

        const firstName = document.getElementById("FirstName").value;
        const lastName = document.getElementById("LastName").value;
        const password = document.getElementById("Password").value;
        const confirmPassword = document.getElementById("ConfirmPassword").value;
        const email = document.getElementById("Email").value;

        // Email validation
        const isEmailValid = email.includes("@");
        if (!isEmailValid) {
            setEmailError(true); // Show email error if "@" is missing
            return; // Stop the form submission
        } else {
            setEmailError(false); // Reset email error
        }

        // Password validation
        if (password === confirmPassword) {
            setPasswordError(false); // Reset password error

            const newSignUp = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            await addCustomer(newSignUp);
            window.location.href = '/'; // Redirect to main page

        } else {
            setPasswordError(true); // Show password mismatch error
        }
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
                p={5}
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
                        label="First Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />

                    {/* Last Name Field */}
                    <TextField
                        id="LastName"
                        label="Last Name"
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
                        error={emailError}
                        helperText={emailError ? "Please enter a valid email address" : ""}
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

                    {/* Confirm Password Field */}
                    <TextField
                        id="ConfirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        error={passwordError}
                        helperText={passwordError ? "Passwords do not match" : ""}
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