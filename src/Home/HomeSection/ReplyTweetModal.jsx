import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";


import { useFormik } from "formik";
import { useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { Close, FmdGood, TagFaces } from "@mui/icons-material";

import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { createTweetReply } from "../../Redux/Tweet/Action";
import { timeDifference } from "../../Config/Logics";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";
import { UploadToCloudinary } from "../../Config/UploadCloudinary";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 400, // width for small screens (xs)
    md: 700, // width for screens larger than small (sm and up)
  },
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};


const validationSchema = Yup.object().shape({
    content:Yup.string().required("Reply text is required")
})



export default function ReplyTweetModal({replyItem, open, handleReplyModalClose }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {auth} = useSelector(store=>store);



  const handleSubmit= async (value, action)=>{
    console.log("reply item",replyItem?.id);
   
    setUploadingReplyImage(true);
    const uploadedUrl = await UploadToCloudinary(selectedReplyImage,"image");
    console.log("uploadedUrl = "+uploadedUrl);

    dispatch(createTweetReply({ ...value, "image": uploadedUrl }));

    setUploadingReplyImage(false);
    setSelectedReplyImage(null);
    setSelectedReplyImageUrl("");

    setShowEmojiPicker(false);
    action.resetForm();
    handleReplyModalClose();
  }

   const formik = useFormik({
      initialValues:{
          content:"",
          image:"",
          tweetId:replyItem?.id
      },
      
      enableReinitialize: true,  // Ensures form reinitializes when replyItem changes
      onSubmit:handleSubmit,
      validationSchema
   });



   useEffect(() => {
    if (replyItem) {
      formik.setFieldValue("tweetId", replyItem?.id);
    }
  }, [replyItem]);  // This will run whenever the item changes


   
  const [uploadingReplyImage, setUploadingReplyImage] = useState(false);
  const [selectedReplyImage, setSelectedReplyImage] = useState("");
  const [selectedReplyImageUrl, setSelectedReplyImageUrl] = useState("");

    const handleSelectImage=(e)=>{
      const file = e.target.files[0];

     setUploadingReplyImage(false);
     setSelectedReplyImage(null);
     setSelectedReplyImageUrl("");

      if(file){
        setSelectedReplyImage(file);
        const url =  URL.createObjectURL(file)  // in that way we can create a url without upload 
          setSelectedReplyImageUrl(url);
                  
      }
    }

    const closeReplyImage=()=>{
      setUploadingReplyImage(false);
     setSelectedReplyImage(null);
     setSelectedReplyImageUrl("");

    }


  

   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

   const handleEmojiClick = (event, emojiObject) => {
    const currentContent = formik.values.content || '';  // Safely handle undefined content
    formik.setFieldValue('content', currentContent + event.emoji); // The emoji is in `event.emoji`
  };


  const emojiPickerRef = React.useRef(null);

   
  // close emojipicker when outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);



  return (
    <div>
      <Modal
        open={open && replyItem}
        onClose={handleReplyModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${replyItem?.user?.id}`)}
              className="cursor-pointer"
              alt="username"
              src={replyItem?.user?.image}
            />

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                    <span className="font-semibold">{replyItem?.user?.fullname}</span>
                    <span className="text-gray-600">
                    @{replyItem?.user?.fullname.split(" ").join("_").toLowerCase() }
                    </span>
                  </div>

                  <p>{timeDifference(replyItem?.createdAt)}</p>

                  {true && (
                    <img
                      className="ml-5 w-5 h-5"
                      src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                      alt="verified"
                    />
                  )}
                </div>
              </div>
              <div className="mt-3">
                <div className="cursor-pointer">
                  <p className="mb-2 p-0 text-xl">
                    {replyItem?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          { selectedReplyImageUrl &&
            <div className="mt-5">               
                <div className="relative border-2 p-1 h-[13vh] w-[13vh] rounded-md">
                  <div
                  onClick={closeReplyImage}
                   className="absolute -right-2 -top-4 opacity-90 border-2 rounded-full cursor-pointer">
                  <Close/>
                  </div>

                  <img src={selectedReplyImageUrl} className='h-full w-full  object-cover object-center' alt="post" />
                </div>
            </div>  
          }
          
            <div className="flex space-x-3 mt-6">
                <Avatar
                alt='username'
                src={auth.user?.image}
                />


                <div className='w-full'>
                <form onSubmit={formik.handleSubmit}>

                    <div>
                      <input
                          type='text'
                          name='content'
                          placeholder='Reply...'
                          className='w-full border-none outline-none text-xl bg-transparent'
                          {...formik.getFieldProps("content")}
                      />
                      {formik.errors.content && formik.touched.content && (
                          <p className='text-red-500 py-1'>{formik.errors.content}</p>
                      )}
                    </div>
 
                   

                    <div className='flex justify-between items-center mt-5'>
                        <div className='flex items-center space-x-5 text-[#1d9bf0] cursor-pointer'>
                            <label htmlFor='replyImg' className='cursor-pointer'>
                            <ImageIcon/>
                            </label>
                            <input onChange={handleSelectImage} type='file' id='replyImg' name='img' className='hidden'  />

                            <FmdGood/>
                            <div ref={emojiPickerRef} className="relative">
                              <TagFaces onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                              {showEmojiPicker && (
                                <div className="absolute bottom-36 -left-24 md:left-8 z-50 shadow-2xl">
                                  <EmojiPicker
                                  onEmojiClick={handleEmojiClick}
                                  height={350}
                                  width={300}
                                  />
                                </div>
                              )}
                            </div>
                        </div>

                        <div>

                        <Button
                        disabled={uploadingReplyImage}
                        type='submit' sx={{
                              width:"100%",
                              borderRadius:"19px",
                              paddingY:"8px",
                              paddingX:"20px",
                              color:"white",
                              bgcolor:"#1e88e5"
                          }}>
                             
                            <div className='relative flex  items-center'>
                               {uploadingReplyImage && <div className='pr-2'>
                                <CircularProgress sx={{color:"white"}} size="16px" />
                              </div>}
                              
                              Save
                            </div>

                        </Button>
                        </div>
                    </div>

                </form>
                </div> 
            </div>

        </Box>
      </Modal>
    </div>
  );
}
