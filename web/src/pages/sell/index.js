import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { Layout } from "../../components/Layout";
import { LoadingScreen } from "../../components/LoadingScreen";
import { SellerOnboardContent } from "../../components/SellerOnboardContent";
import SellPages from "./[path]";

const SellPage = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const layoutProps = { user };
  const contentProps = { user };

  // Show loading while user loads
  if (!data) {
    return <LoadingScreen isFullScreen={true} />;
  }

  // Show seller dashboard if isSeller, default to orders
  if (user?.isSeller) {
    return <SellPages />;
  }

  return (
    <>
      <Head>
        <title>Flavors - Seller Onboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <SellerOnboardContent {...contentProps} />
      </Layout>
    </>
  );
};

export default SellPage;
