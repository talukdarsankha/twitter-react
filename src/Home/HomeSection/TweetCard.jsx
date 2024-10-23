import React from "react";

import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BarChart, ChatBubbleOutlineOutlined, Favorite, FavoriteBorder, FileUpload, MoreHoriz } from "@mui/icons-material";
import ReplyTweetModal from "./ReplyTweetModal";
import { useDispatch, useSelector } from "react-redux";
import { createReTweet, deleteTweet, likeTweet } from "../../Redux/Tweet/Action";
import { timeDifference } from "../../Config/Logics";
import { useState } from "react";

function TweetCard({item}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log("handleDelete...");
    dispatch(deleteTweet(item?.id))
    handleClose();
  };

  const handleLike = ()=>{
    dispatch(likeTweet(item?.id))
  }

  const handleRetweet = ()=>{
    dispatch(createReTweet(item?.id))
  }



  const [currentTweet, setCurrentTweet] = useState(null);

  const [openReplyModal, setOpenReplyModal] = React.useState(false);

  const handleOpenReplyModal = (tweet) => {
      setCurrentTweet(tweet);  // Update the selected tweet
      setOpenReplyModal(true);    // Open the modal
    };

  const handleCloseReplyModal = () => {
    setCurrentTweet(null);   // Clear the selected tweet on modal close
    setOpenReplyModal(false);
  };


  return (
    <div className="w-full  rounded-md">
      {item?.retwit && <div className='flex items-center font-semibold text-gray-700 py-3 border-b-2 mb-2'>
          <RepeatIcon/>
          <p>You Retweeted</p>
       </div>}

      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          className="cursor-pointer"
          alt="username"
          src={item?.user?.image}
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <span className="font-semibold">{item?.user?.fullname}</span>
              <span className="text-gray-600">@{item?.user?.fullname.split(" ").join("_").toLowerCase() } </span>
              </div>

             

               <img
                className="ml-5 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt="verified"
              />

              <p>
                {timeDifference(item?.createdAt)} 
              </p>
            </div>

            <div>
              <MoreHoriz
                className="cursor-pointer"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />

              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {item?.user?.reqUser ? 
                  <>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  <MenuItem onClick={()=>navigate(`/tweet/${item?.id}`)}>Details</MenuItem>
                  </> :
                 (<MenuItem onClick={()=>navigate(`/tweet/${item?.id}`)}>Details</MenuItem>)
                }
              </Menu>
            </div>
          </div>
          <div className="mt-3">
            <div className="cursor-pointer" >
              <p className="mb-2 p-0 text-xl" onClick={()=>navigate(`/tweet/${item?.id}`)}>
                   {item?.content}
              </p>
              { item?.image && <img onClick={()=>navigate(`/tweet/${item?.id}`)}
                className="w-full border-gray-300 border p-2 rounded-md"
                src={item?.image}
                alt="tweetimg"
              />}

              { item?.video && <video
                className="cursor-pointer w-full h-[50vh] object-cover object-center border-gray-300 border p-2 rounded-md"
                src={item?.video}
                controls
              />}

                {/* <div className='w-full pt-5 h-[50vh] md:h-[80vh]'>
                    <video src={selectedVideoUrl} controls className='w-full h-full object-cover object-center' />
                 </div>  */}
            </div>

            <div className="py-5 flex flex-wrap justify-around items-center cursor-pointer">
              <div className="space-x-3 flex items-center text-gray-600">
                <IconButton>
                  <ChatBubbleOutlineOutlined onClick={()=>handleOpenReplyModal(item)} />
                  </IconButton>
                <p>{item?.totalReplies}</p>
              </div>

              <div className="space-x-3 flex items-center">
                <IconButton onClick={handleLike} sx={{color:"red"}}>
                {item?.liked ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
                <p>{item?.totalLikes}</p>
              </div>

              <div 
               onClick={handleRetweet}
              className="text-gray-600 space-x-3 flex items-center">
                <IconButton>
                <RepeatIcon/>
                </IconButton>
                <p>{item?.totalRetweets}</p>
              </div>

              <div className="text-gray-600 space-x-3 flex items-center">
                <IconButton>
                  <BarChart/>
                </IconButton>
                <p>45</p>
              </div>

              <div className="text-gray-600 flex items-center">
                <IconButton>
                <FileUpload/>
                </IconButton>
              </div>

            </div>
          </div>
        </div>
      </div>

      <ReplyTweetModal replyItem={currentTweet} open={openReplyModal} handleReplyModalClose={handleCloseReplyModal}/>
    </div>
  );
}

export default TweetCard;
