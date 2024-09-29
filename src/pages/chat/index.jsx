import React, { useLayoutEffect, useState } from "react";
import { FileUploadFormModal, QueriesList, QueryForm } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { FloatButton } from "antd";
import { getFilesRecord, getQueriesRecord } from "../../redux/chat/actions";
import { useUser } from "@clerk/clerk-react";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const [isShowUploadModal, setIsShowUploadModal] = useState(false);
  const { files } = useSelector((state) => state.chat);

  useLayoutEffect(() => {
    if (user?.id) {
      dispatch(getFilesRecord(user?.id));
      dispatch(getQueriesRecord(user?.id));
    }
  }, [user]);

  return (
    <div className="relative w-screen min-h-screen flex flex-col justify-center items-center bg-background p-1 md:p-8">
      <FloatButton
        className="bg-surface text-primary text-xs"
        onClick={() => setIsShowUploadModal(true)}
        type="primary"
        tooltip={"Upload document"}
        badge={{
          dot: files?.length <= 0,
          count: files?.length,
          color: "red",
          className: "outline-none border-none",
        }}
      />

      <QueryForm />

      <QueriesList />

      {/* FILE UPLOAD MODAL */}
      <FileUploadFormModal
        visible={isShowUploadModal}
        closeHandler={() => setIsShowUploadModal(false)}
      />
    </div>
  );
};

export default ChatPage;
