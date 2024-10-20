import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/index.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { appEnv } from "./utils/exportEnv.js";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/index.js";

const theme = {
  token: {
    colorPrimary: "#4F45E4", // Accent color (Tailwind's accent)
    colorBgBase: "#f8f8f8", // Background color (Tailwind's background)
    colorTextBase: "#212121", // Primary text color (Tailwind's primary)
    colorTextSecondary: "#555555", // Secondary text color
    colorBgContainer: "#ffffff", // Surface color (Tailwind's surface)
    colorLink: "#4F45E4", // Link color (Tailwind's accent)
    controlItemBgHover: "#ffffff", // Hover for buttons and inputs (same surface color)
    controlItemBgActive: "#4F45E4", // Active button color
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme} dev >
        <ClerkProvider
          publishableKey={appEnv.clerk}
          afterSignOutUrl="/"
          signInUrl="/app"
          signUpUrl="/app"
          signInForceRedirectUrl="/app"
          signUpForceRedirectUrl="/app"
          signInFallbackRedirectUrl="/app"
          signUpFallbackRedirectUrl="/app"
        >
          <RouterProvider router={appRoutes} />
        </ClerkProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
