import React, { useLayoutEffect, useState } from "react";
import {
  FileUploadFormModal,
  NavBar,
  QueriesList,
  QueryForm,
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { FloatButton } from "antd";
import { getFilesRecord, getQueriesRecord } from "../../redux/chat/actions";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaCircleNotch } from "react-icons/fa6";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const [isShowUploadModal, setIsShowUploadModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { files } = useSelector((state) => state.chat);

  useLayoutEffect(() => {
    if (user?.id) {
      dispatch(getFilesRecord(user?.id));
      dispatch(getQueriesRecord(user?.id));
    }
  }, [user]);

  return (
    <div className="relative w-screen min-h-screen flex flex-col justify-center items-center bg-background py-[8rem]">
      <NavBar isScrolled={scrollY > 10} />
      <div className="relative w-full lg:w-1/2 h-auto bg-surface flex flex-col rounded-lg p-5 md:p-8 pb-0 md:pb-0">
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
    </div>
  );
};

export default ChatPage;
