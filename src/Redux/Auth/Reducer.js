import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_REQUEST, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType"

const initialState = {
    user:null,    // here user is reqUser
    loading:false,
    error:null,
    jwt:null,
    findUser:null     // findUser and user is can be different
}

export const authReducer = (state=initialState,action)=>{
    
    switch(action.type){
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_REQUEST:
        case FIND_USER_BY_ID_REQUEST:
        case UPDATE_USER_REQUEST:
        case FOLLOW_USER_REQUEST:      
            return {...state,loading:true} 
            
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            console.log(action.payload)
            return {...state,loading:false, jwt:action.payload.jwt, error:null} 

        case GET_USER_SUCCESS:
            console.log("get user success :",action.payload);
            return {...state,loading:false, error:null,user:action.payload}  

        case FIND_USER_BY_ID_SUCCESS:
            console.log("FIND_USER_BY_ID_SUCCESS" , action.payload)
            return {...state,loading:false, error:null,findUser:action.payload}

        case UPDATE_USER_SUCCESS:
            console.log(action.payload)
            return {...state,loading:false, error:null,user:action.payload}    

        case FOLLOW_USER_SUCCESS:
            console.log(action.payload)
            return {...state,loading:false, error:null,user:action.payload}    
            
        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case GET_USER_FAILURE:
        case FIND_USER_BY_ID_FAILURE:
        case UPDATE_USER_FAILURE:
        case FOLLOW_USER_FAILURE: 
                return {...state,loading:false,error:action.payload}    
                
        case LOGOUT_USER_SUCCESS:
            return initialState;        

        default: return state;      
    }

}

  

