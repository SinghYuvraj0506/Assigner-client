import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User{
    _id:string,
    fullName:string,
    email:string,
    status:0|1,
    isVerified:true,
    phone:number,
    institute:{
        _id:string,name:string
    },
    location:{latitude:number,longitude:number}
}

export interface AuthState{
    token:string,
    user:null | User
}

const initialState = {
    token:"",
    user:null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userRegistration:(state,action:PayloadAction<{token:string}>) =>{
            state.token = action.payload.token;
        },
        userLoggedIn:(state,action:PayloadAction<{accessToken:string,user:{}}>) =>{
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut:(state) =>{
            state.token = "";
            state.user = null;
        },
    }
})


export const {userRegistration,userLoggedIn,userLoggedOut} = authSlice.actions;