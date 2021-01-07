import { ApolloClient } from "@apollo/client";
import { LocalStorageWrapper, persistCacheSync } from "apollo3-cache-persist";

import cache from "./cache";
import CONFIG from "./config/config";

// As long as the website is served by the same node image, same-origin is valid in production
persistCacheSync({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

export const apolloClient = new ApolloClient({
  cache,
  credentials: CONFIG.nodeEnv === "production" ? "same-origin" : "include",
  uri: CONFIG.serverUri,
});
