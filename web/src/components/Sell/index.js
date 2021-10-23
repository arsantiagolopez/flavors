import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Sell = () => {
  return (
    <Flex {...styles.wrapper}>
      <Heading>Sell</Heading>
      <Link href="/sell/create">
        <Button>Create listing</Button>
      </Link>
    </Flex>
  );
};

export { Sell };

// Styles

const styles = {
  wrapper: {
    direction: "column",
  },
  sidebar: {},
  content: {},
};
