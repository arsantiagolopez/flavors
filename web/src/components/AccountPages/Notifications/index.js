import { Flex } from "@chakra-ui/react";
import React from "react";

const Notifications = () => {
  return <Flex {...styles.wrapper}></Flex>;
};

export { Notifications };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
};
