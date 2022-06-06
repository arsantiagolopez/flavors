import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Landing = () => {
  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.suggestions}>
        <Flex {...styles.header}>
          <Heading {...styles.heading}>You might like</Heading>
          <Heading {...styles.title}>A banana with some coffee</Heading>
        </Flex>
        <Box {...styles.imageWrapper}>
          <Image
            src="/hero/suggestions.jpg"
            alt="Flavors"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority="true"
            placeholder="blur"
          />
        </Box>
      </Flex>

      <Heading>All categories</Heading>
    </Flex>
  );
};

export { Landing };

// Styles

const styles = {
  wrapper: {
    direction: "column",
  },
  suggestions: {
    position: "relative",
    direction: "column",
    height: "40vh",
    width: "100%",
    borderRadius: "0.5em",
    boxShadow: "lg",
    marginY: "2vh",
  },
  header: {
    direction: "column",
    padding: "3vh",
  },
  heading: {
    color: "yellow.600",
    textTransform: "uppercase",
    fontSize: { base: "md", md: "lg" },
    letterSpacing: "wide",
  },
  title: {
    color: "white",
    fontSize: { base: "3xl", md: "4xl" },
    paddingY: { base: "1", md: "1vh" },
    letterSpacing: "tighter",
  },
  imageWrapper: {
    zIndex: "-1",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: "0.5em",
    overflow: "hidden",
  },
};
