import { ApolloClient, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import InitializeApp from "./app/InitializeApp";
import cache from "./cache";
import CONFIG from "./config/config";
import * as serviceWorker from "./serviceWorker";

/* ----------------       Apollo Client      --------------------- */
// As long as the website is served by the same node image, same-origin is valid in production
const client = new ApolloClient({
  cache,
  credentials: CONFIG.nodeEnv === "production" ? "same-origin" : "include",
  uri: CONFIG.serverUri,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <InitializeApp />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
