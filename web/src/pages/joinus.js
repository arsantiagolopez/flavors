import { getProviders, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Signup } from "../components/Auth/Signup";
import { LoadingScreen } from "../components/LoadingScreen";

const JoinusPage = ({ providers }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  // Redirect to /dashboard if logged in
  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session]);

  const signupProps = { providers };
  const loadingScreenProps = { isFullScreen: true };

  // Only show page if not logged in
  if (!loading && !session) {
    return (
      <>
        <Head>
          <title>Flavors - Join us</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Signup {...signupProps} />
      </>
    );
  }

  // Show loading screen until session loaded
  return <LoadingScreen {...loadingScreenProps} />;
};

export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default JoinusPage;
