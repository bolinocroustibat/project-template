import { CSSProperties } from "react";

import { themeConfig } from "@configs/ThemeConfig";

const container = (minHeight: string) => {
  return {
    display: "flex",
    minHeight,
  };
};

const containerInfo: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const containerIcon: CSSProperties = {
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "right",

  [themeConfig.breakpoints.between(900, 1180)]: {
    display: "none",
  },
};

const textVariationUnit: CSSProperties = {
  maxHeight: "20px",
  overflow: "hidden",
};

export const style = {
  container,
  containerInfo,
  containerIcon,
  textVariationUnit,
};

export default { style };
