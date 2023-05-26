import { FC } from "react";
import { Box, Paper, Typography } from "@mui/material";

import { style } from "@domains/dashboard/components/card/_cardStyle";

/**
 * Card properties
 */
interface ICardProps {
  data: {
    title: string;
    value: string;
    variation: string;
    variationUnit: string;
    icon: JSX.Element;
  };
}

/**
 * Card component
 * @constructor
 */
const Card: FC<ICardProps> = (props) => {
  return (
    <Paper sx={style.container(props.data.value.length ? "0" : "200px")}>
      {/* INFO TEXT */}
      <Box sx={style.containerInfo}>
        {/* TITLE */}
        <Typography variant={"subtitle2"}>{props.data.title}</Typography>

        {/* VALUE */}
        <Typography mr={"2px"} variant={"h3"}>
          {props.data.value}
        </Typography>

        {/* VARIATION */}
        <Box display={"flex"}>
          <Typography mr={"4px"} variant={"subtitle2"}>
            {props.data.variation}
          </Typography>
          <Typography sx={style.textVariationUnit} color={"grey.700"}>
            {props.data.variationUnit}
          </Typography>
        </Box>
      </Box>

      {/* ICON */}
      <Box sx={style.containerIcon}>{props.data.icon}</Box>
    </Paper>
  );
};

export default Card;
