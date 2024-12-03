import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SignUpImg from "../../images/signup-g.svg";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';

const SignUp = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      Email: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        padding: '40px 0',
      }}
    >
      <Grid container alignItems="center" justifyContent="center">
        {/* Left Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <img
            src={SignUpImg}
            alt="Sign Up Illustration"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </Grid>

        {/* Right Form Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '90%',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Get Started Shopping
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              marginBottom: '30px',
              textAlign: 'center',
              lineHeight: '1.6',
            }}
          >
            Welcome to FreshCart! Enter your details to create an account and get started.
          </Typography>

          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Grid container spacing={3}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      size="small"
                      sx={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px',
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      sx={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px',
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Controller
                  name="Email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      variant="outlined"
                      size="small"
                      sx={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px',
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <OutlinedInput
                  fullWidth
                  size="small"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    padding: '12px 20px',
                    fontSize: '16px',
                    textTransform: 'none',
                    borderRadius: '5px',
                    '&:hover': {
                      backgroundColor: '#0056b3',
                    },
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
