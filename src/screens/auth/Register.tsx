import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useSnackbar } from "notistack";

import Layout from "./Layout";
import { convertFormDataEntryValueToString } from "src/utilities";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [designation, setDesignation] = React.useState("");

  const handleDesignationChange = (event: SelectChangeEvent) => {
    setDesignation(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const firstName = convertFormDataEntryValueToString(data.get("firstName"));
    const lastName = convertFormDataEntryValueToString(data.get("lastName"));
    const username = convertFormDataEntryValueToString(data.get("userName"));
    const email = convertFormDataEntryValueToString(data.get("email"));
    const password = convertFormDataEntryValueToString(data.get("password"));
    const designation = convertFormDataEntryValueToString(
      data.get("designation")
    );

    if (
      firstName !== "" &&
      lastName !== "" &&
      username !== "" &&
      email !== "" &&
      password !== "" &&
      designation !== ""
    ) {
    } else {
      enqueueSnackbar("Please fill all the required fields", {
        variant: "info",
      });
    }
  };

  return (
    <Layout
      title="Register"
      handleSubmit={handleSubmit}
      submitButtonTitle="Register"
      rightLink="/login"
      rightLinkText="Already have an account? Login"
      submitButtonLoading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
          <FormControl fullWidth>
            <InputLabel id="designation-label">Designnation *</InputLabel>
            <Select
              required
              labelId="designation-label"
              id="designation"
              value={designation}
              label="Designation"
              name="designation"
              onChange={handleDesignationChange}
            >
              <MenuItem value={"customer"}>Customer</MenuItem>
              <MenuItem value={"banker"}>Banker</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="agreement" color="primary" />}
            label={
              <Typography>
                I agree to the <Link href="#">Terms & Conditions</Link> and{" "}
                <Link href="#">Privacy Policy</Link>.
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
