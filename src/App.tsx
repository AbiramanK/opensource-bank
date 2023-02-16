import { SnackbarProvider } from "notistack";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  Account,
  Customer,
  Dashboard,
  Login,
  Register,
  Transaction,
} from "src/screens";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/customers" element={<Customer />}></Route>
      <Route path="/accounts" element={<Account />}></Route>
      <Route path="/transactions" element={<Transaction />}></Route>
    </Route>
  )
);

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </React.Fragment>
  );
}
