import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Logo = (props) => (
  <Link href="/">
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading} {...props}>
        Flavors
      </Heading>
    </Flex>
  </Link>
);

export { Logo };

// Styles

const styles = {
  wrapper: {},
  heading: {
    letterSpacing: "tighter",
    cursor: "pointer",
  },
};
