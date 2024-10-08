// ================================================
// REDUX ACTIONS TO UPDATE DATABASE AND LOCAL STATE
// ================================================

import { chatActions as actions } from "./slice";
import { notify } from "../../utils/notify";
import supabase from "../../supabase";
import axios from "axios";
import { appEnv } from "../../utils/exportEnv";
import { pagesMerger } from "../../utils/pagesMerger";

// BASE URL FOR BACKEND API
const base_url = appEnv.llm_api_url;

// REDUX ACTION TO GET ALL USER FILES FROM SUPABASE
export const getFilesRecord = (userId, onFailure) => async (dispatch) => {
  // TOGGLING QUERIES LOADER
  dispatch(actions.toggleFilesLoading(true));

  try {
    // GETTING DATA FROM THE TABLE
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setFiles(data));
    dispatch(actions.selectFile(data[0]));

    // TOGGLING QUERIES LOADER
    dispatch(actions.toggleFilesLoading(false));

    return;
  } catch ({ error, message }) {
    onFailure && onFailure();
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE THE UPLOADED FILE DATA TO SUPABASE
export const saveFileRecord =
  (body, successCallback, onFailure) => async (dispatch) => {
    try {
      // SAVING DATA TO THE TABLE
      const { data, error } = await supabase
        .from("files")
        .insert(body)
        .select();

      if (error) throw error;

      // UPDATING REDUX STATE
      dispatch(actions.setSingleFile(data[0]));
      dispatch(actions.selectFile(data[0]));

      successCallback && successCallback();
      return;
    } catch ({ error, message }) {
      onFailure && onFailure();
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE THE UPLOADED FILE DATA FROM SUPABASE
export const deleteFile = (file_id, callback) => async (dispatch) => {
  try {
    // ELSE SAVE UPLOADED RESUME DATA TO SUPABASE
    // SAVING RESUME DATA TO THE TABLE
    const { error } = await supabase.from("files").delete().eq("id", file_id);

    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.deleteFile(file_id));

    notify("success", "File deleted successfully");
    callback && callback();
    return;
  } catch ({ error, message }) {
    callback && callback();
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// MAKING API CALL TO GENERATE VECTOR EMBEDDINGS OF THE UPLOADED PDF DOCUMENT
export const generatingVectors = async (formData, onSuccess, onFailure) => {
  try {
    // MAKING API CALL TO CONVERT PDF TEXT INTO VECTORS CONTEXT
    const res = await axios.post(`${base_url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { title, slug } = res.data;

    onSuccess && onSuccess(title, slug);
  } catch ({ error, message }) {
    onFailure && onFailure("failed");
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// MAKING API CALL TO GET ANSWER OF THE QUESTION FROM PDF DOCUMENT
export const getAnswer = (body, onSuccess, onFailure) => async (dispatch) => {
  try {
    const { question, name_space, file_id, user_id } = body;

    // MAKING API CALL TO CONVERT PDF TEXT INTO VECTORS CONTEXT
    const res = await axios.post(`${base_url}/query`, {
      question,
      name_space,
    });
    const { success, context_source, ai_response } = res.data;

    if (success) {
      const context = pagesMerger(context_source);

      // SAVING QUERIES DATA TO THE TABLE
      const { data, error } = await supabase
        .from("queries")
        .upsert({
          question,
          file_id,
          user_id,
          context,
          answer: ai_response
            ? `${ai_response}`
            : "Nothing found relevant with the query in the selected document.",
        })
        .select();

      if (error) throw error;

      // UPDATING REDUX STATE
      dispatch(actions.setSingleQuery(data[0]));

      onSuccess && onSuccess();
    }
    onFailure && onFailure();
  } catch ({ error, message }) {
    onFailure && onFailure();
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET ALL USER QUERIES FROM SUPABASE
export const getQueriesRecord = (userId, onFailure) => async (dispatch) => {
  // TOGGLING QUERIES LOADER
  dispatch(actions.toggleQueriesLoading(true));

  try {
    // GETTING DATA FROM THE TABLE
    const { data, error } = await supabase
      .from("queries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setQueries(data));

    // TOGGLING QUERIES LOADER
    dispatch(actions.toggleQueriesLoading(false));

    return;
  } catch ({ error, message }) {
    onFailure && onFailure();
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO DELETE THE QUERIES DATA FROM SUPABASE
export const deleteQuery = (query_id, callback) => async (dispatch) => {
  try {
    // ELSE SAVE UPLOADED RESUME DATA TO SUPABASE
    // SAVING RESUME DATA TO THE TABLE
    const { error } = await supabase.from("queries").delete().eq("id", query_id);

    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.deleteQuery(query_id));

    notify("success", "Query deleted successfully");
    callback && callback();
    return;
  } catch ({ error, message }) {
    callback && callback();
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};