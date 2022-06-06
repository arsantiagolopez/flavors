import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { Listing } from "./Listing";
import useSWR from "swr"

const Listings = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { data } = useSWR("/api/plates")
  const { plates } = data || {}

  const searchProps = {
    searchValue,
    setSearchValue,
    isSearchLoading,
    setIsSearchLoading,
    isSearchActive,
    setIsSearchActive,
  };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        {!isSearchActive && <Heading {...styles.title}>Listings</Heading>}
        <SearchBar {...searchProps} />
      </Flex>

      <Flex {...styles.content}>
        <Flex {...styles.items}>
          <Listing isCreate />
          {plates?.map((item, index) => (
            <Listing key={item?.id} plate={item} index={index} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Listings };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "1em", md: "7vh" },
    width: "100%",
  },
  header: {
    direction: "row",
    justify: "space-between",
    align: "baseline",
    marginBottom: "2vh",
  },
  title: {
    fontSize: { base: "3xl", md: "5xl" },
    isTruncated: true,
    width: "100%",
    paddingBottom: "1vh",
  },
  content: {
    direction: { base: "column", md: "row" },
    height: "100%",
    maxWidth: "100%",
  },
  items: {
    direction: "row",
    wrap: "wrap",
    height: "100%",
    width: "100%",
    marginX: "0",
    // marginY: "5vh",
    paddingY: { base: "2vh", md: "3vh" },
  },
};
