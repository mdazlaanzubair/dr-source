// ================================================
// REDUX ACTIONS TO UPDATE DATABASE AND LOCAL STATE
// ================================================

import { chatActions as actions } from "./slice";
import { notify } from "../../utils/notify";
import supabase from "../../supabase";
import axios from "axios";
import { appEnv } from "../../utils/exportEnv";

// BASE URL FOR BACKEND API
const base_url = appEnv.llm_api_url;

// REDUX ACTION TO GET ALL USER FILES FROM SUPABASE
export const getFilesRecord = (userId, onFailure) => async (dispatch) => {
  try {
    // GETTING DATA FROM THE TABLE
    const { data, error: resumeError } = await supabase
      .from("files")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (resumeError) throw resumeError;

    // UPDATING REDUX STATE
    dispatch(actions.setFiles(data));
    dispatch(actions.selectFile(data[0]));

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
      const { data, error: resumeError } = await supabase
        .from("files")
        .insert(body)
        .select();

      if (resumeError) throw resumeError;

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
    const { error: resumeError } = await supabase
      .from("files")
      .delete()
      .eq("id", file_id);

    if (resumeError) throw resumeError;

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
export const generatingVectors = async (body, onSuccess, onFailure) => {
  try {
    // MAKING API CALL TO CONVERT PDF TEXT INTO VECTORS CONTEXT
    await axios.post(`${base_url}/text-to-vec`, body);

    onSuccess && onSuccess();
  } catch ({ error, message }) {
    onFailure && onFailure("failed");
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};
