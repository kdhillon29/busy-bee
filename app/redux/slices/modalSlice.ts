import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
};

const modalslice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
  },
});

export const { openSignUpModal, closeSignUpModal } = modalslice.actions;

export default modalslice.reducer;
