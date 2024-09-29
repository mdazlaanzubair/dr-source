import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  queries: [],
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
      // DELETING FILE
      const filteredFiles = state.files?.filter(
        ({ id: file_id }) => file_id !== action.payload
      );

      state.files = [...filteredFiles];

      // DELETING FILE RELATED QUERIES
      const filteredQueries = state.queries?.filter(
        ({ file_id }) => file_id !== action.payload
      );

      state.queries = [...filteredQueries];
    },

    setSingleQuery: (state, action) => {
      state.queries = [action.payload, ...state.queries];
    },

    setQueries: (state, action) => {
      state.queries = action.payload;
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: chatActions, reducer: chatReducer } = chatSlice;

export { chatActions, chatReducer };
