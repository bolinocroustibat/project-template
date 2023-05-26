import { CSSProperties } from "react";

import { sidebarConfig } from "@configs/SidebarConfig";
import { themeConfig } from "@configs/ThemeConfig";

const toolbar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "80px",
};

const container: CSSProperties = {
  display: "flex",
  height: "100vh",
  backgroundColor: sidebarConfig.colors.background,
};

const containerLeft: CSSProperties = {
  backgroundColor: sidebarConfig.colors.sidebar,
  position: "fixed",
  width: "280px",
  height: "100%",
  borderRight: "1px dashed rgba(100, 100, 100, 0.20)",
  zIndex: 2,

  [themeConfig.breakpoints.down("sm")]: {
    display: "none",
  },
};

const containerRight: CSSProperties = {
  position: "absolute",
  left: "280px",
  width: "calc(100% - 280px)",
  zIndex: 1,

  [themeConfig.breakpoints.down("sm")]: {
    left: "0px",
    width: "100%",
  },
};

const containerItems: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  padding: "100px 14px 0px 14px",
  gap: "5px",
};

const containerAppbar = (opened: boolean): CSSProperties => {
  return {
    position: "fixed",
    width: "calc(100% - 280px)",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "black",
    backdropFilter: "blur(6px)",
    padding: "0px 40px",

    [themeConfig.breakpoints.down("sm")]: {
      width: "100%",
      minHeight: opened ? "100vh" : "auto",
    },
  };
};

const containerItem = (activated: boolean) => {
  return {
    display: "flex",
    width: "100%",
    height: "46px",
    padding: "12px 14px",
    justifyItems: "center",
    alignItems: "center",
    backgroundColor: activated ? "primary.light" : "white",
    borderRadius: "8px",
    color: activated ? "primary.main" : "rgb(99, 115, 129)",
    "&:hover": {
      backgroundColor: "grey.50",
    },
  };
};

const containerUserInfo: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  margin: "12px 22px",
};

const containerMenu = {
  overflow: "visible",
  filter: "drop-shadow(0px 0px 8px 0px rgba(0, 0, 0, .2))",
  mt: "43px",
  borderRadius: "12px",
  width: "200px",
  padding: "0px",
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 20,
    width: 10,
    height: 10,
    backgroundColor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

const menuItem: CSSProperties = {
  margin: "8px 8px",
  borderRadius: "6px",
};

const iconItem = (activated: boolean): CSSProperties => {
  return {
    display: "flex",
    marginRight: "16px",
    opacity: activated ? 1 : 0.7,
  };
};

const iconBranding: CSSProperties = {
  marginTop: "30px",
  textDecoration: "none",
};

const iconNavResponsible: CSSProperties = {
  [themeConfig.breakpoints.up("sm")]: {
    display: "none",
  },
};

const textUp: CSSProperties = {
  textTransform: "capitalize",
};

export const style = {
  toolbar,
  container,
  containerLeft,
  containerRight,
  containerItems,
  containerItem,
  containerAppbar,
  containerMenu,
  containerUserInfo,
  iconItem,
  iconBranding,
  iconNavResponsible,
  menuItem,
  textUp,
};

export default { style };
