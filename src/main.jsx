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
    colorPrimary: "#8c14ff", // Accent color (Tailwind's accent)
    colorBgBase: "#f8f8f8", // Background color (Tailwind's background)
    colorTextBase: "#212121", // Primary text color (Tailwind's primary)
    colorTextSecondary: "#555555", // Secondary text color
    colorBgContainer: "#ffffff", // Surface color (Tailwind's surface)
    colorLink: "#8c14ff", // Link color (Tailwind's accent)
    controlItemBgHover: "#ffffff", // Hover for buttons and inputs (same surface color)
    controlItemBgActive: "#8c14ff", // Active button color
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <ClerkProvider publishableKey={appEnv.clerk} afterSignOutUrl="/">
          <RouterProvider router={appRoutes} />
        </ClerkProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
