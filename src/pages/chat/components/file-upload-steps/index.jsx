import { Spin, Steps } from "antd";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsDatabaseUp } from "react-icons/bs";
import { TbFileTextAi, TbVectorBezier2 } from "react-icons/tb";

const FileUploadSteps = ({ currentStep }) => {
  return (
    <Steps
      className="mx-auto w-fit"
      direction="vertical"
      items={[
        {
          title: "Extract Content",
          description: "Reading text from file page-by-page",
          icon: !currentStep ? (
            <p className="text-3xl mx-auto text-center font-bold">
              <AiOutlineLoading className="animate-spin" />
            </p>
          ) : (
            <TbFileTextAi />
          ),
          status: currentStep == null ? "wait" : "finish",
        },
        {
          title: "Vector Generation",
          description: "Converting extracted content to vectors embeddings",
          icon:
            currentStep == "process-stage" ? (
              <p className="text-3xl mx-auto text-center font-bold">
                <AiOutlineLoading className="animate-spin" />
              </p>
            ) : (
              <TbVectorBezier2 />
            ),
          status: currentStep == "process-stage" ? "wait" : "finish",
        },
        {
          title: "Save Content",
          description: "Saving files metadata to the database",
          icon:
            currentStep == "embed-stage" ? (
              <p className="text-3xl mx-auto text-center font-bold">
                <AiOutlineLoading className="animate-spin" />
              </p>
            ) : (
              <BsDatabaseUp />
            ),
          status: currentStep == "final-stage" ? "finish" : "wait",
        },
      ]}
    />
  );
};

export default FileUploadSteps;
