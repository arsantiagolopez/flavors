import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Landing } from "./Landing";
import { Results } from "./Results";
import { SearchBar } from "./SearchBar";

const ExploreContent = ({ user, searchValue, setSearchValue }) => {
  const resultsProps = { searchValue, setSearchValue };
  const landingProps = { searchValue, setSearchValue };
  const searchBarProps = { searchValue, setSearchValue };

  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading}>
        {searchValue ? searchValue : "Find food near you"}
      </Heading>

      <SearchBar {...searchBarProps} />

      {searchValue ? (
        <Results {...resultsProps} />
      ) : (
        <Landing {...landingProps} />
      )}
    </Flex>
  );
};

export { ExploreContent };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    minHeight: { base: "90vh", md: "80vh" },
    paddingY: { base: "1em", md: "7vh" },
    marginBottom: "2vh",
    isTruncated: true,
    paddingX: "1",
  },
  heading: {
    fontSize: { base: "2xl", md: "5xl" },
    paddingBottom: "3vh",
  },
};
