import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  queries: [],
  selectedFile: null,
  isLoadingQueries: false,
  isLoadingFiles: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    toggleFilesLoading: (state, action) => {
      state.isLoadingFiles = action.payload;
    },

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

    toggleQueriesLoading: (state, action) => {
      state.isLoadingQueries = action.payload;
    },

    setSingleQuery: (state, action) => {
      state.queries = [action.payload, ...state.queries];
    },

    setQueries: (state, action) => {
      state.queries = action.payload;
    },

    deleteQuery: (state, action) => {
      // DELETING QUERY
      const filteredQueries = state.queries?.filter(
        ({ id: query_id }) => query_id !== action.payload
      );

      state.queries = [...filteredQueries];
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: chatActions, reducer: chatReducer } = chatSlice;

export { chatActions, chatReducer };
