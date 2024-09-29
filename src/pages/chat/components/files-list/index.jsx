import React, { useState } from "react";
import { TbTrashFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "../../../../redux/chat/actions";
import { chatActions } from "../../../../redux/chat/slice";
import { Spin, Tooltip } from "antd";

const FilesList = () => {
  const dispatch = useDispatch();

  const { files, selectedFile } = useSelector((state) => state.chat);
  const [isLoading, setIsLoading] = useState(false);

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
          text-xs py-1 px-2 rounded border cursor-pointer
          ${
            selectedFile?.id == file?.id
              ? "bg-accent/20 border-accent text-accent"
              : `bg-secondary/5 border-secondary/30 text-secondary/30 
              hover:bg-secondary/20 hover:border-secondary hover:text-secondary`
          }
          transition-all ease-in-out duration-500`}
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
              placement="bottomRight"
              title={<p className="leading-tight text-xs">{file?.title}</p>}
            >
              {file?.title?.slice(0, 20) + " ..."}
            </Tooltip>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFile(file?.id);
            }}
            className="hover:text-red-600 transition-all ease-in-out duration-500"
          >
            {isLoading ? <Spin size="small" /> : <TbTrashFilled />}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilesList;
