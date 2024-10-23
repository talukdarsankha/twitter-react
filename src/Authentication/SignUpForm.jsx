import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


import * as Yup from 'yup'
import { registerUser } from '../Redux/Auth/Action';
import { useNavigate } from 'react-router-dom';




const validationSchema = Yup.object().shape({
    email:Yup.string().email("Invalid Email").required("Email is required"),
    password:Yup.string().required("Password is required")
  })

  const currentYear = new Date().getFullYear();
  const years = Array.from({length:100},(_,i)=>currentYear-i)
  const dates = Array.from({length:31},(_,i)=>i+1)
  const monts = [
    {value:1,lable:"January"},
    {value:2,lable:"February"},
    {value:3,lable:"March"},
    {value:4,lable:"April"},
    {value:5,lable:"May"},
    {value:6,lable:"June"},
    {value:7,lable:"July"},
    {value:8,lable:"Augast"},
    {value:9,lable:"September"},
    {value:10,lable:"October"},
    {value:11,lable:"November"},
    {value:12,lable:"December"}
  ]

  

function SignUpForm({handleClose}) {
    
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const [dateOfBirth,setDateOfBirth] = useState({
        date:"",
        month:"",
        year:""
      })

    const formik = useFormik({
        initialValues:{
          email:"",
          password:"",
          fullname:"",
          birthDate:""
        },
        validationSchema,
        onSubmit:(values)=>{
          const birthDate = `${dateOfBirth.month} ${dateOfBirth.date}, ${dateOfBirth.year}`
          values.birthDate=birthDate;
          // console.log(values);
         
         
         dispatch(registerUser(values));
         handleClose();
         navigate("/")
        }
    })

    const handleDateChange=(name)=>(event)=>{
      const updatedDateOfBirth = {
        ...dateOfBirth,
        [name]: event.target.value,
      };
    
      setDateOfBirth(updatedDateOfBirth);
    }
    

  return (
    
    <div>
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
               <TextField
                fullWidth
                label="Fullname"
                name='fullname'
                variant='outlined'
                size='large'
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                
               />
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Date</InputLabel>
              <Select
              fullWidth
              name='date' 
              value={dateOfBirth.date}
              onChange={handleDateChange("date")}
              >
                 {dates.map((date)=><MenuItem key={date} value={date}>{date}</MenuItem>)}
              </Select>
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Month</InputLabel>
              <Select
              fullWidth
              name='month' 
              value={dateOfBirth.month}
              onChange={handleDateChange("month")}
              >
                 {monts.map((month)=><MenuItem key={month.value} value={month.lable}>{month.lable}</MenuItem>)}
              </Select>
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Year</InputLabel>
              <Select
              fullWidth
              name='year' 
              value={dateOfBirth.year}
              onChange={handleDateChange("year")}
              >
                 {years.map((year)=><MenuItem key={year} value={year}>{year}</MenuItem>)}
              </Select>
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
                  Register
                </Button>
            </Grid>

          

        </Grid>
    </form> 
    </div>
  )
}

export default SignUpForm
