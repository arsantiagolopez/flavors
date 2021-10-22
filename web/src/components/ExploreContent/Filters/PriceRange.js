import { Flex } from "@chakra-ui/react";
import React from "react";

const PriceRange = () => {
  const options = [
    {
      name: "cheap",
      label: "$",
    },
    {
      name: "normal",
      label: "$$",
    },
    {
      name: "expensive",
      label: "$$$",
    },
  ];
  return <Flex {...styles.wrapper}></Flex>;
};

export { PriceRange };

// Styles

const styles = {
  wrapper: {},
};
