import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
  titleProps?: TypographyProps;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      sx={{ ...props?.titleProps }}
    >
      {props.children}
    </Typography>
  );
}
