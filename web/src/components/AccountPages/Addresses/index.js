import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Addresses = () => {
  const router = useRouter();

  return <Flex {...styles.wrapper}></Flex>;
};

export { Addresses };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
};
