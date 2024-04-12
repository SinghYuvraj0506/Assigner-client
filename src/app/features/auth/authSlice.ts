import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState{
    token:string,
    user:{}
}

const initialState = {
    token:"",
    user:{}
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
        userLoggedOut:(state,action) =>{
            state.token = "";
            state.user = {};
        },
    }
})


export const {userRegistration,userLoggedIn,userLoggedOut} = authSlice.actions;