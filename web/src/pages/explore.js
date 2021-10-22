import Head from "next/head";
import React, { useState } from "react";
import useSWR from "swr";
import { ExploreContent } from "../components/ExploreContent";
import { FilterSidebar } from "../components/ExploreContent/FilterSidebar";
import { Layout } from "../components/Layout";

const Explore = () => {
  const [searchValue, setSearchValue] = useState(null);

  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data, mutate } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const isExplore = true;

  const filterSidebarProps = {
    hidden: searchValue === "" || searchValue === null ? true : false,
    setSearchValue,
  };

  const SidebarComponent = <FilterSidebar {...filterSidebarProps} />;

  const layoutProps = { user, SidebarComponent, isExplore };
  const contentProps = { user, searchValue, setSearchValue };

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
