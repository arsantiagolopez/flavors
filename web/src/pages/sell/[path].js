import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Layout } from "../../components/Layout";
import {
  Listings,
  Menus,
  Orders,
  Promotions,
  Schedule,
  SellerProfile,
  SellSidebar,
} from "../../components/SellContent";

const SellPages = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const router = useRouter();
  const { path } = router?.query || {};

  let title,
    content = null;

  const SidebarComponent = <SellSidebar />;

  const layoutProps = { user, SidebarComponent };
  const contentProps = { user };

  switch (path) {
    case "orders":
      title = "Orders";
      content = <Orders {...contentProps} />;
      break;
    case "listings":
      title = "Listings";
      content = <Listings {...contentProps} />;
      break;
    case "menus":
      title = "Menus";
      content = <Menus {...contentProps} />;
      break;
    case "promotions":
      title = "Promotions";
      content = <Promotions {...contentProps} />;
      break;
    case "schedule":
      title = "Schedule";
      content = <Schedule {...contentProps} />;
      break;
    case "profile":
      title = "Seller Profile";
      content = <SellerProfile {...contentProps} />;
      break;
    default:
      title = "Orders";
      content = <Orders {...contentProps} />;
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
