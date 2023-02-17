import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { GRAPHQL_API } from "./configs";
import { AuthenticationOutput } from "./graphql-codegen/graphql";

const httpLink = createHttpLink({
  uri: GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = localStorage.getItem("user")! ?? "";
  // return the headers to the context so httpLink can read them
  if (user.trim() !== "") {
    let userObj: AuthenticationOutput = JSON.parse(user);
    let token = userObj?.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
