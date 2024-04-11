import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openAuthModal:false,
    ModalType:"",
}

export const generalSlice = createSlice({
    name:"general",
    initialState,
    reducers:{
        ChangeAuthModalStatus:(state,action) => {
            state.openAuthModal = action.payload.value,
            state.ModalType = action.payload.type
        }
    }
})


export const {ChangeAuthModalStatus} = generalSlice.actions;