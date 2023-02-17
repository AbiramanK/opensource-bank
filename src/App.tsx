import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RootRouter from "src/RootRouter";
import { client } from "./graphq-client";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <RootRouter />
          </Router>
        </SnackbarProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}
