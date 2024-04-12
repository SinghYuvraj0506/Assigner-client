import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface GeneralStateInterface {
    openAuthModal: boolean;
    modalType: "SignUp" | "Login" | "Verification" | undefined;
}

const initialState:GeneralStateInterface = {
    openAuthModal:false,
    modalType:"Login",
}

export const generalSlice = createSlice({
    name:"general",
    initialState,
    reducers:{
        ChangeAuthModalStatus:(state, action: PayloadAction<{ value: boolean, type?: "SignUp" | "Login" | "Verification" }>) => {
            state.openAuthModal = action.payload.value,
            state.modalType = action.payload.type
        }
    }
})


export const {ChangeAuthModalStatus} = generalSlice.actions;