import { Flex, Heading, Icon, ScaleFade, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { useDelay } from "../../../utils/useDelay";

// Screen index: 5

const SuccessScreen = ({ index, lastIndex, formCompleteIndex }) => {
  const isCurrentScreen = index === lastIndex;
  const isFormCompleted = formCompleteIndex === lastIndex;

  const wrapperRef = useRef(null);

  const router = useRouter();

  // Redirect on complete
  useEffect(async () => {
    if (isCurrentScreen && isFormCompleted) {
      wrapperRef?.current.scrollIntoView({ behavior: "smooth" });
      await useDelay();
      // router.push("/");
    }
  }, [isFormCompleted]);

  return (
    <Flex ref={wrapperRef} {...styles.wrapper}>
      <ScaleFade initialScale={0.2} in={isCurrentScreen}>
        <Flex {...styles.content}>
          <Icon as={RiCheckboxCircleFill} {...styles.icon} />
          <Heading {...styles.heading}>Everything looks right!</Heading>
          <Text {...styles.text}>Let's see your live post.</Text>
        </Flex>
      </ScaleFade>
    </Flex>
  );
};

export { SuccessScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "7vh", md: "15vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  content: {
    direction: "column",
    justify: "center",
    align: "center",
  },
  icon: {
    color: "green.400",
    boxSize: "7em",
  },
  heading: {
    marginY: "2vh",
  },
  text: {
    color: "gray.500",

    // fontSize: { base: "1rem", md: "1em" },
  },
};
