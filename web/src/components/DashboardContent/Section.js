import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

const Section = ({ heading, items }) => {
  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading}>{heading}</Heading>

      <Flex {...styles.items}>
        {items?.map((item) => (
          <Card key={item?.id} card={item} />
        ))}
      </Flex>
      <Flex {...styles.shadows} />
    </Flex>
  );
};

export { Section };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
  },
  heading: {
    fontSize: { base: "3xl", md: "5xl" },
    width: "100%",
  },
  items: {
    direction: "row",
    height: "100%",
    width: "100vw",
    marginLeft: { base: "-1em", md: "-20vw" },
    paddingLeft: { base: "1em", md: "20vw" },
    paddingRight: { base: "1em", md: "10vw" },
    overflow: "scroll",
    marginY: { base: "2vh", md: "3vh" },
  },
  shadows: {
    height: "85%",
    width: "100vw",
    pointerEvents: "none",
    position: "absolute",
    right: "0",
    bottom: "0",
    marginRight: { base: "-1em", md: "-20vw" },
    boxShadow: "inset 15vw 0 5vw -10vw white, inset -15vw 0 10vw -10vw white",
  },
};
