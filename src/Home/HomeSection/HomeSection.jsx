

import { Avatar, Backdrop, Button, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import { FmdGood, TagFaces, VideocamRounded } from '@mui/icons-material';
import TweetCard from './TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet, getAllTweet } from '../../Redux/Tweet/Action';
import { UploadToCloudinary } from '../../Config/UploadCloudinary';
import EmojiPicker from 'emoji-picker-react';

const validationSchema = Yup.object().shape({
  content:Yup.string().required("Tweet text is required")
})

function HomeSection() {

  const dispatch = useDispatch();
  const {tweet,auth} = useSelector(store=>store); 

  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");


  


    const handleSubmit=async (value, action)=>{
      // console.log(value);
 
      setUploadingFile(true);
      const uploadedUrl = await UploadToCloudinary(selectedFile,selectedFileType);
      console.log("uploadedUrl = "+uploadedUrl)
      // await formik.setFieldValue("image",uploadedUrl);
      await formik.setFieldValue(selectedFileType,uploadedUrl);
      // dispatch(createTweet({ ...value, "image": uploadedUrl }));
      dispatch(createTweet({ ...value, [selectedFileType]: uploadedUrl }));

      setUploadingFile(false);
      setSelectedFile(null);
      setSelectedFileType("");
      setSelectedImageUrl("");
      setSelectedVideoUrl("");

      setShowEmojiPicker(false);
      action.resetForm();
    }

     const formik = useFormik({
        initialValues:{
            content:"",
            image:"",
            video:""
        },
        onSubmit:handleSubmit,
        validationSchema
     });


     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
     
     const emojiPickerRef = useRef(null);


     const handleEmojiClick = (event) => {
       const currentContent = formik.values.content || '';  // Safely handle undefined content
       formik.setFieldValue('content', currentContent + event.emoji); // The emoji is in `event.emoji`
     };
     

     const handleFileChange=(e)=>{
         const {name} = e.target;  // like this we can get input tag name
         const file = e.target.files[0];

          setUploadingFile(false);
          setSelectedFile(null);
          setSelectedFileType("");
          setSelectedImageUrl("");
          setSelectedVideoUrl("");

        if(file){
          setSelectedFile(file);
          const url =  URL.createObjectURL(file)  // in that way we can create a url without upload 
           
          if(name=="image"){
            setSelectedImageUrl(url);
            setSelectedFileType("image");
          }else{
            setSelectedVideoUrl(url);
            setSelectedFileType("video");
          }
          
        }
     }


     //  after login or register then no tweet.likedTweet, tweet.reTweet, tweet.tweet states are present then this useEffect will call
      useEffect(()=>{   
        dispatch(getAllTweet())   
      },[])
    
      useEffect(()=>{
        dispatch(getAllTweet())
      },[tweet.likedTweet, tweet.reTweet, tweet.tweet]);

 
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

    <>

    <div className='space-y-5'>
       <section><h1 className='py-5 text-xl font-bold opacity-90'>Home</h1></section>

       <section className='pb-10 border-2 rounded-md p-3'>
           <div className='flex space-x-3'>
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
                    placeholder='what is on your mind...'
                    className=' w-full border-none outline-none text-xl bg-transparent'
                    {...formik.getFieldProps("content")}
                  />
                  {formik.errors.content && formik.touched.content && (
                    <p className='text-red-500 py-1'>{formik.errors.content}</p>
                  )}
                 </div>

                 { selectedImageUrl &&
                 <div className='w-full pt-5'>
                   <img src={selectedImageUrl} className='w-full h-full object-cover object-center' alt="post" />
                 </div> 
                 }

                 { selectedVideoUrl &&
                 <div className='cursor-pointer w-full pt-5 h-[50vh] md:h-[80vh]'>
                    <video src={selectedVideoUrl} controls autoPlay className='w-full h-full object-cover object-center' />
                 </div> 
                 }

                 <div className='flex justify-between items-center mt-5'>
                    <div className='flex items-center space-x-5 text-[#1d9bf0] cursor-pointer'>
                      <label htmlFor='img' className='cursor-pointer'>
                       <ImageIcon/>
                      </label>
                       <input onChange={handleFileChange} accept='image/*' type='file' id='img' name='image' className='hidden'  />

                       <label htmlFor='vid' className='cursor-pointer'>
                       <VideocamRounded/>
                      </label>
                       <input onChange={handleFileChange} accept='video/*' type='file' id='vid' name='video' className='hidden'  />

                       <FmdGood/>
                       <div className="relative">
                          <TagFaces onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                          {showEmojiPicker && (
                            <div ref={emojiPickerRef} className="absolute top-10 -left-36 md:left-8 z-50 shadow-2xl">
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
                       <Button type='submit' sx={{
                        width:"100%",
                        borderRadius:"19px",
                        paddingY:"8px",
                        paddingX:"20px",
                        color:"white",
                        bgcolor:"#1e88e5"
                       }} >
                        Tweet
                       </Button>
                    </div>
                 </div>

               </form>
             </div>
           </div>
       </section>

       {tweet.tweets.length>0 && tweet.tweets.map((item,i)=><TweetCard key={i} item={item}/>)}

    </div>

    <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={uploadingFile}
    >
    <CircularProgress color="inherit" />
    </Backdrop>

    </>
  )
}

export default HomeSection


