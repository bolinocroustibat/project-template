import { lazy } from "react";

/**
 * Lazy imports
 */
const dashboardPage = lazy(
  () => import("@domains/dashboard/pages/dashboard/DashboardPage")
);

/**
 * Dashboard routes
 */
const dashboardRoutes = {
  /**
   * Dashboard route
   */
  dashboard: {
    path: "/",
    call: () => dashboardRoutes.dashboard.path,
    page: dashboardPage,
    isPrivate: true,
  },
};

export { dashboardRoutes };
