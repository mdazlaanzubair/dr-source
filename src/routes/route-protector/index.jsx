import { useAuth } from "@clerk/clerk-react";
import React, { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RouteProtector = ({ children }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // IF NO USER ID REDIRECT
  useLayoutEffect(() => {
    if (!isSignedIn && !userId && isLoaded) {
      navigate("/login", { replace: true });
    }
  }, [isLoaded]);

  // IF NOT LOADED SHOW LOADER
  if (!isLoaded) {
    return (
      <div
        className="fixed w-screen h-screen 
  flex flex-col items-center justify-center 
  bg-background backdrop-blur-lg z-50"
      >
        <h1 className="text-4xl lg:text-6xl font-bold lg:font-black text-primary animate-pulse">
          Loading...
        </h1>
        <p className="text-sm lg:text-base font-semibold text-secondary">
          Please wait
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default RouteProtector;
