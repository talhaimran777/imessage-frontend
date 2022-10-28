import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
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

/* const wsLink = new GraphQLWsLink( */
/*   createClient({ */
/*     url: "ws://localhost:5000/graphql/subscriptions", */
/*     connectionParams: async () => ({ */
/*       session: await getSession(), */
/*     }), */
/*   }) */
/* ); */
/**/
/* const httpLink = new HttpLink({ */
/*   uri: `http://localhost:5000/graphql`, */
/*   credentials: "include", */
/* }); */
/**/
/* const link = */
/*   typeof window !== "undefined" && wsLink != null */
/*     ? split( */
/*         ({ query }) => { */
/*           const def = getMainDefinition(query); */
/*           return ( */
/*             def.kind === "OperationDefinition" && */
/*             def.operation === "subscription" */
/*           ); */
/*         }, */
/*         wsLink, */
/*         httpLink */
/*       ) */
/*     : httpLink; */
/**/
/* export const client = new ApolloClient({ */
/*   link, */
/*   cache: new InMemoryCache(), */
/* }); */


export const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
