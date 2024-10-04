import { Button } from "antd";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import heroImage from "../../../../assets/hero-img.jpg";

const HeroSection = () => {
  return (
    <section
      id="#home-section"
      className="w-full flex-grow flex flex-col lg:flex-row items-center justify-between mt-16 px-10"
    >
      <div className="w-full lg:w-1/2">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
          Unlock Knowledge <span className="text-accent">Efficiently</span>
        </h1>
        <p className="mb-8 text-lg font-normal lg:text-xl text-secondary max-w-lg">
          At Dr. Source, we harness the power of AI to simplify the way you
          interact with long-form content.
        </p>
        <div className="flex items-center justify-start">
          <div to="/app/chat" className="button-container">
            <div className="animated-button">Get started</div>
          </div>
          <Button
            href="#about-section"
            className="group flex items-center justify-center gap-3 w-auto"
            type="link"
          >
            <span className="text-base font-semibold">Learn More</span>
            <MdArrowRightAlt className="group-hover:ml-2 text-xl mt-px transition-all ease-in-out duration-300" />
          </Button>
        </div>
      </div>
      <div className="hidden lg:w-1/2 lg:h-full lg:flex items-center justify-center">
        <img
          className="w-full h-auto rounded-lg shadow-md"
          src={heroImage}
          alt="hero image"
        />
      </div>
    </section>
  );
};

export default HeroSection;
