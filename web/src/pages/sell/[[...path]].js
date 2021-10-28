import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Layout } from "../../components/Layout";
import {
  Listings,
  Menus,
  SellerProfile,
  SellSidebar,
  Subscriptions,
} from "../../components/SellContent";

// @todo: {isSeller ? <SellerProfile {...sellerProfileProps} /> : <SellerOnboard />}

const SellPages = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const router = useRouter();
  const { path } = router?.query || {};

  let title,
    content = null;

  const isSell = true;
  const SidebarComponent = <SellSidebar />;

  const layoutProps = { user, SidebarComponent, isSell };
  const contentProps = { user };

  switch (path) {
    case undefined:
      title = "My Seller Profile";
      content = <SellerProfile {...contentProps} />;
      break;
    case "listings":
      title = "My Listings";
      content = <Listings {...contentProps} />;
      break;
    case "menus":
      title = "My Menus";
      content = <Menus {...contentProps} />;
      break;
    case "subscriptions":
      title = "My Subscriptions";
      content = <Subscriptions {...contentProps} />;
      break;
  }

  return (
    <>
      <Head>
        <title>Flavors - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>{content}</Layout>
    </>
  );
};

// SellPages.isProtected = true;

export default SellPages;
