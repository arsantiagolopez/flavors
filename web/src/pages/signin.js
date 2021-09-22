import { getProviders, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Signin } from "../components/Auth/Signin";
import { LoadingScreen } from "../components/LoadingScreen";

const SigninPage = ({ providers }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  // Redirect to /dashboard if logged in
  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session]);

  const signinProps = { providers };

  // Only show page if not logged in
  if (!loading && !session) {
    return (
      <>
        <Head>
          <title>Flavors - Sign in</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Signin {...signinProps} />
      </>
    );
  }

  // Show loading screen until session loaded
  return <LoadingScreen />;
};

export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SigninPage;
