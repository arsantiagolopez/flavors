import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { CreateListingContent } from "../../components/CreateListingContent";
import { Layout } from "../../components/Layout";

const CreateListingPage = () => {
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
        <CreateListingContent />
      </Layout>
    </>
  );
};

export default CreateListingPage;
