import { Flex } from "@chakra-ui/react";
import React from "react";

const Results = () => {
  return <Flex {...styles.wrapper}></Flex>;
};

export { Results };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: "3vh",
  },
};
