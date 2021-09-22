import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { OAuthOnboard } from "../components/OAuthOnboard";

const NewUserPage = () => {
  const { data } = useSession();
  const { user } = data || {};

  const oauthOnboardProps = { user };

  return (
    <>
      <Head>
        <title>Flavors - Almost there...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OAuthOnboard {...oauthOnboardProps} />
    </>
  );
};

NewUserPage.isProtected = true;

export default NewUserPage;
