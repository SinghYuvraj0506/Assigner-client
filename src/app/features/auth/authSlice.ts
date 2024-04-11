import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:"",
    user:{}
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userRegistration:(state,action) =>{
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        userLoggedIn:(state,action) =>{
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        userLoggedOut:(state,action) =>{
            state.token = "";
            state.user = {};
        },
    }
})


export const {userRegistration,userLoggedIn,userLoggedOut} = authSlice.actions;