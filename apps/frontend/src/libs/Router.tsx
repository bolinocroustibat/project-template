import { LazyExoticComponent, Suspense } from "react";
import {
  BrowserRouter as ReactRouter,
  Navigate,
  Outlet,
  Route as ReactRoute,
  Routes as ReactRoutes,
} from "react-router-dom";

import CircularProgress from "@components/progress/CircularProgress";
import { authRoutes } from "@domains/auth/AuthRoute";
import { getMe, isAuthenticated } from "@domains/auth/stores/auth/AuthService";
import { useDispatch, useSelector } from "@hooks/StoreHook";

/**
 * Routes interface
 */
interface IRoutes {
  [key: string]: RouteModel;
}

/**
 * Router properties
 */
interface IRouterProps {
  routes: IRoutes[];
}

/**
 * Route model
 */
type RouteModel = {
  path: string;
  call: (params: any) => string;
  page: LazyExoticComponent<any>;
  isPrivate: boolean;
};

/**
 * Main router
 * @param props
 * @constructor
 */
const Router = (props: IRouterProps) => {
  const publicRoutes: RouteModel[] = [];
  const privateRoutes: RouteModel[] = [];

  /**
   * Split public and private routes
   */
  for (const routes of props.routes) {
    for (const key of Object.keys(routes)) {
      const route = routes[key];
      if (route.isPrivate) privateRoutes.push(route);
      else publicRoutes.push(route);
    }
  }

  /**
   * Load a route list
   * @param routes
   */
  const loadRoutes = (routes: RouteModel[]) =>
    routes.map((route) => (
      <ReactRoute key={route.path} path={route.path} element={<route.page />} />
    ));

  /**
   * Require authentication on routes
   * @constructor
   */
  const AuthRequire = () => {
    const dispatch = useDispatch();
    const authReducer = useSelector((state) => state.authReducer);

    // We check if the user has a token
    if (!isAuthenticated())
      return <Navigate to={authRoutes.login.call()} replace />;

    // We are waiting for the user's profile to be retrieved.
    if (!authReducer.user) {
      dispatch(getMe());
      return <CircularProgress centred />;
    }

    return <Outlet />;
  };

  return (
    <ReactRouter>
      <Suspense fallback={<CircularProgress centred />}>
        <ReactRoutes>
          {/* PUBLIC ROUTES */}
          {loadRoutes(publicRoutes)}

          {/* PRIVATE ROUTES */}
          <ReactRoute element={<AuthRequire />}>
            {loadRoutes(privateRoutes)}
          </ReactRoute>

          {/* INVALID ROUTES */}
          <ReactRoute path={"*"} element={<Navigate to="/" />} />
        </ReactRoutes>
      </Suspense>
    </ReactRouter>
  );
};

export { Router };
export type { IRoutes };
