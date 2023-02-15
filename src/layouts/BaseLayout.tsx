import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

export interface IBaseLayoutProps {
  children: React.ReactNode;
}

const mdTheme = createTheme();

export default function BaseLayout(props: IBaseLayoutProps) {
  return (
    <React.Fragment>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {props?.children}
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}
