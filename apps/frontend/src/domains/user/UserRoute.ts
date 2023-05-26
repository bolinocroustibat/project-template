import { lazy } from "react";

/**
 * Lazy imports
 */
const usersPage = lazy(() => import("@domains/user/pages/users/UsersPage"));

/**
 * User routes
 */
const userRoutes = {
  /**
   * Users route
   */
  users: {
    path: "/users",
    call: () => userRoutes.users.path,
    page: usersPage,
    isPrivate: true,
  },

  /**
   * User route
   */
  user: {
    path: "/users/:id",
    call: (params: { id: number }) =>
      userRoutes.user.path.replaceAll(":id", String(params.id)),
    page: usersPage,
    isPrivate: true,
  },
};

export { userRoutes };
