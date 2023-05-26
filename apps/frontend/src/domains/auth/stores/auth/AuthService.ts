import { Dispatch, SetStateAction } from "react";

import { authConfig } from "@domains/auth/AuthConfig";
import { ILoginProps } from "@domains/auth/pages/login/LoginPage";
import { TokenModel } from "@domains/auth/stores/auth/AuthModel";
import { updateAuth } from "@domains/auth/stores/auth/AuthReducer";
import { useSelector } from "@hooks/StoreHook";
import { get, post, RequestResponseModel, RequestStatus } from "@libs/Request";
import { StoreDispatch, StoreThunk } from "@stores/Store";
import { getCookie, removeCookie, setCookie } from "@utils/CookiesUtil";

/**
 * Login service
 * @param data
 * @param setResponse
 */
const login =
  (
    data: ILoginProps,
    setResponse: Dispatch<SetStateAction<RequestResponseModel>>
  ): StoreThunk =>
  async (dispatch: StoreDispatch) => {
    // Call api
    setResponse({ status: RequestStatus.PENDING });
    const request = await post({
      path: "/auth/local",
      data: {
        identifier: data.email,
        password: data.password,
      },
    });

    // dispatch data in cookie and storage
    if (request.status === RequestStatus.SUCCEEDED) {
      const token: TokenModel = {
        type: "Bearer",
        access: request.data.jwt,
      };

      setTokenCookie(token);

      dispatch(
        updateAuth({
          token: token,
          user: {
            id: request.data.user.id,
            email: request.data.user.email,
            username: request.data.user.username,
          },
        })
      );
    }

    setResponse(request);
  };

/**
 * Logout
 */
const logout = (): StoreThunk => async (dispatch: StoreDispatch) => {
  removeCookie(authConfig.store.tokenKey);
  dispatch(
    updateAuth({
      token: {
        access: "",
        type: "",
      },
      user: undefined,
    })
  );
};

/**
 * Get user profile
 */
const getMe = (): StoreThunk => async (dispatch: StoreDispatch) => {
  // Call api
  const request = await get({
    path: "/users/me",
  });

  // dispatch data in cookie and storage
  if (request.status === RequestStatus.SUCCEEDED) {
    dispatch(
      updateAuth({
        user: {
          id: request.data.id,
          email: request.data.email,
          username: request.data.username,
        },
      })
    );
  } else {
    //TODO toast ?
  }
};

/**
 * Check if the user is authenticated
 */
const isAuthenticated = () => {
  const userReducer = useSelector((state) => state.authReducer);
  return userReducer.token.access && userReducer.token.type;
};

/**
 * Get token from cookies
 * @ref AuthModel.ts l.26
 */
const getTokenCookie = (): TokenModel => {
  const tokenJSON = JSON.parse(getCookie(authConfig.store.tokenKey) || "{}");
  return {
    type: tokenJSON["type"],
    access: tokenJSON["access"],
  };
};

/**
 * Set token in the cookies
 * @param token
 */
const setTokenCookie = (token: TokenModel) => {
  setCookie(authConfig.store.tokenKey, JSON.stringify(token), 3);
};

export { login, logout, getMe, getTokenCookie, isAuthenticated };
