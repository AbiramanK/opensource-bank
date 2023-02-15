import { Box, Toolbar } from "@mui/material";
import React from "react";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main(props: IMainProps) {
  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {props?.children}
      </Box>
    </React.Fragment>
  );
}
