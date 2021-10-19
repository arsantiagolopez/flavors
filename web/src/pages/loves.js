import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { Layout } from "../components/Layout";
import { Loves } from "../components/Loves";

const LovesPage = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const layoutProps = { user };

  return (
    <>
      <Head>
        <title>Flavors - Loves</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Loves />
      </Layout>
    </>
  );
};

export default LovesPage;
