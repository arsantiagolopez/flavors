import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { Landing } from "../components/Landing";
import { Layout } from "../components/Layout";

const Index = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const isLanding = true;

  const layoutProps = { user, isLanding };

  return (
    <>
      <Head>
        <title>Flavors - Emotionless Trading</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Landing />
      </Layout>
    </>
  );
};

export default Index;
