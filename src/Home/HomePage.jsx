import { Grid } from '@mui/material'
import React from 'react'
import Navigation from '../Navigation/Navigation'
import HomeSection from './HomeSection/HomeSection'
import HomeRight from '../HomeRight/HomeRight'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import TweetDetails from './HomeSection/TweetDetails'

function HomePage() {
  return (
   <Grid container className='px-5 lg:px-28 justify-between'>
       <Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative'>
          <Navigation/>
       </Grid>

       <Grid item xs={12} lg={6} className='w-full relative' >
           <Routes>
              <Route path='/' element={<HomeSection/>} />
              <Route path='/profile/:profileId' element={<Profile/>} />
              <Route path='/tweet/:tweetId' element={<TweetDetails/>} />
           </Routes>
          
       </Grid>

       <Grid item xs={0} lg={3} className='pl-5 lg:pl-10 hidden lg:block w-full relative'>
          <HomeRight/>
       </Grid>
   </Grid>
  )
}

export default HomePage
