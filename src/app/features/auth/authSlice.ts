import { AuthState, User } from "@/lib/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState:AuthState = {
    token:"",
    user: null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userRegistration:(state,action:PayloadAction<{token:string}>) =>{
            state.token = action.payload.token;
        },
        userLoggedIn:(state,action:PayloadAction<{accessToken:string,user:User}>) =>{
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