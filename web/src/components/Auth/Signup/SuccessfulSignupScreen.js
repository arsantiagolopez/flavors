import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import FadeIn from "react-fade-in";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDelay } from "../../../utils/useDelay";

const SuccessfulSignupScreen = ({ isSignupSuccesful }) => {
  const router = useRouter();
  useEffect(async () => {
    if (isSignupSuccesful) {
      await useDelay(5000);
      router.push("/dashboard");
    }
  }, [isSignupSuccesful]);
  return (
    <Flex {...styles.wrapper}>
      <FadeIn delay={500}>
        <Icon as={IoIosCheckmarkCircle} {...styles.icon} />

        <Heading {...styles.title}>Congrats! You're in.</Heading>

        <Text {...styles.meta}>Welcome to the food marketplace 🍴</Text>
      </FadeIn>
    </Flex>
  );
};

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
    paddingY: "2vh",
  },
};
