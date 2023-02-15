import { Typography, TypographyProps, Link } from "@mui/material";
import React from "react";

export interface ICopyrightProps extends TypographyProps {}

export default function Copyright(props: ICopyrightProps) {
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="#">
          Opensource Bank
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </React.Fragment>
  );
}
