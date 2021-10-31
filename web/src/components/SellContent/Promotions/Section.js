import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Promotion } from "./Promotion";

const Section = ({ heading, type, items }) => {
  return (
    <Flex {...styles.section}>
      <Flex {...styles.header}>
        <Heading {...styles.heading}>{heading}</Heading>
      </Flex>
      <Flex {...styles.items}>
        {items?.map((item) => (
          <Promotion key={item?.id} promotion={item} />
        ))}
      </Flex>
    </Flex>
  );
};

export { Section };

// Styles

const styles = {
  section: {
    positon: "relative",
    direction: "column",
    height: "fit-content",
    marginRight: "0",
    overflowX: "scroll",
  },
  header: {
    zIndex: "100",
    position: "sticky",
    top: "0",
    left: "0",
    justify: "space-between",
    width: "100%",
  },
  heading: {
    fontSize: { base: "2xl", md: "3xl" },
    // letterSpacing: "tight",
    width: "100%",
    isTruncated: true,
  },
  badge: {
    bg: "gray.800",
    color: "white",
    borderRadius: "0.5em",
    paddingX: "3",
    height: "1.75em",
    justify: "center",
    align: "center",
  },
  items: {
    direction: "row",
    height: "100%",
    width: "100%",
    paddingX: "2",
    marginX: "0",
    paddingY: "3vh",
  },
};
