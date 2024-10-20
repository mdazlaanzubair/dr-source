import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FloatButton } from "antd";
import { useUser } from "@clerk/clerk-react";
import {
  APIKeyFormModal,
  FileUploadFormModal,
  NavBar,
  QueriesList,
  QueryForm,
} from "./components";
import {
  getAPIKeyRecord,
  getFilesRecord,
  getQueriesRecord,
} from "../../redux/chat/actions";
import { FaCog } from "react-icons/fa";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const [isShowUploadModal, setIsShowUploadModal] = useState(false);
  const [isShowAPIKeyModal, setIsShowAPIKeyModal] = useState(false);
  const { files, api_key, isLoadingAPIKey } = useSelector(
    (state) => state.chat
  );

  useLayoutEffect(() => {
    if (user?.id) {
      dispatch(getFilesRecord(user?.id));
      dispatch(getQueriesRecord(user?.id));
      dispatch(getAPIKeyRecord(user?.id));
    }
  }, [user]);

  useEffect(() => {
    setIsShowAPIKeyModal(false);
    if (!api_key && !isLoadingAPIKey) {
      setIsShowAPIKeyModal(true);
    }
  }, [api_key, isLoadingAPIKey]);

  return (
    <div className="relative w-screen min-h-screen flex flex-col justify-center items-center bg-background py-[8rem]">
      <NavBar />
      <div className="relative w-full lg:w-1/2 h-auto bg-surface flex flex-col rounded-lg p-5 md:p-8 pb-0 md:pb-0">
        <FloatButton.Group
          className="group"
          shape="circle"
          // trigger="click"
          tooltip="Options"
          icon={
            <FaCog className="group-hover:rotate-45 transition-all ease-in-out duration-300" />
          }
        >
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

          <FloatButton
            className="group bg-surface text-primary text-xs"
            onClick={() => setIsShowAPIKeyModal(true)}
            type=""
            tooltip={"Configure API Key"}
            icon={
              <FaCog className="group-hover:rotate-45 transition-all ease-in-out duration-300" />
            }
          />
        </FloatButton.Group>

        <QueryForm isDisabled={!api_key || api_key?.length <= 0} />

        <QueriesList />

        {/* API KEY UPLOAD MODAL */}
        <APIKeyFormModal
          visible={isShowAPIKeyModal}
          closeHandler={() => setIsShowAPIKeyModal(false)}
        />

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
