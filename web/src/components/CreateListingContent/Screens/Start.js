import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

// Screen index: 0

const StartScreen = ({ handleChange, setFormCompleteIndex }) => {
  // Unlock & swipe to next screen
  const handleNext = () => {
    setFormCompleteIndex(1);
    handleChange(1);
  };
  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading}>Create a listing</Heading>
      <Text {...styles.text}>
        The more detailed your listing is, the higher the chances of a sale.
      </Text>
      <Button onClick={handleNext} {...styles.next}>
        Ok, let's go
      </Button>
    </Flex>
  );
};

export { StartScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: "15vh",
    paddingX: { base: "2em", md: "none" },
    align: "center",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    color: "gray.800",
  },
  text: {
    color: "gray.600",
    paddingY: "3vh",
  },
  next: {
    width: "auto",
    padding: "1.75em",
    borderRadius: "0.5em",
  },
};
