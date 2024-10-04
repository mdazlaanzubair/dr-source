import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub, FaGlobe } from "react-icons/fa6";

const FooterSection = () => {
  const social_icons = [
    {
      title: "Linked In",
      icon: () => <FaLinkedinIn />,
      url: "https://www.linkedin.com/in/mdazlaanzubair/",
    },
    {
      title: "Github",
      icon: () => <FaGithub />,
      url: "https://github.com/mdazlaanzubair",
    },
    {
      title: "Portfolio",
      icon: () => <FaGlobe />,
      url: "https://www.mdazlaanzubair.com/",
    },
  ];

  return (
    <footer id="footer-section" className="w-full h-auto p-5 border-t px-10">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <span className="text-sm text-secondary sm:text-center">
          Developed with care by{" "}
          <a
            href="https://www.mdazlaanzubair.com/"
            target="_blank"
            className="font-semibold text-accent underline underline-offset-2"
          >
            Md Azlaan Zubair
          </a>
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          {social_icons?.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              title={item.title}
              className="text-primary hover:text-accent"
            >
              {item.icon()}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
