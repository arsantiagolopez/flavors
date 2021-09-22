import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../Logo";

const Footer = () => (
  <Flex {...styles.wrapper}>
    <Logo {...styles.logo} />
    <Text {...styles.disclaimer}>All rights reserved 2021</Text>
  </Flex>
);

export { Footer };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    align: "center",
    justify: "center",
    height: "100%",
    color: "white",
    width: "100%",
    paddingY: "7vh",
    background: "rgba(0,0,10, 0.8)",
  },
  logo: {
    color: "white",
    fontSize: "18pt",
    letterSpacing: "tighter",
  },
  disclaimer: {
    fontSize: "10pt",
  },
};
