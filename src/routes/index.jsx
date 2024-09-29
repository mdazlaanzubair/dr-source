import { Navigate, createBrowserRouter } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { AuthPage, ChatPage, HomePage } from "../pages";
import RouteProtector from "./route-protector";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/app",
    element: <RouteProtector />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/chat" />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthPage>
        <SignIn
          forceRedirectUrl="/app"
          appearance={{
            variables: {
              colorSurface: "#6b7280b3", // Surface or container background
              colorAccent: "#01adef", // Accent color (buttons, links, etc.)
            },
          }}
        />
      </AuthPage>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthPage>
        <SignUp
          forceRedirectUrl="/app"
          appearance={{
            variables: {
              colorSurface: "#6b7280b3", // Surface or container background
              colorAccent: "#01adef", // Accent color (buttons, links, etc.)
            },
          }}
        />
      </AuthPage>
    ),
  },
  // HANDLING ALL NON EXISTING ROUTE
  {
    path: "*",
    element: <h1>No Page found</h1>,
  },
]);
