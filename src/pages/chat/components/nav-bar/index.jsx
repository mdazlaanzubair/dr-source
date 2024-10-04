import React, { useEffect, useState } from "react";
import appLogo from "../../../../assets/app-logo.png";
import { UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  return (
    <div
      className={`
        fixed z-50 top-3 left-1/2 -translate-x-1/2
        w-full lg:w-1/2 h-auto flex items-center justify-between 
        shadow shadow-secondary/10 bg-opacity-70 backdrop-blur-sm
        bg-surface rounded-lg px-5 md:px-8 py-3
    `}
    >
      <div className="flex items-center gap-3">
        <div className="w-fit h-fit text-center p-3 bg-accent-gradient mx-auto rounded-lg">
          <img
            className="w-4 h-4 object-cover invert brightness-0"
            src={appLogo}
            alt="application logo - dr source"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-black text-primary mb-0">Dr. Source</h1>
          <sup className="text-xs font-semibold text-secondary p-0 m-0">
            Your reading companion
          </sup>
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default NavBar;
