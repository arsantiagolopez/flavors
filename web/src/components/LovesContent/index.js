import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const LovesContent = ({ user }) => {
  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.title}>Loves</Heading>
      <Flex {...styles.content}>Howdy</Flex>
    </Flex>
  );
};

export { LovesContent };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "1em", md: "7vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
  title: {
    fontSize: { base: "3xl", md: "5xl" },
    isTruncated: true,
    width: "100%",
    paddingBottom: "2vh",
  },
  content: {},
};
