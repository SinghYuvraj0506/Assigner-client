import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GeneralStateInterface {
  openModal: boolean;
  modalType: "SignUp"
    | "Login"
    | "Verification"
    | "SuccessCreation"
    | undefined;
}

const initialState: GeneralStateInterface = {
  openModal: false,
  modalType: undefined,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    ChangeModalStatus: (
      state,
      action: PayloadAction<{
        value: boolean;
        type?:
          | "SignUp"
          | "Login"
          | "Verification"
          | "SuccessCreation"
          | undefined;
      }>
    ) => {
      if (action.payload.type) {
        state.modalType = action.payload.type;
      }
      state.openModal = action.payload.value;
    },
  },
});

export const { ChangeModalStatus } = generalSlice.actions;
