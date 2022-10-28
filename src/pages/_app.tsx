import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import {
  ApolloProvider
} from "@apollo/client";
import { apolloClient } from "../lib/apollo-client";

interface PROPS {
  session: Session
}

function MyApp({ Component, pageProps }: AppProps<PROPS >) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp
