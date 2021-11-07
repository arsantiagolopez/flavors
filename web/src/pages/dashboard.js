import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { DashboardContent } from "../components/DashboardContent";
import { Layout } from "../components/Layout";

const DashboardPage = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const layoutProps = { user };
  const contentProps = { user };

  return (
    <>
      <Head>
        <title>Flavors - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <DashboardContent {...contentProps} />
      </Layout>
    </>
  );
};

export default DashboardPage;
