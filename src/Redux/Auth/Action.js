import axios from "axios"

import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./ActionType";
import { API_BASE_URL } from "../../Config/Api";

import { api } from "../../Config/Api";
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_REQUEST, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType";


export const registerUser=(registerData)=> async(dispatch)=>{
    dispatch({type:REGISTER_USER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData)

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:REGISTER_USER_SUCCESS, payload:data})
        }
    } catch (error) {
        console.log(error);
        dispatch({type:REGISTER_USER_FAILURE, payload:error.message})
    }
}


export const loginUser=(loginData)=> async(dispatch)=>{
    dispatch({type:LOGIN_USER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData)

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:LOGIN_USER_SUCCESS, payload:data})
        }
    } catch (error) {
        console.log(error);
        dispatch({type:LOGIN_USER_FAILURE, payload:error.message})
    }
}



export const getUser=(jwt)=>async(dispatchEvent)=>{
    try {
        const {data}=await axios.get(`${API_BASE_URL}/api/user/profile`,
           { headers:{
                "Authorization":`Bearer ${jwt}`
            }}
        );
        dispatchEvent({type:GET_USER_SUCCESS,payload:data});
   
    } catch (error) {
        console.log(error);
        dispatchEvent({type:GET_USER_FAILURE,payload:error.message});
    }
}


export const logout=()=>(dispatch)=>{
    dispatch({type:LOGOUT_USER_REQUEST})
   localStorage.removeItem("jwt");
   dispatch({type:LOGOUT_USER_SUCCESS})
}







export const findUserById=(userId)=>async (dispatch)=>{
    dispatch({type:FIND_USER_BY_ID_REQUEST});
    try {
        const {data} = await api.get(`/api/user/${userId}`)
        dispatch({type:FIND_USER_BY_ID_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:FIND_USER_BY_ID_FAILURE,payload:error.message})
    }
}

export const updateUserProfile=(reqData)=>async (dispatch)=>{
    dispatch({type:UPDATE_USER_REQUEST});
    try {
        const {data} = await api.put("/api/user/update", reqData)
        dispatch({type:UPDATE_USER_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:UPDATE_USER_FAILURE,payload:error.message})
    }
}

export const followUser=(userId)=>async (dispatch)=>{
    dispatch({type:FOLLOW_USER_REQUEST});
    try {
        const {data} = await api.put(`/api/user/${userId}/follow`)
        dispatch({type:FOLLOW_USER_SUCCESS,payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({type:FOLLOW_USER_FAILURE,payload:error.message})
    }
}



