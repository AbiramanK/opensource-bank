import React, { useState } from "react";
import { TextField, FormControlLabel, Checkbox, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";

import Layout from "./Layout";
import { convertFormDataEntryValueToString } from "src/utilities";
import { useLoginMutation } from "src/graphql-codegen/graphql";
import { useAuth } from "src/RootRouter";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const [login, { data, loading, error }] = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const username = convertFormDataEntryValueToString(data.get("username"));
    const password = convertFormDataEntryValueToString(data.get("password"));

    if (username !== "" && password !== "") {
      login({
        variables: {
          input: {
            email: username,
            password,
          },
        },
      });
    } else {
      enqueueSnackbar("Please fill all the required fields", {
        variant: "info",
      });
    }
  };

  if (error) {
    enqueueSnackbar(error?.message, { variant: "error" });
  }

  if (data! && !auth?.user) {
    enqueueSnackbar("Logged in successfully", { variant: "success" });
    auth.login(data!?.login!, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <Layout
      title="Login"
      handleSubmit={handleSubmit}
      submitButtonTitle="Login"
      leftLink="#"
      leftLinkText="Forgot password?"
      rightLink="/register"
      rightLinkText="Don't have an account? Register"
      submitButtonLoading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username / Email"
            name="username"
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="rememberMe" color="primary" />}
            label={"Remember me"}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
