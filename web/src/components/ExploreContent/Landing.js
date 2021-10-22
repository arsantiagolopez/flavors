import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Landing = () => {
  return (
    <Flex {...styles.wrapper}>
      <Heading>You might like</Heading>
      <Heading>All categories</Heading>
    </Flex>
  );
};

export { Landing };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: "3vh",
  },
};
