import React, { useLayoutEffect, useState } from "react";
import { TbTrashFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, getFilesRecord } from "../../../../redux/chat/actions";
import { useUser } from "@clerk/clerk-react";
import { chatActions } from "../../../../redux/chat/slice";
import { Spin, Tooltip } from "antd";

const FilesList = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const { files, selectedFile } = useSelector((state) => state.chat);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (user?.id && files?.length <= 0) {
      dispatch(getFilesRecord(user?.id));
    }
  }, [user]);

  const handleDeleteFile = (file_id) => {
    setIsLoading(true);
    const callback = setIsLoading(false);
    dispatch(deleteFile(file_id, callback));
  };

  return (
    <div className="w-full flex flex-wrap items-center gap-3 min-h-5 md:min-h-8 py-3">
      {files.map((file) => (
        <div
          className={`flex items-center justify-between gap-3
          text-xs py-1 px-2 lg:text-sm lg:py-2 lg:px-4 rounded-lg border 
          
      ${
        selectedFile?.id == file?.id
          ? "bg-accent/20 border-accent text-accent"
          : `bg-secondary/5 border-secondary/30 text-secondary/30 
          hover:bg-secondary/20 hover:border-secondary hover:text-secondary`
      }
      transition-all ease-in-out duration-300`}
          key={file?.id}
          value={file?.slug}
          onClick={() => {
            if (selectedFile?.id != file?.id) {
              dispatch(chatActions.selectFile(file));
            }
          }}
        >
          {file?.title?.length <= 20 ? (
            file?.title
          ) : (
            <Tooltip
              title={<small>{file?.title}</small>}
              trigger="hover"
              color="#0BA5E9"
            >
              {file?.title?.slice(0, 20) + " ..."}
            </Tooltip>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFile(file?.id);
            }}
            className="hover:text-red-600 transition-all ease-in-out duration-300"
          >
            {isLoading ? <Spin size="small" /> : <TbTrashFilled />}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilesList;
