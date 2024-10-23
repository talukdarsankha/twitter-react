import { KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TweetCard from './TweetCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetsByid } from '../../Redux/Tweet/Action';

function TweetDetails() {

    const navigate = useNavigate();

    const handleBack=()=>{
      navigate(-1);
    }
     
    const dispatch = useDispatch();
    const {tweet} = useSelector(store=>store);

    const {tweetId} = useParams();

    useEffect(()=>{
      if(tweetId){
        dispatch(getTweetsByid(tweetId))
      }
    },[tweetId])

    useEffect(()=>{
      dispatch(getTweetsByid(tweetId))
    },[tweet.likedTweet,tweet.reTweet])

  return (
    <React.Fragment>
      <section className='flex items-center sticky top-0 z-50 bg-opacity-80 bg-white w-full'>
         <KeyboardBackspace className='cursor-pointer' onClick={handleBack} />
         <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Tweet</h1>
      </section>

        <section>
          <TweetCard item={tweet.tweet}/>
          <Divider sx={{margin:"2rem 0rem"}}/>
        </section>

        <section className='pl-7'>
          {tweet.tweet?.replyTweets.length>0 && tweet.tweet?.replyTweets.map((item,i)=><TweetCard key={i} item={item}/>)}
        </section>
    </React.Fragment>
  )
}

export default TweetDetails
