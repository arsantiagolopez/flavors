import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { AccountContent } from "../../components/AccountContent";
import { Layout } from "../../components/Layout";

const AccountPage = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const isAccount = true;
  const layoutProps = { user, isAccount };
  const accountContentProps = { user };

  return (
    <>
      <Head>
        <title>Flavors - My Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <AccountContent {...accountContentProps} />
      </Layout>
    </>
  );
};

AccountPage.isProtected = true;

export default AccountPage;
