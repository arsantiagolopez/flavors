import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { Layout } from "../components/Layout";
import { Sell } from "../components/Sell";

const SellPage = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const layoutProps = { user };

  return (
    <>
      <Head>
        <title>Flavors - Sell</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Sell />
      </Layout>
    </>
  );
};

export default SellPage;
