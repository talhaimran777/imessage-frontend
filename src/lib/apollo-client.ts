import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
      createClient({
        url: "ws://localhost:5000/graphql",
      })
    )
    : null;

const httpLink = new HttpLink({
  uri: `http://localhost:5000/graphql`,
});

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" &&
          def.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
    : httpLink;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('userId'),
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});
