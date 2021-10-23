import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { ExploreContent } from "../components/ExploreContent";
import { FilterSidebar } from "../components/ExploreContent/FilterSidebar";
import { Layout } from "../components/Layout";

const Explore = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const router = useRouter();

  const isExplore = true;
  const hideSidebar = !router?.query.search;

  const filterSidebarProps = {
    hidden: hideSidebar ? true : false,
    user,
  };

  const SidebarComponent = <FilterSidebar {...filterSidebarProps} />;

  const layoutProps = { user, SidebarComponent, isExplore };
  const contentProps = { user };

  return (
    <>
      <Head>
        <title>Flavors - Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <ExploreContent {...contentProps} />
      </Layout>
    </>
  );
};

export default Explore;
