import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import CONFIG from "./config/config";
import * as serviceWorker from "./serviceWorker";

/* ----------------       Apollo Client      --------------------- */
const authorizationLink = createHttpLink({
  uri: CONFIG.authorizationServerUri,
  credentials: "same-origin",
});
const learnLink = createHttpLink({
  uri: CONFIG.learnServerUri,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: split(
    (operation) => operation.getContext().version === 1,
    authorizationLink,
    learnLink
  ),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <InitializeApp />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
