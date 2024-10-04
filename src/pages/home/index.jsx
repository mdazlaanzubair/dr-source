import React from "react";
import {
  FeatureSection,
  FooterSection,
  HeroSection,
  MarqueSection,
} from "./components";

const HomePage = () => {
  return (
    <div className="relative w-full h-auto flex flex-col justify-center items-center bg-background overflow-x-hidden scroll-smooth overflow-y-auto">
      <HeroSection />
      <MarqueSection />
      <FeatureSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;
