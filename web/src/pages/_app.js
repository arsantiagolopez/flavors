import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { SWRConfig } from "swr";
import axios from "../axios";
import { ProtectedRoute } from "../components/ProtectedRoute";
import "../styles/geosuggest.css";
import "../styles/globals.css";
import "../styles/searchBar.css";
import theme from "../theme";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY.replace(
    /\\/g,
    ""
  );

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (url) => axios(url).then((res) => res.data),
        }}
      >
        <ChakraProvider theme={theme}>
          {Component.isProtected ? (
            <ProtectedRoute>
              <Head>
                <script
                  src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`}
                ></script>
              </Head>
              <Component {...pageProps} />
            </ProtectedRoute>
          ) : (
            <>
              {/* Testing */}
              <Head>
                <script
                  src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`}
                ></script>
              </Head>
              <Component {...pageProps} />
            </>
          )}
        </ChakraProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default MyApp;
