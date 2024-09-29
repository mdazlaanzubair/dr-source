import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-background">
      <div className="container mx-auto p-8 md:p-12 lg:p-14 bg- rounded-lg z-10 backdrop-blur-md bg-opacity-90">
        <h1 className="text-4xl lg:text-6xl font-bold lg:font-black mb-4 text-primary">
          Welcome to <strong className="text-accent">Dr. Source</strong>
        </h1>
        <p className="text-lg font-semibold mb-10 text-secondary">
          Streamline your document reading experience with AI-powered insights
        </p>
        <Link
          to="/app/chat"
          className="bg-gradient-to-tr from-accent/80 via-accent to-accent/80 hover:opacity-90 py-4 px-9 whitespace-nowrap rounded-lg transition-colors ease-in-out duration-500"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
