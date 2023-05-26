import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { ReactComponent as BrandingIcon } from "@assets/branding/icon.svg";
import { ReactComponent as GoogleIcon } from "@assets/icons/google.svg";
import { authRoutes } from "@domains/auth/AuthRoute";
import { style } from "@domains/auth/pages/login/_loginStyle";
import { RequestResponseModel, RequestStatus } from "@libs/Request";
import { upFirstChar } from "@utils/TextUtil";

/**
 * Login component properties
 */
interface ILoginComponentProps {
  data: {
    form: any;
    response: RequestResponseModel;
    showPassword: boolean;
    handleShowPassword: () => void;
    handleLoginWith: (third: "google") => void;
  };
}

/**
 * Login component
 * @param props
 * @constructor
 */
const LoginComponent: FC<ILoginComponentProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { form, response, showPassword, handleShowPassword, handleLoginWith } =
    props.data;

  return (
    <Grid container sx={style.container}>
      {/* LOGIN BOX */}
      <Grid item xs={12} md={6} sx={style.containerLeft}>
        <Box sx={style.contentLeft}>
          {/* Logo */}
          <BrandingIcon
            color={theme.palette.primary.main}
            width={"50px"}
            height={"50px"}
          />

          {/* Login title */}
          <Typography variant={"h4"} mb={6} mt={2}>
            {t("auth.login.title")}
          </Typography>

          {/* Login error */}
          {response.status === RequestStatus.FAILED && response.data && (
            <Alert severity="error" style={{ marginBottom: 20 }}>
              {response.data}
            </Alert>
          )}

          {/* Login with Google */}
          <Button
            fullWidth
            size={"large"}
            variant={"outlined"}
            startIcon={<GoogleIcon style={style.loginWithIcon} />}
            sx={style.loginWithButton}
            onClick={() => handleLoginWith}
          >
            {t("auth.login.button_with_google")}
          </Button>

          {/* Divider */}
          <Divider sx={style.divider}>{t("global.common.or")}</Divider>

          {/* Login form */}
          <form onSubmit={form.handleSubmit}>
            {/* Email address input */}
            <TextField
              fullWidth
              id={"email"}
              label={upFirstChar(t("global.common.email_address"))}
              margin={"normal"}
              autoComplete={upFirstChar(t("global.common.email_address"))}
              value={form.values.email}
              onChange={form.handleChange}
              error={form.touched.email && Boolean(form.errors.email)}
              helperText={form.touched.email && form.errors.email}
            />

            {/* Password input */}
            <TextField
              fullWidth
              id={"password"}
              label={upFirstChar(t("global.common.password"))}
              margin={"normal"}
              autoComplete={upFirstChar(t("global.common.password"))}
              type={showPassword ? "text" : "password"}
              value={form.values.password}
              onChange={form.handleChange}
              error={form.touched.password && Boolean(form.errors.password)}
              helperText={form.touched.password && form.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    <IconButton onClick={handleShowPassword} edge={"end"}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Login button */}
            <Button
              fullWidth
              size={"large"}
              type={"submit"}
              variant={"contained"}
              sx={style.loginButton}
            >
              {response.status === RequestStatus.PENDING ? (
                <CircularProgress color={"inherit"} size={"1.642rem"} />
              ) : (
                t("auth.login.button")
              )}
            </Button>

            {/* Helper box */}
            {/* TODO Make forgot password and register page - remove visibility={"hidden"} */}
            <Grid container visibility={"hidden"}>
              {/* Forgot password */}
              <Grid item xs>
                <Link
                  component={"button"}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(authRoutes.forgot.call());
                  }}
                  variant={"body2"}
                  underline={"none"}
                >
                  {t("auth.login.forgot_password")}
                </Link>
              </Grid>

              {/* Create an account */}
              <Grid item display={"flex"}>
                <Typography variant="body2">
                  {t("auth.login.no_account")}
                </Typography>

                <Link
                  component={"button"}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(authRoutes.register.call());
                  }}
                  variant={"body2"}
                  underline={"none"}
                  style={{
                    marginLeft: 4,
                  }}
                >
                  {t("auth.login.register_account")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>

      {/* IMAGE BOX */}
      <Grid item md={6} sx={style.containerRight} />
    </Grid>
  );
};

export default LoginComponent;
