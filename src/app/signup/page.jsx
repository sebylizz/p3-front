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
        const email = document.getElementById("Email").value;
        const password = document.getElementById("Password").value;
        const confirmPassword = document.getElementById("ConfirmPassword").value;

        const pattern = RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        const isEmailValid = pattern.test(email);
        if (!isEmailValid) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        if (password === confirmPassword) {
            setPasswordError(false);

            const newSignUp = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            await addCustomer(newSignUp);
            window.location.href = '/';

        } else {
            setPasswordError(true);
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="85vh" 
            bgcolor="#f5f5f5"
            padding="2%"
        >
            <Box
                p={3}
                bgcolor="white"
                borderRadius={2}
                boxShadow={3}
                width="100%"
                maxWidth="400px"
                sx={{ height: 'auto' }}
            >
                <form onSubmit={passData}>
                    <TextField
                        id="FirstName"
                        label="First Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        id="LastName"
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />

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

                    <TextField
                        autoComplete="new-password"
                        id="Password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />

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
