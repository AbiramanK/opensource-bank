import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RootRouter from "src/RootRouter";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <RootRouter />
        </Router>
      </SnackbarProvider>
    </React.Fragment>
  );
}
