import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Orders = () => {
  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.title}>Orders</Heading>
    </Flex>
  );
};

export { Orders };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "7vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
  title: {
    display: { base: "none", md: "block" },
    fontSize: { base: "3xl", md: "5xl" },
    isTruncated: true,
  },
};
