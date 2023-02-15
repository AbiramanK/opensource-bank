import React, { ReactNode } from "react";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { Copyright } from "src/components";

const theme = createTheme();

export interface ILayoutProps {
  title: string;
  handleSubmit: Function;
  submitButtonTitle: string;
  submitButtonLoading: boolean;
  leftLink?: string;
  leftLinkText?: string;
  rightLink?: string;
  rightLinkText: string;
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {props?.title}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                props?.handleSubmit(event)
              }
              sx={{ mt: 3 }}
            >
              {props?.children}
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={props?.submitButtonLoading}
                loading={props?.submitButtonLoading}
              >
                {props?.submitButtonTitle}
              </LoadingButton>
              <Grid
                container
                justifyContent={props?.leftLinkText ? "normal" : "flex-end"}
              >
                {props?.leftLinkText && (
                  <Grid item xs>
                    <Link href={props?.leftLink ?? "#"} variant="body2">
                      {props?.leftLinkText}
                    </Link>
                  </Grid>
                )}
                <Grid item>
                  <Link href={props?.rightLink ?? "#"} variant="body2">
                    {props?.rightLinkText}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ m: 5 }} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
