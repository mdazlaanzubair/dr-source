import React, { useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import FilesList from "../files-list";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { getAnswer } from "../../../../redux/chat/actions";
import { notify } from "../../../../utils/notify";

const QueryForm = ({ isDisabled }) => {
  const dispatch = useDispatch();
  const { selectedFile, api_key } = useSelector((state) => state.chat);
  const { user } = useUser();

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // FUNCTION TO MAKE API CALL FOR QUERY THE LLM
  const handleQuerySubmit = async () => {
    if (query?.length <= 15) {
      message.error("Your question must have at least 4 to 5 words.");
      return;
    }

    if (!selectedFile || Object.entries(selectedFile)?.length <= 0) {
      message.error("Queries can not be processed without file.");
      return;
    }

    if (query?.length && selectedFile) {
      // TOGGLING LOADING
      setIsLoading(true);

      // PREPARING REQ BODY
      const reqBody = {
        question: query,
    // remove non-ASCII characters from string
        name_space: `${user?.id}-${selectedFile?.slug}`?.replace(
          /[^\x00-\x7F]+/g,
          ""
        ),
        user_id: user?.id,
        file_id: selectedFile?.id,
      };

      const onFailure = () => setIsLoading(false);
      const onSuccess = () => {
        setIsLoading(false);
        setQuery("");
        notify("success", "Response received");
      };
      dispatch(getAnswer(reqBody, onSuccess, onFailure));
    }
  };

  return (
    <div className="group relative w-full flex flex-col items-center justify-center">
      <div className="relative w-full h-14">
        <textarea
          disabled={isLoading || isDisabled}
          readOnly={isLoading || isDisabled}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="block w-full h-14 p-3 pt-[.95rem]
        bg-background text-secondary overflow-y-auto no-scrollbar
        border border-transparent rounded-lg 
        focus:border-accent focus:text-primary
        focus:outline-none outline-none resize-none
        transition-all ease-in-out duration-500"
          type="text"
          placeholder={
            isDisabled
              ? "Configure API Key to proceed further."
              : "What do you want to ask?"
          }
          rows={3}
        />
        <button
          disabled={isLoading || isDisabled}
          onClick={handleQuerySubmit}
          className="absolute top-1/2 -translate-y-1/2 right-3
        w-9 h-9 text-sm text-center border
        text-secondary/50 border-secondary/50 bg-surface 
      hover:bg-accent/20 hover:border-accent hover:text-accent
      rounded-lg text-primary transition-all ease-in-out duration-500"
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin mx-auto" />
          ) : (
            <IoArrowUp className="font-semibold mx-auto" />
          )}
        </button>
      </div>
      <FilesList />
    </div>
  );
};

export default QueryForm;
