import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import {
  Delete,
  Email,
  Notifications,
  Password,
  Privacy,
  Profile,
  Referrals,
  Socials,
} from "../../components/AccountPages";
import { AccountSidebar as SidebarComponent } from "../../components/AccountPages/AccountSidebar";
import { Layout } from "../../components/Layout";

const AccountPages = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data, mutate } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  console.log("user", user);

  const router = useRouter();
  const { path } = router?.query;

  let content, title;

  const layoutProps = { user, SidebarComponent };
  const commonProps = { user, mutate };

  switch (path) {
    // Personal
    case "profile":
      title = "My Profile";
      content = <Profile {...commonProps} />;
      break;
    // Security
    case "email":
      content = <Email />;
      break;
    case "password":
      title = "Change My Password";
      content = <Password {...commonProps} />;
      break;
    case "socials":
      content = <Socials />;
      break;
    // Buying
    case "investments":
      // content = <Investments />;
      break;
    // Selling
    // Preferences
    case "notifications":
      content = <Notifications />;
      break;
    case "privacy":
      content = <Privacy />;
      break;
    case "referrals":
      content = <Referrals />;
      break;
    case "delete":
      title = "Delete My Data";
      content = <Delete />;
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

AccountPages.isProtected = true;

export default AccountPages;
