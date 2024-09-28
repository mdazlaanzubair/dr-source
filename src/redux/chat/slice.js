import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  selectedFile: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setSingleFile: (state, action) => {
      state.files = [action.payload, ...state.files];
    },

    setFiles: (state, action) => {
      state.files = action.payload;
    },

    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },

    deleteFile: (state, action) => {
      const filteredFiles = state.files?.filter(
        ({ id: file_id }) => file_id !== action.payload
      );
      state.files = [...filteredFiles];
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: chatActions, reducer: chatReducer } = chatSlice;

export { chatActions, chatReducer };
