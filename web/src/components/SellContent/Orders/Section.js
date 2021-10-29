import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Order } from "./Order";

const Section = ({ heading, items }) => {
  return (
    <Flex {...styles.section}>
      <Flex {...styles.header}>
        <Heading {...styles.heading}>{heading}</Heading>
        <Flex {...styles.badge}>1</Flex>
      </Flex>
      <Flex {...styles.items}>
        {items?.map((item, index) => (
          <Order key={index} order={item} />
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
    flex: "1 1 25%",
    direction: "column",
    minHeight: { base: "25vh", md: "60vh" },
    maxHeight: { base: "25vh", md: "60vh" },
    height: "100%",
    marginRight: { base: "0", md: "1vw" },
    marginBottom: { base: "2vh", md: "0" },
    borderRadius: "0.5em",
    border: "0.5px solid",
    borderColor: "gray.100",
    overflow: "scroll",
  },
  header: {
    zIndex: "100",
    position: "sticky",
    top: "0",
    justify: "space-between",
    width: "100%",
    padding: "1vw",
    background:
      "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 100%)",
  },
  heading: {
    fontSize: { base: "2xl", md: "2xl" },
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
    direction: { base: "row", md: "column" },
    height: "100%",
    width: "100%",
    paddingX: { base: "2", md: "1vw" },
    paddingBottom: { base: "0", md: "1vw" },
  },
};
