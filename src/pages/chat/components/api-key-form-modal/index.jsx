import { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { notify } from "../../../../utils/notify";
import { setAPIKeyRecord } from "../../../../redux/chat/actions";
import { APIKeyValidator } from "../../../../utils/APIKeyValidator";

const APIKeyFormModal = ({ visible, closeHandler }) => {
  const dispatch = useDispatch();
  const [apiKeyFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const handleAPIKeySubmit = async ({ api_key }) => {
    setIsLoading(true);

    try {
      // CHECKING IF THE API KEY IS VALID
      const { error: geminiError } = await APIKeyValidator(api_key);

      if (geminiError) throw geminiError;

      // DISPATCHING ACTION WITH A CALLBACK
      const callback = (success) => {
        if (success) {
          apiKeyFormRef.setFieldValue("api_key", "");
          setIsLoading(false);
          return;
        } else {
          setIsLoading(false);
        }
      };

      const reqBody = { api_key, user_id: user.id };
      dispatch(setAPIKeyRecord(reqBody, callback));
    } catch ({ error, message }) {
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={false}
      open={visible}
      closeIcon={false}
      onCancel={closeHandler}
      footer={null}
      header={<></>}
      styles={{
        content: {
          backgroundColor: "#ffffff",
          color: "#252525",
        },
      }}
    >
      <Form
        form={apiKeyFormRef}
        onFinish={handleAPIKeySubmit}
        layout="vertical"
        className="bg-surface"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-primary font-bold text-base">Gemini APi Key</h1>
            <p className="text-secondary text-xs">
              Make sure you get the valid API Key from Gemini Studio
            </p>
          </div>
        </div>

        <Form.Item
          name="api_key"
          label="Paste your api key"
          rules={[{ required: true, message: "Please enter the API Key" }]}
        >
          <Input.Password size="large" placeholder="Paste Gemini API" />
        </Form.Item>

        <div className="w-full flex flex-col my-5">
          <h1 className="font-bold mb-3">
            How to get
            <a
              className="text-accent/80 hover:text-accent transition-all ease-in-out duration-300"
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
            >
              {" Gemini "}
            </a>
            API Key:
          </h1>

              <iframe
                className="w-full h-[30vh]"
                src="https://www.youtube.com/embed/Z8F6FvMrN4o?t=80"
                title="Master the Gemini API: A Node.js tutorial with real examples"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            Save & Continue
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default APIKeyFormModal;
