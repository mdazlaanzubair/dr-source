import { useState } from "react";
import { Modal, Button, Upload, Form } from "antd";
import { MdOutlineUploadFile } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { notify } from "../../../../utils/notify";
import { pdfReader } from "../../../../utils/pdfReader";
import {
  generatingVectors,
  saveFileRecord,
} from "../../../../redux/chat/actions";
import FileUploadSteps from "../file-upload-steps";
import { IoCloseOutline } from "react-icons/io5";

const { Dragger } = Upload;

const stages = {
  STAGE_1: "process-stage",
  STAGE_2: "embed-stage",
  STAGE_3: "final-stage",
};

const FileUploadFormModal = ({ visible, closeHandler }) => {
  const dispatch = useDispatch();
  const [fileUploadFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(null);
  const failureCallback = () => {
    setTimeout(() => setIsLoading(false), 3000);
  };
  const [previewFileList, setPreviewFileList] = useState([]);
  const { user } = useUser();

  const handleCloseModal = () => {
    if (!isLoading) {
      closeHandler();
      resetForm();
    }
  };

  const resetForm = () => {
    setPreviewFileList([]);
    fileUploadFormRef.resetFields();
  };

  const handleFileSubmit = async ({ uploader }) => {
    setIsLoading(true);
    const fileName = uploader?.fileList[0]?.originFileObj?.name;
    const slug = fileName?.replace(/ /g, "-")?.toLowerCase();

    try {
      const file = uploader?.fileList[0]?.originFileObj;
      const pdf_document = await pdfReader(file, failureCallback);
      setStage(stages.STAGE_1);

      await processFileUpload(pdf_document, slug, fileName);
    } catch ({ error, message }) {
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
      setIsLoading(false);
    }
  };

  // MAKING API CALL TO GENERATE VECTORS
  const processFileUpload = async (pdf_document, slug, title) => {
    const successCallback = () => {
      setStage(stages.STAGE_2);
      finalizeUpload(title, slug);
    };
    await generatingVectors(
      { pdf_document, name_space: `${user?.id}-${slug}` },
      successCallback,
      failureCallback
    );
  };

  // MAKING SUPABASE REQ TO SAVE FILE RECORD
  const finalizeUpload = (title, slug) => {
    const req_body = { title, slug, user_id: user?.id };

    const successCallback = () => {
      setStage(stages.STAGE_3);
      setIsLoading(false);
      handleCloseModal();
      notify(
        "success",
        "File Uploaded",
        "PDF processed and embeddings stored in Pinecone"
      );
      setTimeout(() => setStage(null), 3000);
    };
    dispatch(saveFileRecord(req_body, successCallback, failureCallback));
  };

  const validateFileType = (_, values) => {
    const { fileList } = values?.uploader || [];
    const isInvalid =
      fileList?.length > 0 &&
      fileList[fileList.length - 1]?.type !== "application/pdf";

    return isInvalid
      ? Promise.reject("You can only upload parsable PDF files")
      : Promise.resolve();
  };

  const handleFileChange = ({ fileList }) => {
    setPreviewFileList(
      fileList.length > 0 ? [fileList[fileList.length - 1]] : []
    );

    if (fileList.length === 0) {
      resetForm();
    }
  };

  return (
    <Modal
      title={false}
      open={visible}
      closeIcon={false}
      onCancel={handleCloseModal}
      footer={null}
      header={<></>}
      styles={{
        content: {
          backgroundColor: "#111827",
          color: "#F3F4F6",
        },
      }}
    >
      {isLoading && (
        <div className="absolute z-10 inset-0 bg-primary rounded-md flex items-center justify-center">
          <FileUploadSteps currentStep={stage} />
        </div>
      )}

      <Form
        form={fileUploadFormRef}
        onFinish={handleFileSubmit}
        layout="vertical"
        className="bg-surface "
      >
        <div className="flex items-center justify-end">
          <button
            className="
            w-fit h-fit border rounded 
            text-secondary/50 border-transparent bg-secondary/5
            hover:text-secondary hover:border-secondary/20 hover:bg-secondary/20
            transition-all ease-in-out duration-300
            "
            onClick={handleCloseModal}
            disabled={isLoading}
          >
            <IoCloseOutline className="m-1 text-xl" />
          </button>
        </div>

        {fileUploadFormRef.getFieldValue("fileName") && (
          <p className="text-right text-gray-400">
            <sup>
              {user?.username}/
              <span className="text-primary">
                {fileUploadFormRef
                  .getFieldValue("fileName")
                  ?.replace(/ /g, "-")
                  ?.toLowerCase()}
                .pdf
              </span>
            </sup>
          </p>
        )}

        <Form.Item
          name="uploader"
          rules={[
            { required: true, message: "File is required" },
            { validator: validateFileType },
          ]}
        >
          <Dragger
            id="file-uploader-custom-id"
            accept="application/pdf"
            listType="picture"
            fileList={previewFileList}
            style={{ marginTop: "1.25rem" }}
            beforeUpload={() => false}
            onChange={handleFileChange}
            disabled={isLoading}
          >
            <div className="flex flex-col items-center justify-center text-primary">
              <MdOutlineUploadFile className="text-4xl" />
              <p className="font-bold mb-3">
                Click or drag file to this area to upload
              </p>
              <p className="text-red-600 text-xs">
                Strictly prohibited to upload files other than
                <code className="bg-red-600/20 text-red-600 border border-red-600 py-px px-1 rounded mx-1 font-bold">
                  .pdf
                </code>
                format.
              </p>
            </div>
          </Dragger>
        </Form.Item>

        <div className="flex items-center justify-end gap-3">
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            Upload
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FileUploadFormModal;
