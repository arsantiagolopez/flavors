import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoPricetags } from "react-icons/io5";

// Screen index: 0

const StartScreen = ({ handleChange, setFormCompleteIndex }) => {
  // Unlock & swipe to next screen
  const handleNext = () => {
    setFormCompleteIndex(1);
    handleChange(1);
  };
  return (
    <Flex {...styles.wrapper}>
      <Icon as={IoPricetags} {...styles.icon} />
      <Text {...styles.text}>
        We need a bit more from you before you can make your first sale.
        Complete the seller onboarding.
      </Text>
      <Button onClick={handleNext} {...styles.next}>
        Ok, let's do it
      </Button>
    </Flex>
  );
};

export { StartScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "7vh", md: "10vh" },
    paddingX: { base: "2em", md: "none" },
    align: "center",
    width: "100%",
    textAlign: "center",
  },
  icon: {
    fontSize: "5em",
    color: "gray.200",
  },
  text: {
    color: "gray.600",
    paddingY: "3vh",
    maxWidth: { base: "100%", md: "30%" },
    textAlign: "center",
  },
  next: {
    width: "auto",
    padding: "1.75em",
    borderRadius: "0.5em",
  },
};
