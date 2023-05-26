import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@mui/material";

import { themeConfig } from "@configs/ThemeConfig";
import { authRoutes } from "@domains/auth/AuthRoute";
import { dashboardRoutes } from "@domains/dashboard/DashboardRoute";
import { userRoutes } from "@domains/user/UserRoute";
import { Router } from "@libs/Router";
import "@services/TranslationService";
import { storeConfig } from "@stores/Store";

import "./App.css";

/**
 * Create the main root
 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    {/* Store Provider */}
    <StoreProvider store={storeConfig}>
      {/* Theme Provider */}
      <ThemeProvider theme={themeConfig}>
        {/* Router */}
        <Router routes={[authRoutes, dashboardRoutes, userRoutes]} />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
