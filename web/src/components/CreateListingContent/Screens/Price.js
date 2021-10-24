import { Flex } from "@chakra-ui/react";
import React from "react";

const PriceScreen = () => {
  return <Flex {...styles.wrapper}>Price</Flex>;
};

export { PriceScreen };

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
