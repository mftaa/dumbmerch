import {
    ApolloClient,
    InMemoryCache,
    split,
    NetworkStatus,
    ApolloLink,
  } from "@apollo/client";
  import { getMainDefinition } from "@apollo/client/utilities";
  import { WebSocketLink } from "@apollo/client/link/ws";
  import { setContext } from "@apollo/client/link/context";
  import { createUploadLink } from "apollo-upload-client";
  import cookie from "js-cookie";
  import { onError } from "@apollo/client/link/error";
  // import useSWR from "swr";
  
  const httpLink = createUploadLink({
    uri: `${process.env.GRAPHQL_URL}`,
  });
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (
          message.includes("jwt malformed") ||
          message.includes("UnAuthorized")
        ) {
          cookie.remove("eu-token");
          cookie.remove("eu-user");
  
          return;
        }
  
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  
  const wsLink = () =>
    process.browser
      ? new WebSocketLink({
          uri: `${process.env.WS_URL}`,
          options: {
            reconnect: true,
            timeout: 60000,
            connectionParams: {
              Authorization: `Bearer ${cookie.get("eu-token")}`,
              authToken: cookie.get("eu-token"),
            },
          },
        })
      : null;
  
  const authLink = setContext(async (_, { headers }) => {
    const token = cookie.get("eu-token");
    return {
      headers: {
        ...headers,
        authorization: token
          ? `Bearer ${token}`
          : headers
          ? headers.authorization
          : "",
      },
    };
  });
  
  const links = ApolloLink.from([errorLink, authLink, httpLink]);
  
  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
  
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink(),
        links
      )
    : links;
  
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  };
  
  export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions,
  });
  
  export { NetworkStatus };
  