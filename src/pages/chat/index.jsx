import React, { useLayoutEffect, useState } from "react";
import { FileUploadFormModal, QueriesList, QueryForm } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { FloatButton } from "antd";
import { getFilesRecord, getQueriesRecord } from "../../redux/chat/actions";
import { UserButton, useUser } from "@clerk/clerk-react";
import appLogo from "../../assets/app-logo.png";
import { FaUserAstronaut } from "react-icons/fa";
import { GiHamburger } from "react-icons/gi";
import { BiMenuAltRight } from "react-icons/bi";
import { FaCircleNotch } from "react-icons/fa6";

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
      <div className="my-5 text-center">
        <img
          className="mx-auto w-16 h-auto"
          src={appLogo}
          alt="application logo - dr source"
        />
        <h1 className="text-2xl font-bold">Dr. Source</h1>
        <p className="font-medium">Your reading companion</p>
      </div>

      <FloatButton.Group
        trigger="click"
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<FaCircleNotch />}
      >
        <FloatButton
          className="bg-surface text-primary text-xs"
          onClick={() => setIsShowUploadModal(true)}
          type="default"
          tooltip={"Upload document"}
          badge={{
            dot: files?.length <= 0,
            count: files?.length,
            color: "red",
            className: "outline-none border-none",
          }}
        />
        <FloatButton
          className="bg-surface text-primary text-xs"
          type="primary"
          tooltip={"Manage Account"}
          description={
            <UserButton />
          }
        />
      </FloatButton.Group>

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
