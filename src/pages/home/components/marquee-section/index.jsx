import React from "react";
import antDesignLogo from "../../../../assets/tech-logos/antdesign.png";
import axiosLogo from "../../../../assets/tech-logos/axios.svg";
import clerkLogo from "../../../../assets/tech-logos/clerk.svg";
import deepmindLogo from "../../../../assets/tech-logos/deepmind.svg";
import huggingFaceLogo from "../../../../assets/tech-logos/huggingface.svg";
import langChainLogo from "../../../../assets/tech-logos/langchain.svg";
import nodejsLogo from "../../../../assets/tech-logos/nodejs.svg";
import npmLogo from "../../../../assets/tech-logos/npm.svg";
import pineconeLogo from "../../../../assets/tech-logos/pinecone.svg";
import reactLogo from "../../../../assets/tech-logos/react.png";
import reduxLogo from "../../../../assets/tech-logos/redux.png";
import supabaseLogo from "../../../../assets/tech-logos/supabase.svg";
import tailwindLogo from "../../../../assets/tech-logos/tailwind.svg";
import vercelLogo from "../../../../assets/tech-logos/vercel.svg";
import viteLogo from "../../../../assets/tech-logos/vite.png";

const MarqueSection = () => {
  const logos = [
    { title: "Ant Design", src: antDesignLogo },
    { title: "Axios", src: axiosLogo },
    { title: "Clerk", src: clerkLogo },
    { title: "Deepmind Google", src: deepmindLogo },
    { title: "Hugging Face", src: huggingFaceLogo },
    { title: "Lang Chain", src: langChainLogo },
    { title: "Node JS", src: nodejsLogo },
    { title: "NPM", src: npmLogo },
    { title: "Pinecone DB", src: pineconeLogo },
    { title: "React JS", src: reactLogo },
    { title: "Redux", src: reduxLogo },
    { title: "Supabase", src: supabaseLogo },
    { title: "Tailwind CSS", src: tailwindLogo },
    { title: "Vercel", src: vercelLogo },
    { title: "Vite", src: viteLogo },
  ];

  return (
    <div
      id="marquee-section"
      className="w-full flex flex-col items-center justify-center my-5"
    >
      <h1 className="text-primary font-semibold translate-y-5 z-10">
        Powered by
      </h1>
      <div className="relative flex gap-52 overflow-x-hidden">
        <div className="py-4 animate-marquee whitespace-nowrap">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.title}
              className="inline-block w-24 aspect-square object-contain mix-blend-color-dodge mx-10"
            />
          ))}
        </div>

        <div className="py-4 animate-marquee2 whitespace-nowrap">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.title}
              className="inline-block w-24 aspect-square object-contain mix-blend-color-dodge mx-10"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueSection;
