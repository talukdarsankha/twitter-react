import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, Backdrop, CircularProgress, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';


import * as Yup from 'yup'
import { updateUserProfile } from '../Redux/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';
import { UploadToCloudinary } from '../Config/UploadCloudinary';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 400, // width for small screens (xs)
    sm: 700, // width for screens larger than small (sm and up)
  },
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius:4,
  boxShadow: 24,
  p: 4,
  outline:"none",
};


const validation = Yup.object().shape({
    fullname:Yup.string().required("Fullname is required"),
    // website:Yup.string().required("website is required"),
    bio:Yup.string().required("bio is required"),
    location:Yup.string().required("location is required")
})

  

export default function ProfileModal({ open,handleModalClose}) {

  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);


  const [uploadingFile, setUploadingFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedBackgroundImageFile, setSelectedBackgroundImageFile] = useState(null);
  const [imgFor, setImgFor] = useState("");
  const [selectedProfileImageUrl, setSelectedProfileImageUrl] = useState("");
  const [selectedBackgroundImageUrl, setSelectedBackgroundImageUrl] = useState("");



const handleFileChange=(e)=>{
  const name = e.target.name;  // like this we can get input tag name
  const file = e.target.files[0];

 if(file){
  if(name==="backgroundImage"){
    setSelectedBackgroundImageFile(file);
  }else{
    setSelectedImageFile(file);
  }
   
   const url =  URL.createObjectURL(file)  // in that way we can create a url without upload 
    
   if(name==="backgroundImage"){
     setSelectedBackgroundImageUrl(url);
     setImgFor("backgroundImage");
   }else{
     setSelectedProfileImageUrl(url);
     setImgFor("image")
   }
 }else{  // means no file selected
    setUploadingFile(false);
    setImgFor("");

    if(name==="backgroundImage"){
      setSelectedBackgroundImageFile(null);
    }else{
      setSelectedImageFile(null);
    }
    
    if(name==="backgroundImage"){
      setSelectedBackgroundImageUrl("");
    }else{
      setSelectedProfileImageUrl("");
    }

 }
}



  const handleSubmit= async (value, action)=>{
      //  console.log(value);

      setUploadingFile(true);
      const uploadedImageUrl = await UploadToCloudinary(selectedImageFile,"image");
      const uploadedBackgroundImageUrl = await UploadToCloudinary(selectedBackgroundImageFile,"image");

      console.log("uploadedImageUrl = "+uploadedImageUrl)
      console.log("uploadedBackgroundImageUrl = "+uploadedBackgroundImageUrl)

      dispatch(updateUserProfile({ ...value, "image": uploadedImageUrl, "backgroundImage": uploadedBackgroundImageUrl}));

        // Reset the form immediately after the dispatch
       action.resetForm();

      setUploadingFile(false);
      setImgFor("");
      setSelectedBackgroundImageFile(null);
      setSelectedImageFile(null);
      setSelectedProfileImageUrl("");
      setSelectedBackgroundImageUrl("");

  }

  const formik = useFormik({
    initialValues: {
      fullname: auth.findUser?.fullname || "",
      website: auth.findUser?.website || "",
      location: auth.findUser?.location || "",
      bio: auth.findUser?.bio || ""
    },
    enableReinitialize: true, // Ensure form reinitializes when findUser updates
    onSubmit: handleSubmit,
    validationSchema: validation,
  });
  

  

  return (
    <div>

      <Modal
        open={open && auth.findUser}  // means full fill load user then only open
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <form onSubmit={formik.handleSubmit} >
               <div className='flex items-center justify-between pb-2'>
                  <div className='flex items-center space-x-3'>
                    <IconButton onClick={handleModalClose} aria-label='delete'>
                         <Close/>
                    </IconButton>
                    <p>Edit Profile</p>
                  </div>

                  <Button disabled={uploadingFile} type='submit' variant='outlined'>
                      <div className='relative flex  items-center'>
                         {uploadingFile && <div className='pr-2'>
                          <CircularProgress size="16px" />
                         </div>}
                        
                         Save
                      </div>
                      
                   </Button>
               </div>

                  {/* hideScrollbar css is present in index.css */}
               <div className=' hideScrollbar overflow-y-auto overflow-x-hidden h-[70vh]' >
                   <React.Fragment>
                     <div className='w-full'>
                        <div className='relative'>
                             <label htmlFor='backgroundImage' className='cursor-pointer'>
                                <img
                                className='w-full h-[12rem] object-cover object-center'
                                src={selectedBackgroundImageUrl || auth.findUser?.backgroundImage || "https://www.shutterstock.com/image-photo/white-cement-concrete-wall-texture-600nw-1891225786.jpg"} 
                                alt="background" />
                             </label>

                            <input type="file" accept='image/*' className='hidden' name='backgroundImage' onChange={(e)=>handleFileChange(e)} id ="backgroundImage" />
                        </div>

                        <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                           <div className='relative'>
                                <Avatar
                                sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
                                src={selectedProfileImageUrl || auth.findUser?.image}
                                alt='profile'
                                />                               

                               <input 
                               className='cursor-pointer absolute top-0 left-0 h-[10rem] w-[10rem] rounded-full opacity-0'
                               name='image'
                               onChange={(e)=>handleFileChange(e)}
                               type='file' accept='image/*' />

                           </div>
                        </div>
                     </div>
                   </React.Fragment>

                   <div className='space-y-3'>
                        <TextField
                         fullWidth
                         id='fullname'
                         name='fullname'
                         label='Full Name'
                         value={formik.values.fullname}
                         onChange={formik.handleChange}
                         error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                         helperText={formik.touched.fullname && formik.errors.fullname }
                        />

                        <TextField
                         fullWidth
                         multiline
                         rows={3}
                         id='bio'
                         name='bio'
                         label='Bio'
                         value={formik.values.bio}
                         onChange={formik.handleChange}
                         error={formik.touched.bio && Boolean(formik.errors.bio)}
                         helperText={formik.touched.bio && formik.errors.bio }
                        />

                        <TextField
                         fullWidth
                         id='website'
                         name='website'
                         label='Website'
                         value={formik.values.website}
                         onChange={formik.handleChange}
                         error={formik.touched.website && Boolean(formik.errors.website)}
                         helperText={formik.touched.website && formik.errors.website }
                        />

                        <TextField
                         fullWidth
                         id='location'
                         name='location'
                         label='location'
                         value={formik.values.location}
                         onChange={formik.handleChange}
                         error={formik.touched.location && Boolean(formik.errors.location)}
                         helperText={formik.touched.location && formik.errors.location }
                        />

                        <div className='my-3 text-gray-600'>
                          <p className='text-lg'>Brith Date . Edit</p>
                          <p className='text-xl'>{auth.findUser?.birthDate}</p>
                        </div>
                        <p className='text-lg py-3'>Edit Professional Profile</p>
                   </div>
               </div>
           </form>
        </Box>
      </Modal>
    </div>
  );
}