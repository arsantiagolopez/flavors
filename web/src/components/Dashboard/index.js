import { Flex } from "@chakra-ui/react";
import React from "react";

const DashboardContent = () => {
  return <Flex {...styles.wrapper}></Flex>;
};

export { DashboardContent };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
  },
};
