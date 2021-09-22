import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import FadeIn from "react-fade-in";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SuccessfulSignupScreen = () => (
  <Flex {...styles.wrapper}>
    <FadeIn delay={500}>
      <Icon as={IoIosCheckmarkCircle} {...styles.icon} />

      <Heading {...styles.title}>Congrats! You're in.</Heading>

      <Flex {...styles.meta}>
        <Text>Now let's get you started with your application.</Text>
      </Flex>

      <Link href="/dashboard">
        <Button {...styles.button}>Next</Button>
      </Link>
    </FadeIn>
  </Flex>
);

export { SuccessfulSignupScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    justify: "center",
    align: "center",
    width: "100%",
    textAlign: "center",
    lineHeight: "1.5em",
    marginBottom: "5em",
  },
  icon: {
    fontSize: "5em",
    color: "green.500",
    marginY: "3",
  },
  title: {},
  meta: {
    direction: "column",
    paddingY: "1vh",
  },
  button: {
    variant: "solid",
    marginY: "1em",
  },
};
