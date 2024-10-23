

import { Button, Grid, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import React from 'react'

import * as Yup from 'yup'
import { loginUser } from '../Redux/Auth/Action'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
  email:Yup.string().email("Invalid Email").required("Email is required"),
  password:Yup.string().required("Password is required")
})

function SigninForm({handleClose}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema,
    onSubmit:(values)=>{
      console.log(values);

      dispatch(loginUser(values));
      handleClose();
      navigate("/");
    }
  })



  return (
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
               <TextField
                fullWidth
                label="Email"
                name='email'
                variant='outlined'
                size='large'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
               />
            </Grid>

            <Grid item xs={12}>
               <TextField
                fullWidth
                label="Password"
                name='password'
                type='password'
                variant='outlined'
                size='large'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
               />
            </Grid>

            <Grid item xs={12}>
              <Button
               fullWidth
               type="submit"
               variant='contained'
                size='large'
               sx={{
               bgcolor:blue[500],
                borderRadius:"29px",
                py:"15px"
                }}>
                  Login
                </Button>
            </Grid>

           

        </Grid>
    </form> 
  )
}

export default SigninForm



