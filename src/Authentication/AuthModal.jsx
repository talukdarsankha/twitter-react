

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import SigninForm from './SigninForm';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { blue } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 400, // width for small screens (xs)
    md: 500, // width for screens larger than small (sm and up)
  },
  maxHeight:"90vh",
  // overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:2,
  outline:"none",
  p: 4,

};

export default function AuthModal({handleClose,open}) {
  
  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigate=()=>{
    const navigatePath =  location.pathname==="/signup"? "/login" : "/signup" 
      navigate(navigatePath);
  }

  return (

    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-y-auto scrollbar">
          <IconButton onClick={handleClose} aria-label='delete'>
            <CloseOutlined/>
          </IconButton>

          <h1 className='font-bold text-center text-3xl pb-10'>
          {location.pathname==="/signup"? "Create Your Account" : "Login Your Account"  }
          </h1>

          <div>
           {location.pathname==="/signup"? <SignUpForm handleClose={handleClose} /> : <SigninForm handleClose={handleClose}/>}
          </div>

          <h1 className='text-center py-5 font-semibold text-lg text-gray-500'>
           {location.pathname==="/signup"? "Already have an account" : "If you don't have an account"}
          </h1>

          <Button
              onClick={handleNavigate}
              fullWidth
              variant='outlined'
              size='large'
              sx={{
              borderRadius:"29px",
              py:"12px"
              }}>
                 {location.pathname==="/signup"? "Login" : "Register" }
          </Button>

        </Box>
      </Modal>
    </div>
  );
}
