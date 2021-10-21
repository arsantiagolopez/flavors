import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { SearchBar } from "../SearchBar";

const ExploreContent = () => {
  return (
    <Flex {...styles.wrapper}>
      <Heading>Find food near you</Heading>
      <Flex {...styles.content}>
        <SearchBar />
        <Heading>You might like</Heading>
        <Heading>All categories</Heading>
      </Flex>
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
  },
  content: {
    direction: "column",
    paddingY: "3vh",
  },
};
