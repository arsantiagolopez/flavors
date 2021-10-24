import { Flex } from "@chakra-ui/react";
import React from "react";

const DetailsScreen = () => {
  return <Flex {...styles.wrapper}>Details</Flex>;
};

export { DetailsScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: "10vh",
    paddingX: { base: "2em", md: "none" },
    align: "center",
    width: "100%",
  },
};
