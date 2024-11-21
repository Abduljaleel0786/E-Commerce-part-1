import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SignUpImg from "../../images/signup-g.svg";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';

const SignUp = () => {
  const [pass, setpass] = useState()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      Email: "",

    },
  })
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className="m-3 mt-5 d-flex justify-content-around" sx={{ backgroundColor: '#fff', padding: '20px', }}>

      <Grid className=' d-flex justify-content-center align-items-center  ' container spacing={3} alignItems="center" justifyContent="center">
        <Grid className=' text-center' item xs={12} sm={12} md={6}>
          <img src={SignUpImg} alt="Sign Up Illustration" className="img-fluid" style={{
            maxWidth: '100%', height: 'auto', borderRadius: '10px',
          }}
          />
        </Grid>


        <Grid  className=''  item xs={12} sm={12} md={6} textAlign="center">
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Get Started Shopping
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#777', marginBottom: '20px', fontSize: '16px' }}
          >
            Welcome to FreshCart! Enter your email to get started.
          </Typography>
          <form onSubmit={handleSubmit((data) => {
            console.log(data);
          })}>
            <Grid container spacing={2} justifyContent="center">

              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (

                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="First Name"
                      variant="outlined"
                      sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
                    />)} />
              </Grid>


              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (

                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="Last Name"
                      variant="outlined"
                      sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
                    />)} />
              </Grid>


              <Grid item xs={12}>
                <Controller
                  name="Email"
                  control={control}
                  render={({ field }) => (

                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="Email"
                      variant="outlined"
                      sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
                    />)} />
              </Grid>


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
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
                />
              </Grid>


              <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth sx={{
                  backgroundColor: '#007BFF', color: '#fff', padding: '10px 20px', fontSize: '16px', textTransform: 'none', borderRadius: '5px', '&:hover': { backgroundColor: '#0056b3', },
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
