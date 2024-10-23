import { Button, Grid } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../Redux/Auth/Action';

function Authentication() {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div>
       <Grid container className='overflow-y-hidden'>
           <Grid item className='hidden md:block' md={7}>
             
             <div className='relative w-full'>

                <div className='absolute top-[30%] left-[30%]'>
                  <svg height={200} width={200} viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                </div>

                  <img
                  className='w-full h-screen'
                  src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png" alt="auth" />
                  
             </div>
              
           </Grid>

           <Grid item className='px-16 py-5' md={5} xs={12}>
             <h1 className='font-bold text-5xl'>What's Happening Now</h1>
             <h1 className='font-bold text-3xl py-12'>Join Twitter Today</h1>

             <div className='w-full '>
                <div className='w-[70%]'>

                   <GoogleLogin/>
                   
                   <p className='py-5 text-center'>Or</p>

                   <Button 
                   fullWidth 
                   variant='contained'
                    size='large'
                     sx={{
                    borderRadius:"29px",
                    py:"7px"
                   }}
                   
                    onClick={()=>{
                      navigate("/signup")
                      handleOpen()                  
                    }} 
                   >
                     Create account
                   </Button>

                   <p className='mt-2 text-sm'>
                    By Signing up, you aggree to the Tearms and Privacy Policy, including Cookie Use.
                   </p>
                </div>
             </div>

             <div className='w-full mt-4'>
              <h1 className='font-bold text-left mb-5'>Already have an account?</h1>

              <Button fullWidth variant='outlined' size='large' sx={{
                    borderRadius:"29px",
                    py:"7px"
                   }}
                   onClick={()=>{
                    navigate("/login")
                    handleOpen()                  
                  }}
                   >
                     Login
              </Button>

             </div>
           </Grid>
       </Grid>

       <AuthModal handleClose={handleClose} open={open}/>
    </div>
  )
}

export default Authentication
