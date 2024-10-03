import { Button, Modal, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const ContextModal = ({ showContext, closeHandler }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy the text to clipboard
  // const handleCopy = () => {
  //   // Use the Clipboard API
  //   navigator.clipboard
  //     .writeText(showContext)
  //     .then(() => {
  //       setIsCopied(true);
  //       setTimeout(() => setIsCopied(false), 3000);
  //     })
  //     .catch((err) => {
  //       console.error("Error copying text: ", err);
  //     });
  // };

  return (
    <Modal
      title={false}
      open={showContext}
      closeIcon={false}
      onCancel={closeHandler}
      footer={null}
      header={<></>}
    >
      <div className="w-full overflow-y-auto flex items-center justify-between border-b border-secondary/10 pb-3">
        <div>
          <h1 className="text-primary font-bold text-base">Document Context</h1>
          <p className="text-secondary text-xs mb-3">
            This is the context used by LLM to answer your question
          </p>
          <span className="text-[0.6rem] text-surface font-medium px-2 py-1 bg-accent rounded-full">
            Pages Read by AI: {showContext?.length}
          </span>
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

      <div className="w-full max-h-[40vh] overflow-y-auto no-scrollbar my-3">
        {showContext?.map((context, index) => {
          const { page_num, page_content } = JSON.parse(context);

          return (
            <Tooltip
              title={`Reference from page number ${page_num}`}
              placement="bottomLeft"
            >
              <Typography.Paragraph
                key={`context-${index}`}
                ellipsis={{
                  rows: 5,
                  expandable: "collapsible",
                  symbol: "Read more",
                }}
                className="text-secondary font-medium text-xs capitalize p-3 my-5 rounded-lg bg-secondary/10"
                copyable
              >
                {page_content?.join()}
              </Typography.Paragraph>
            </Tooltip>
          );
        })}
      </div>

      {/* <div className="flex items-center justify-end gap-3 border-t border-secondary/10 pt-3">
        <Button onClick={handleCopy} type="primary" disabled={isCopied}>
          {isCopied ? "Copied!" : "Copy Context"}
        </Button>
      </div> */}
    </Modal>
  );
};

export default ContextModal;
