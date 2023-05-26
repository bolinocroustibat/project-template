import axios, { Method } from "axios";

import { getTokenCookie, logout } from "@domains/auth/stores/auth/AuthService";
import { env } from "@services/MetaService";
import { getTranslation } from "@services/TranslationService";

/**
 * Request status
 */
enum RequestStatus {
  IDLE,
  PENDING,
  SUCCEEDED,
  FAILED,
}

/**
 * Request response model
 */
type RequestResponseModel = {
  status: RequestStatus;
  data?: any;
};

/**
 * Request model
 */
type RequestModel<T> = {
  path: string;
  params?: object;
  data?: T;
  header?: object;
};

/**
 * Default headers
 */
const getDefaultHeaders = () => {
  const token = getTokenCookie();

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      token.type && token.access ? `${token.type} ${token.access}` : "",
  };
};

/**
 * Handle error
 * @param error
 */
const handleError = (error: any): RequestResponseModel => {
  let data = error.message;

  // The request was made and the server responded with a status code
  if (error.response) {
    data = error.response.data.error.message;

    switch (error.response.status) {
      // Unauthorized error
      case 403:
        logout();
        break;
    }

    // Something happened in setting up the request that triggered an Error
  } else {
    switch (error.code) {
      // Network connection error
      case "ERR_NETWORK":
        data = getTranslation("global.error.network");
        break;
    }
  }

  console.error("****** Handle ERROR ******");
  console.error(error);

  // Return the response model
  return {
    status: RequestStatus.FAILED,
    data,
  };
};

/**
 * GET request
 * @param model
 */
const get = async <T>(model: RequestModel<T>): Promise<RequestResponseModel> =>
  makeRequest(model, "GET");

/**
 * POST request
 * @param model
 */
const post = async <T>(model: RequestModel<T>): Promise<RequestResponseModel> =>
  makeRequest(model, "POST");

/**
 * Make a request
 * @param model
 * @param method
 */
const makeRequest = async <T>(
  model: RequestModel<T>,
  method: Method
): Promise<RequestResponseModel> =>
  axios(`${env.VITE_API_URL}${model.path}`, {
    method,
    headers: model.header || getDefaultHeaders(),
    data: model.data,
    params: model.params,
  })
    // Request catch
    .then((res) => {
      return {
        status: RequestStatus.SUCCEEDED,
        data: res.data,
      };
    })

    // Handle error
    .catch((error) => handleError(error));

export { RequestStatus, get, post };
export type { RequestModel, RequestResponseModel };
