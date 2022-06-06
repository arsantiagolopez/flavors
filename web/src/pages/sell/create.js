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
        <title>Flavors - Create A Plate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <CreateListingContent />
      </Layout>
    </>
  );
};

CreateListingPage.isProtected = true;

export default CreateListingPage;
