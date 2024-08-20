import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  showLayout: boolean;
  showCode: boolean;
  defaultAcceptTypes: string[];
  available_media_devices: {
    [key: string]: any;
  };
};

const initialState: InitialStateType = {
  showLayout: true,
  showCode: false,
  defaultAcceptTypes: [],
  available_media_devices: {
      desktop: {
        minResulation: "1024px",
        maxResulation: "1920px",
      },
      laptop: {
        minResulation: "766px",
        maxResulation: "1023px",
      },
      tablet: {
        minResulation: "568px",
        maxResulation: "765px",
      },
      mobile: {
        minResulation: "567px",
        maxResulation: "100px",
      },
    },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleLayout: (state) => {
      state.showLayout = !state.showLayout;
    },
    toggleCode: (state) => {
      state.showCode = !state.showCode;
    },
    toggleTypes: (state, action) => {
      state.defaultAcceptTypes = action.payload;
    },
    toggleDisplaySize : (state, action)=>{
      const {name, value, display} = action.payload;
      state.available_media_devices[display][name] = `${value}px`;
    }
  },
});

export const { toggleLayout, toggleCode, toggleTypes, toggleDisplaySize } = appSlice.actions;

export default appSlice.reducer;
