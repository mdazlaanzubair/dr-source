import React, { useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import { FileUploadFormModal, FilesList } from "./components";
import { useSelector } from "react-redux";
import { FloatButton } from "antd";

const ChatPage = () => {
  const [isShowUploadModal, setIsShowUploadModal] = useState(false);
  const { files } = useSelector((state) => state.chat);

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-background px-0 md:px-8">
      <FloatButton
        className="bg-surface text-primary"
        onClick={() => setIsShowUploadModal(true)}
        type="primary"
        tooltip={
          <div className="bg-accent text-primary font-semibold py-1 px-2 rounded-3xl text-xs">
            Upload document
          </div>
        }
        badge={{
          dot: files?.length <= 0,
          count: files?.length,
          color: "red",
          className: "outline-none border-none",
        }}
      />

      <div
        className="group relative w-full lg:w-1/2 flex flex-col items-center justify-center p-5 md:p-8 pb-0 md:pb-0
      bg-surface rounded-lg z-10 backdrop-blur-md bg-opacity-90
      "
      >
        <div className="relative w-full h-14">
          <textarea
            className="block w-full h-14 p-3 pt-[.95rem]
            bg-background text-secondary 
            border border-transparent rounded-lg 
            focus:border-accent focus:text-primary
            focus:outline-none outline-none resize-none
            transition-all ease-in-out duration-300"
            type="text"
            placeholder="What do you want to ask?"
            rows={3}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3
            w-9 h-9 text-sm text-center border
            text-secondary/50
            border-secondary/50 bg-surface 
          hover:bg-accent/20 hover:border-accent hover:text-accent
          rounded-full text-primary transition-all ease-in-out duration-300"
          >
            <IoArrowUp className="font-semibold mx-auto" />
          </button>
        </div>
        <FilesList />
      </div>

      {/* FILE UPLOAD MODAL */}
      <FileUploadFormModal
        visible={isShowUploadModal}
        closeHandler={() => setIsShowUploadModal(false)}
      />
    </div>
  );
};

export default ChatPage;
