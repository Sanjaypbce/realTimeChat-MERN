import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import themeSlice from "./Slice/themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeSlice,
  },
});

export default store;
