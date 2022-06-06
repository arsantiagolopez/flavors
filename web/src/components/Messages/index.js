import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Messages = () => {
  return (
    <Flex {...styles.wrapper}>
      <Heading>Messages</Heading>
    </Flex>
  );
};

export { Messages };

// Styles

const styles = {
  wrapper: {},
  sidebar: {},
  content: {},
};
