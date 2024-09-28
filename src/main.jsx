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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0BA5E9", // primary color
          },
        }}
      >
        <ClerkProvider publishableKey={appEnv.clerk} afterSignOutUrl="/">
          <RouterProvider router={appRoutes} />
        </ClerkProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
