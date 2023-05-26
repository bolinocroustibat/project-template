import { lazy } from "react";

/**
 * Lazy imports
 */
const loginPage = lazy(() => import("@domains/auth/pages/login/LoginPage"));
const registerPage = lazy(
  () => import("@domains/auth/pages/register/RegisterPage")
);

/**
 * Auth routes
 */
const authRoutes = {
  /**
   * Login route
   */
  login: {
    path: "/auth/login",
    call: () => authRoutes.login.path,
    page: loginPage,
    isPrivate: false,
  },

  /**
   * Register route
   */
  register: {
    path: "/auth/register",
    call: () => authRoutes.register.path,
    page: registerPage,
    isPrivate: false,
  },

  /**
   * Forgot route
   */
  forgot: {
    path: "/auth/forgot",
    call: () => authRoutes.forgot.path,
    page: registerPage,
    isPrivate: false,
  },
};

export { authRoutes };
