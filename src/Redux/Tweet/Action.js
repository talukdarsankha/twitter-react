import { api } from "../../Config/Api";
import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_REQUEST, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_SUCCESS, GET_USER_ALL_TWEETS_FAILURE, GET_USER_ALL_TWEETS_REQUEST, GET_USER_ALL_TWEETS_SUCCESS, GET_USER_CREATED_REPLIES_FAILURE, GET_USER_CREATED_REPLIES_REQUEST, GET_USER_CREATED_REPLIES_SUCCESS, GET_USER_LIKE_TWEETS_FAILURE, GET_USER_LIKE_TWEETS_REQUEST, GET_USER_LIKE_TWEETS_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_REQUEST, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_REQUEST, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_REQUEST, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_REQUEST, TWEET_DELETE_SUCCESS } from "./ActionType"


export const getAllTweet=()=>async (dispatch)=>{
    dispatch({type:GET_ALL_TWEETS_REQUEST});
    try {
        const {data} = await api.get("/api/tweets/")
        dispatch({type:GET_ALL_TWEETS_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:GET_ALL_TWEETS_FAILURE,payload:error.message})
    }
}

export const getUserTweets=(userId)=>async (dispatch)=>{
    dispatch({type:GET_USER_ALL_TWEETS_REQUEST});
    try {
        const {data} = await api.get(`/api/tweets/user/${userId}`)
        dispatch({type:GET_USER_ALL_TWEETS_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:GET_USER_ALL_TWEETS_FAILURE,payload:error.message})
    }
}

export const getUserLikeTweets=(userId)=>async (dispatch)=>{
    dispatch({type:GET_USER_LIKE_TWEETS_REQUEST});
    try {
        const {data} = await api.get(`/api/tweets/user/${userId}/likes`)
        dispatch({type:GET_USER_LIKE_TWEETS_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:GET_USER_LIKE_TWEETS_FAILURE,payload:error.message})
    }
}

export const getUserCreatedReplies=(userId)=>async (dispatch)=>{
    dispatch({type:GET_USER_CREATED_REPLIES_REQUEST});
    try {
        const {data} = await api.get(`/api/tweets/user/${userId}/reply`)
        dispatch({type:GET_USER_CREATED_REPLIES_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:GET_USER_CREATED_REPLIES_FAILURE,payload:error.message})
    }
}

export const getTweetsByid=(tweetId)=>async (dispatch)=>{
    dispatch({type:FIND_TWEET_BY_ID_REQUEST});
    try {
        const {data} = await api.get(`/api/tweets/${tweetId}`)
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:FIND_TWEET_BY_ID_FAILURE,payload:error.message})
    }
}

export const createTweet=(tweetData)=>async (dispatch)=>{
    dispatch({type:TWEET_CREATE_REQUEST});
    try {
        const {data} = await api.post("/api/tweets/create",tweetData)
        dispatch({type:TWEET_CREATE_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:TWEET_CREATE_FAILURE,payload:error.message})
    }
}

export const createTweetReply=(replyData)=>async (dispatch)=>{
    dispatch({type:REPLY_TWEET_REQUEST});
    try {
        const {data} = await api.post("/api/tweets/reply",replyData)
        dispatch({type:REPLY_TWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:REPLY_TWEET_FAILURE,payload:error.message})
    }
}

export const createReTweet=(tweetId)=>async (dispatch)=>{
    dispatch({type:RETWEET_REQUEST});
    try {
        const {data} = await api.put(`/api/tweets/${tweetId}/reTweet`)
        dispatch({type:RETWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:RETWEET_FAILURE,payload:error.message})
    }
}

export const likeTweet=(tweetId)=>async (dispatch)=>{
    dispatch({type:LIKE_TWEET_REQUEST});
    try {
        const {data} = await api.post(`/api/${tweetId}/like`)
        dispatch({type:LIKE_TWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:LIKE_TWEET_FAILURE,payload:error.message})
    }
}

export const deleteTweet=(tweetId)=>async (dispatch)=>{
    dispatch({type:TWEET_DELETE_REQUEST});
    try {
        const {data} = await api.delete(`/api/tweets/${tweetId}`)
        dispatch({type:TWEET_DELETE_SUCCESS,payload:tweetId})
    } catch (error) {
        console.log(error.message);
        dispatch({type:TWEET_DELETE_FAILURE,payload:error.message})
    }
}



