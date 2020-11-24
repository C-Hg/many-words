import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import InitializeApp from "./app/InitializeApp";

import CONFIG from "./config/config";
import * as serviceWorker from "./serviceWorker";

/* ----------------       Apollo Client      --------------------- */
const authorizationLink = createHttpLink({
  uri: "http://server:4000/authorization",
  credentials: "same-origin",
});
const learnLink = createHttpLink({
  uri: CONFIG.learnServerUri,
  credentials: "same-origin",
});

// TODO: fix client init
const client = new ApolloClient({
  credentials: "include", // TODO: same-origin for production
  uri: "https://localhost:4000/authorization",
  // link: new HttpLink().split(
  //   (operation) => operation.operationName === "learn", // TODO: change client name, use context +++
  //   learnLink,
  //   authorizationLink
  // ),
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
