import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./chat/slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
