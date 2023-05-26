import { CSSProperties } from "react";

import { themeConfig } from "@configs/ThemeConfig";
import rightImage from "@domains/auth/assets/images/login.jpg";

const container: CSSProperties = {
  height: "100vh",
};

const containerLeft: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const containerRight: CSSProperties = {
  backgroundImage: `url(${rightImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",

  [themeConfig.breakpoints.down("md")]: {
    display: "none",
  },
};

const loginWithButton: CSSProperties = {
  color: "black",
  fontWeight: "500",
};

const loginButton: CSSProperties = {
  marginTop: 2,
  marginBottom: 2,
};

const loginWithIcon: CSSProperties = {
  width: "25px",
  height: "25px",
};

const divider: CSSProperties = {
  marginTop: 3,
  marginBottom: 3,
};

const contentLeft: CSSProperties = {
  width: "50%",

  [themeConfig.breakpoints.down("lg")]: {
    width: "70%",
  },
};

export const style = {
  container,
  containerLeft,
  containerRight,
  loginWithButton,
  loginButton,
  loginWithIcon,
  divider,
  contentLeft,
};

export default { style };
