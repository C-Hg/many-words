import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import InitializeApp from "./app/InitializeApp";

import CONFIG from "./config/config";
import * as serviceWorker from "./serviceWorker";

/* ----------------       Apollo Client      --------------------- */
// As long as the website is served by the same node image, same-origin is valid in production
const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: CONFIG.nodeEnv === "production" ? "same-origin" : "include",
  uri: CONFIG.serverUri,
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
