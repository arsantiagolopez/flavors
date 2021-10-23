import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { Landing } from "./Landing";
import { Results } from "./Results";
import { SearchBar } from "./SearchBar";

const ExploreContent = ({ user }) => {
  const [searchValue, setSearchValue] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const router = useRouter();

  // Update search value on initial page mount
  useEffect(() => {
    const search = router?.query.search;
    if (search) setSearchValue(search);
  }, [router]);

  const resultsProps = { searchValue, setSearchValue, isSearchLoading };
  const landingProps = { searchValue, setSearchValue };
  const searchBarProps = {
    searchValue,
    setSearchValue,
    isSearchLoading,
    setIsSearchLoading,
  };

  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading}>
        {searchValue ? searchValue : "Find food near you"}
      </Heading>

      <SearchBar {...searchBarProps} />

      {router?.query.search ? (
        <Results {...resultsProps} />
      ) : (
        <Landing {...landingProps} />
      )}
    </Flex>
  );
};

export { ExploreContent, FilterSidebar };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    maxWidth: "100%",
    minHeight: { base: "90vh", md: "80vh" },
    paddingY: { base: "1em", md: "7vh" },
    marginBottom: "2vh",
    paddingX: "1",
  },
  heading: {
    fontSize: { base: "2xl", md: "5xl" },
    paddingBottom: "3vh",
    isTruncated: true,
  },
};
