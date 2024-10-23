import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_REQUEST, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_SUCCESS, GET_USER_ALL_TWEETS_FAILURE, GET_USER_ALL_TWEETS_REQUEST, GET_USER_ALL_TWEETS_SUCCESS, GET_USER_CREATED_REPLIES_FAILURE, GET_USER_CREATED_REPLIES_REQUEST, GET_USER_CREATED_REPLIES_SUCCESS, GET_USER_LIKE_TWEETS_FAILURE, GET_USER_LIKE_TWEETS_REQUEST, GET_USER_LIKE_TWEETS_SUCCESS, GET_USET_ALL_TWEETS_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_REQUEST, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_REQUEST, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_REQUEST, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_REQUEST, TWEET_DELETE_SUCCESS } from "./ActionType"

const initialState = {
    data:null,
    loading:false,
    error:null,
    tweets:[],
    tweet:null,
    userAllTweets:[],
    likeTweets:[],
    userCreatedReplies:[],
    likedTweet:null,
    reTweet:null
}

export const tweetReducer = (state=initialState,action)=>{
    
    switch(action.type){
        case TWEET_CREATE_REQUEST:
        case TWEET_DELETE_REQUEST:
        case LIKE_TWEET_REQUEST:
        case REPLY_TWEET_REQUEST:
        case RETWEET_REQUEST:
        case GET_ALL_TWEETS_REQUEST:
        case GET_USER_LIKE_TWEETS_REQUEST:
        case GET_USER_ALL_TWEETS_REQUEST:
        case GET_USER_CREATED_REPLIES_REQUEST:
        case FIND_TWEET_BY_ID_REQUEST:
            return {...state,loading:true,error:null} 
            
            case TWEET_CREATE_SUCCESS:
                console.log(action.payload);
               return({...state,
                loading:false,
                tweet:action.payload,
                tweets:[action.payload,...state.tweets]
            })

            case GET_USER_ALL_TWEETS_SUCCESS:
                console.log(action.payload);
                return {...state, loading:false,error:null,userAllTweets:action.payload }   
           
            case GET_USER_LIKE_TWEETS_SUCCESS: 
                return {...state, loading:false,error:null,likeTweets:action.payload } 

            case GET_USER_CREATED_REPLIES_SUCCESS:
                console.log(action.payload);
                return {...state, loading:false,error:null,userCreatedReplies:action.payload }    
        

            case GET_ALL_TWEETS_SUCCESS:
                console.log(action.payload);
                return {...state, loading:false,error:null,tweets:action.payload }    


            case LIKE_TWEET_SUCCESS: 
            return {...state, loading:false,error:null,likedTweet:action.payload }   
            
            case TWEET_DELETE_SUCCESS: 
                return {...state,
                     loading:false,
                     error:null,
                     tweets:state.tweets.filter((tweet)=>tweet.id!==action.payload) } 

            case RETWEET_SUCCESS:
                return {...state,
                    loading:false,
                    error:null,
                    reTweet:action.payload
                 }    
                 
            case FIND_TWEET_BY_ID_SUCCESS:
            case REPLY_TWEET_SUCCESS:
                console.log(action.payload);
            return {...state,
                loading:false,
                error:null,
                tweet:action.payload
            }  
            
            case TWEET_CREATE_FAILURE:
            case TWEET_DELETE_FAILURE:
            case LIKE_TWEET_FAILURE:
            case REPLY_TWEET_FAILURE:
            case RETWEET_FAILURE:
            case GET_ALL_TWEETS_FAILURE:
            case GET_USER_LIKE_TWEETS_FAILURE:
            case GET_USER_ALL_TWEETS_FAILURE:
            case GET_USER_CREATED_REPLIES_FAILURE:    
            case FIND_TWEET_BY_ID_FAILURE:
                return {...state,loading:false,error:action.payload}    

        default: return state;      
    }

}

