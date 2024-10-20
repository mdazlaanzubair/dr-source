import { useState } from "react";
import { Modal, Button, Upload, Form } from "antd";
import { MdOutlineUploadFile } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { notify } from "../../../../utils/notify";
import { generatingVectors } from "../../../../redux/chat/actions";
import { IoCloseOutline } from "react-icons/io5";
import FileUploadLoader from "../file-upload-loader";

const { Dragger } = Upload;

const FileUploadFormModal = ({ visible, closeHandler }) => {
  const dispatch = useDispatch();
  const [fileUploadFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const failureCallback = () => setTimeout(() => setIsLoading(false), 3000);

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

    const formData = new FormData();
    const fileName = uploader?.fileList[0]?.originFileObj?.name;
    const slug = fileName?.replace(/ /g, "-")?.toLowerCase();
    const file = uploader?.fileList[0]?.originFileObj;

    formData.append("file", file); // Access the file from the Upload component
    formData.append("fileName", fileName); // Add file name to form data
    formData.append("slug", slug);

    // remove non-ASCII characters from string
    formData.append(
      "name_space",
      `${user?.id}-${slug}`?.replace(/[^\x00-\x7F]+/g, "")
    );
    formData.append("user_id", user?.id);

    try {
      const successCallback = () => {
        setIsLoading(false);
        handleCloseModal();
        notify(
          "success",
          "File Uploaded",
          "PDF processed and embeddings stored in Pinecone"
        );
      };

      dispatch(generatingVectors(formData, successCallback, failureCallback));
    } catch ({ error, message }) {
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
      setIsLoading(false);
    }
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
          backgroundColor: "#ffffff",
          color: "#252525",
        },
      }}
    >
      {isLoading && (
        <div className="absolute z-10 inset-0 bg-surface rounded-md flex items-center justify-center">
          <FileUploadLoader />
        </div>
      )}

      <Form
        form={fileUploadFormRef}
        onFinish={handleFileSubmit}
        layout="vertical"
        className="bg-surface "
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-primary font-bold text-base">
              Upload your document
            </h1>
            <p className="text-secondary text-xs">
              Kindly upload traceable and trackable pdf files.
            </p>
          </div>
          <button
            className="
            w-fit h-fit border rounded 
            text-secondary/50 border-transparent bg-secondary/5
            hover:text-secondary hover:border-secondary/20 hover:bg-secondary/20
            transition-all ease-in-out duration-500
            "
            onClick={handleCloseModal}
            disabled={isLoading}
          >
            <IoCloseOutline className="m-1 text-xl" />
          </button>
        </div>

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
              <MdOutlineUploadFile className="text-4xl mb-3" />
              <p className="font-bold">
                Click or drag file to this area to upload
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
