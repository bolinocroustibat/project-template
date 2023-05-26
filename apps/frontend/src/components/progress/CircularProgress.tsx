import { FC } from "react";
import { Box, CircularProgress as MUICircularProgress } from "@mui/material";

import { style } from "@components/progress/_circularProgressStyle";

/**
 * Circular Progress properties
 */
interface ICircularProgressProps {
  centred?: boolean;
}

/**
 * Circular progress component
 */
const CircularProgress: FC<ICircularProgressProps> = (props) => {
  return (
    <Box sx={props.centred ? style.container : undefined}>
      <MUICircularProgress color={"primary"} size={80} />
    </Box>
  );
};

export default CircularProgress;
