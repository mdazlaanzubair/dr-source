import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  queries: [],
  api_key: null,
  selectedFile: null,
  fileEmbeddingTime: 0,
  queryResponseTime: 0,
  selectedFile: null,
  isLoadingQueries: false,
  isLoadingFiles: false,
  isLoadingAPIKey: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    toggleFilesLoading: (state, action) => {
      state.isLoadingFiles = action.payload;
    },

    toggleAPIKeyLoading: (state, action) => {
      state.isLoadingAPIKey = action.payload;
    },

    // SETTER FOR API KEY
    setAPIKey: (state, action) => {
      state.api_key = action.payload;
    },

    // SETTER FOR RESPONSE TIME
    setTime: (state, action) => {
      if (action.payload.type == "file") {
        state.queryResponseTime = 0;
        state.fileEmbeddingTime = action.payload.time;
        setTimeout(() => (state.fileEmbeddingTime = 0), 3000); // RESETTING TIMER
      } else {
        state.fileEmbeddingTime = 0;
        state.queryResponseTime = action.payload.time;
        setTimeout(() => (state.queryResponseTime = 0), 3000); // RESETTING TIMER
      }
    },

    setSingleFile: (state, action) => {
      // CHECKING IF THE FILE ALREADY EXISTS IN THE STATE
      const filteredFiles = state.files?.filter(
        ({ id: file_id }) => file_id !== action.payload.id
      );

      if (filteredFiles?.length <= 0) {
        state.files = [action.payload, ...state.files];
      }
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

      // RESETTING FILES STATE
      state.files = [...filteredFiles];

      // UPDATING THE SELECTED FILE
      state.selectedFile = filteredFiles?.length ? filteredFiles[0] : null;

      // DELETING FILE RELATED QUERIES
      const filteredQueries = state.queries?.filter(
        ({ file_id }) => file_id !== action.payload
      );

      // RESETTING QUERIES OF FILES
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
