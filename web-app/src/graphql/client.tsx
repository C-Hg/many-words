import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// TODO : 2 clients with uri as env; how to manage env variables with cra?
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
  }),
});
