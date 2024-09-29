import { useAuth } from "@clerk/clerk-react";
import React, { useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AuthPage = ({ children }) => {
  const { pathname } = useLocation();
  const { userId, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // IF NO USER ID REDIRECT
  useLayoutEffect(() => {
    if (isSignedIn && userId && isLoaded) {
      navigate("/app/chat", { replace: true });
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

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-200 via-background to-slate-200">
      {children}
      <hr />
      {pathname == "/login" ? (
        <p className="text-secondary text-sm py-5">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-accent underline font-medium underline-offset-2"
          >
            Register
          </Link>
        </p>
      ) : (
        <p className="text-secondary text-sm py-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent underline font-medium underline-offset-2"
          >
            Login
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthPage;
