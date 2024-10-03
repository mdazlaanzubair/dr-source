import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../../assets/file-loading-animation.json";

const FileUploadLoader = ({ isLoop = true, height = 400, width = 400 }) => {
  const defaultOptions = {
    loop: isLoop,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Lottie options={defaultOptions} height={height} width={width} />
      <p className="-translate-y-24 font-bold animate-pulse">Loading...</p>
    </div>
  );
};

export default FileUploadLoader;
