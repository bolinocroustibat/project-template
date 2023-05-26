import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { authConfig } from "@domains/auth/AuthConfig";
import LoginComponent from "@domains/auth/pages/login/LoginComponent";
import { isAuthenticated, login } from "@domains/auth/stores/auth/AuthService";
import { useDispatch } from "@hooks/StoreHook";
import { RequestResponseModel, RequestStatus } from "@libs/Request";

/**
 * Login properties
 */
interface ILoginProps {
  email: string;
  password: string;
}

/**
 * Login page
 * @constructor
 */
const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [response, setResponse] = useState<RequestResponseModel>({
    status: RequestStatus.IDLE,
  });

  /**
   * Handle show password
   */
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  /**
   * Handle login with third parties
   * @param third
   */
  const handleLoginWith = (third: "google") => {
    //TODO login with third parties
    alert(`Login with ${third} will come soon.`);
  };

  /**
   * Validation schema
   */
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(`${t("auth.login.error.enter_valid_email")}`)
      .required(`${t("auth.login.error.enter_email")}`),
    password: yup
      .string()
      .min(4, `${t("auth.login.error.enter_valid_password")}`)
      .required(`${t("auth.login.error.enter_password")}`),
  });

  /**
   * Handle login without third parties
   * @param values
   */
  const handleOnSubmit = (values: ILoginProps) =>
    dispatch(login(values, setResponse));

  /**
   * Form config
   */
  const form = useFormik({
    initialValues: authConfig.login.initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  /**
   * We catch succeed login
   */
  useEffect(() => {
    if (response.status === RequestStatus.SUCCEEDED)
      navigate(authConfig.login.successRoute, { replace: true });
  }, [response]);

  /**
   * Redirect to list if the user is already connected and try to go on the login route
   */
  if (isAuthenticated())
    return <Navigate to={authConfig.login.successRoute} replace />;

  return (
    <LoginComponent
      data={{
        form,
        response,
        showPassword,
        handleShowPassword,
        handleLoginWith,
      }}
    />
  );
};

export default LoginPage;
export type { ILoginProps };
