import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { DashboardContent } from "../components/Dashboard";
import { Layout } from "../components/Layout";

const Index = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const isDashboard = true;

  const layoutProps = { user, isDashboard };

  return (
    <>
      <Head>
        <title>Flavors - Food Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <DashboardContent />
      </Layout>
    </>
  );
};

Index.isProtected = true;

export default Index;
