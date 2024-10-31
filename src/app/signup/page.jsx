// src/app/signup/page.jsx
import React from 'react';
import { Box, TextField, Button, Typography, Link, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';

export default function SignUp() {

    //onclick function here

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


                <form>
                    {/* Name Field */}
                    <TextField
                        label="Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />

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
                    {/* Newsletter check */}
                    <FormControl>
                        <FormLabel id="newsLetter_Check" sx={{ fontWeight: 'bold'}}>Sign up to newsletter</FormLabel>
                        <RadioGroup
                            row
                            required
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="newsletter check"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="yes" sx={{ fontWeight: 'bold', color: 'black' }} />
                            <FormControlLabel value="no" control={<Radio />} label="no" sx={{ fontWeight: 'bold', color: 'black' }}/>
                        </RadioGroup>
                    </FormControl>



                    {/* Sign Up Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2, mb: 1 }}
                    //add onclick here
                    >
                        Sign Up
                    </Button>
                </form>

                {/* Link to Login Page */}
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
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
