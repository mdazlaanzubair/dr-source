import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const ContextModal = ({ showContext, closeHandler }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy the text to clipboard
  const handleCopy = () => {
    // Use the Clipboard API
    navigator.clipboard
      .writeText(showContext)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  return (
    <Modal
      title={false}
      open={showContext}
      closeIcon={false}
      onCancel={closeHandler}
      footer={null}
      header={<></>}
    >
        <div className="w-full overflow-y-auto flex items-center justify-between">
          <div>
            <h1 className="text-primary font-bold text-base">
              Document Context
            </h1>
            <p className="text-secondary text-xs">
              This is the context used by LLM to answer your question
            </p>
          </div>

          <button
            className="
          w-fit h-fit border rounded 
          text-secondary/50 border-transparent bg-secondary/5
          hover:text-secondary hover:border-secondary/20 hover:bg-secondary/20
          transition-all ease-in-out duration-500
          "
            onClick={closeHandler}
            disabled={isCopied}
          >
            <IoCloseOutline className="m-1 text-xl" />
          </button>
        </div>

        <Typography.Paragraph
          ellipsis={{
            rows: 5,
            expandable: "collapsible",
            symbol: "Read more",
          }}
          className="text-secondary font-medium text-xs my-5 capitalize"
          copyable
        >
          {showContext}
        </Typography.Paragraph>

        <div className="flex items-center justify-end gap-3">
          <Button onClick={handleCopy} type="primary" disabled={isCopied}>
            {isCopied ? "Copied!" : "Copy Context"}
          </Button>
        </div>
    </Modal>
  );
};

export default ContextModal;
