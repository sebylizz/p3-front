"use client";

import React, { useState, useEffect } from 'react';
import resetPassword from '../lib/resetPasswordFetcher';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
    const [passwordError, setPasswordError] = useState(false);
    const [resetToken, setResetToken] = useState(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        setResetToken(token);
    }, [searchParams]);

    async function passData(event) {
        event.preventDefault();

        const password = document.getElementById("Password").value;
        const confirmPassword = document.getElementById("ConfirmPassword").value;

        // Password validation
        if (password === confirmPassword) {
            setPasswordError(false); // Reset password error

            const data = { token: resetToken, password: password };

            const response = await resetPassword(data);
            if (response.success) {
                window.location.href = '/';
                alert("Password reset succesfull!")
            } else {
                alert("Failed to reset password. Please resubmit email for password reset.");
            }
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
                <Typography variant="h6" textAlign="center" mb={2}>
                    Reset Password
                </Typography>
                <form onSubmit={passData}>
                    {/* Password Field */}
                    <TextField
                        id="Password"
                        label="New password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />

                    {/* Confirm Password Field */}
                    <TextField
                        id="ConfirmPassword"
                        label="Confirm new password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        error={passwordError}
                        helperText={passwordError ? "Passwords do not match" : ""}
                    />

                    {/* Reset Password Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2, mb: 1 }}
                    >
                        Reset Password
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
