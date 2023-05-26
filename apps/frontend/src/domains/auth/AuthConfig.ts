import { dashboardRoutes } from "@domains/dashboard/DashboardRoute";

/**
 * Auth config
 */
const authConfig = {
  login: {
    successRoute: dashboardRoutes.dashboard.call(),
    initialValues: {
      email: "",
      password: "",
    },
  },
  store: {
    tokenKey: "token",
  },
};

export { authConfig };
