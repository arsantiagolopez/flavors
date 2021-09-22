import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { Layout } from "../components/Layout";

const Explore = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const layoutProps = { user };

  return (
    <>
      <Head>
        <title>Flavors - Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Heading>Explore</Heading>
      </Layout>
    </>
  );
};

export default Explore;
