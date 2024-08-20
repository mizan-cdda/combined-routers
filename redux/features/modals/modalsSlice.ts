import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  refValue: null,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.open = action.payload;
    },
    setModalRef: (state, action) => {
      state.refValue = action.payload;
    },
  },
});

export const { setModalOpen, setModalRef } = modalsSlice.actions;

export default modalsSlice.reducer;
