import { BusinessCenter, CalendarMonth, KeyboardBackspace, LocationOn } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Button, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TweetCard from '../Home/HomeSection/TweetCard';
import ProfileModal from './ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, followUser } from '../Redux/Auth/Action';
import { getUserCreatedReplies, getUserLikeTweets, getUserTweets } from '../Redux/Tweet/Action';

function Profile() {

  const navigate = useNavigate();

  const handleBack=()=>{
    navigate(-1);
  }



  const [tabValue, setTabValue] = useState('1')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const {profileId} = useParams();
   const {auth, tweet} = useSelector(store=>store);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(profileId){
      dispatch(findUserById(profileId));
      console.log(profileId); 
      console.log("reqUser is",auth.user); 
    }
  },[profileId, auth.user])      // auth.user means if requser updated then call dispatch find user by id



  useEffect(()=>{
    dispatch(getUserTweets(auth.findUser?.id))
    dispatch(getUserLikeTweets(auth.findUser?.id))
    dispatch(getUserCreatedReplies(auth.findUser?.id))
  },[auth.findUser, tweet.likedTweet, tweet.reTweet])



  const handleFollow=()=>{
    dispatch(followUser(auth.findUser?.id));
  }

  return (
    <div>
      <section className='flex items-center sticky top-0 z-50 bg-opacity-80 bg-white w-full'>
         <KeyboardBackspace className='cursor-pointer' onClick={handleBack} />
         <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Profile</h1>
      </section>

      <section>
        <img 
        className='w-full h-[15rem] object-cover'
        src={auth.findUser?.backgroundImage || "https://www.shutterstock.com/image-photo/white-cement-concrete-wall-texture-600nw-1891225786.jpg"} alt="background" />
      </section>

      <section className='pl-6'>
          <div className='flex justify-between items-start mt-5 h-[5rem]'>
             <Avatar
             src={auth.findUser?.image}
             alt='profie'
             className='transform -translate-y-24'
             sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
             />

            { auth.findUser?.reqUser ? <Button onClick={handleModalOpen} variant='outlined' sx={{borderRadius:"20px"}}>
              Edit Pofile
             </Button> : 
              <Button onClick={handleFollow} variant='outlined' sx={{borderRadius:"20px"}}>
              {!auth.findUser?.followed ? "Follow" : "Unfollow"}
             </Button>
             }
          </div>

          <div>
             <div className=' flex items-center'>
               <h1 className='font-bold text-lg'>{auth.findUser?.fullname}</h1>
               { true && <img
                className="ml-5 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt="verified"
              />}
             </div>
             <h1 className="text-gray-500">{auth.findUser?.email}</h1>
          </div>

          <div className='mt-2 space-y-3' >
             <p>
             {auth.findUser?.bio}
             </p>
             <div className='flex py-1 space-x-5'>
                <div className='flex items-center text-gray-500'>
                   <BusinessCenter/>
                   <p className='ml-2'>Education</p>
                </div>

                <div className='flex items-center text-gray-500'>
                   <LocationOn/>
                   <p className='ml-2'>{auth?.findUser?.location || "Location"}</p>
                </div>

                <div className='flex items-center text-gray-500'>
                   <CalendarMonth/>
                   <p className='ml-2'>Joined jun, 2020</p>
                </div>
             </div>

             <div className='flex items-center space-x-5'>
                <div className='flex items-center space-x-1 font-semibold'>
                   <span>{auth.findUser?.followings.length}</span> <span className='text-gray-500'>Followings</span>
                </div>

                <div className='flex items-center space-x-1 font-semibold'>
                   <span>{auth.findUser?.followers.length}</span> <span className='text-gray-500'>Followers</span>
                </div>
             </div>
          </div>

      </section>

      <section className='py-5'>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                  <Tab label="Tweets" value="1" />
                  <Tab label="Liked" value="2" />
                  <Tab label="Replies" value="3" />
                  <Tab label="Media" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
               {tweet.userAllTweets.length>0 && tweet.userAllTweets.map((item,i)=><TweetCard item={item} key={i} />)}

              </TabPanel>

              <TabPanel value="2">
                {tweet.likeTweets.length>0 && tweet.likeTweets.map((item,i)=><TweetCard item={item} key={i} />)}

              </TabPanel>


              <TabPanel value="3">
               
              {tweet.userCreatedReplies.length>0 && tweet.userCreatedReplies.map((item,i)=><TweetCard item={item} key={i} />)}

              </TabPanel>
              <TabPanel value="4">Media</TabPanel>
             
            </TabContext>
          </Box>
      </section>

      <ProfileModal  open={modalOpen} handleModalClose={handleModalClose} />

    </div>
  )
}

export default Profile
