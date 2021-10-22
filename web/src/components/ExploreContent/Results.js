import { Flex } from "@chakra-ui/react";
import React from "react";
import { LoadingScreen } from "../LoadingScreen";

const Results = ({ isSearchLoading }) => {
  return (
    <Flex {...styles.wrapper}>{isSearchLoading && <LoadingScreen />}</Flex>
  );
};

export { Results };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: "3vh",
  },
};
