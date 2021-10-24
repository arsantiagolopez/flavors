import { Flex, Heading, Icon, ScaleFade, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";

const SuccessScreen = ({ index, lastIndex, formCompleteIndex }) => {
  const isCurrentScreen = index === lastIndex;
  const onboardSuccess = formCompleteIndex === lastIndex;

  const router = useRouter();

  useEffect(() => {
    if (isCurrentScreen && onboardSuccess) {
      // Redirect in 3 seconds
      setTimeout(() => {
        router.push("/account");
      }, 3000);
    }
  }, [onboardSuccess]);

  return (
    <Flex {...styles.wrapper}>
      <ScaleFade initialScale={0.2} in={isCurrentScreen}>
        <Flex direction="column" justify="center" align="center">
          {/* Success icon */}
          <Icon as={RiCheckboxCircleFill} color="green.400" boxSize="7em" />

          {/* Header */}
          <Heading {...styles.heading}>Everything looks right.</Heading>

          {/* Call to action */}
          <Text {...styles.text}>Now go taste new flavors!</Text>
        </Flex>
      </ScaleFade>
    </Flex>
  );
};

export { SuccessScreen };

// Styles

const styles = {
  wrapper: {
    justify: "center",
    align: "center",
    direction: "row",
    width: "100%",
    height: "100%",
    // minHeight: { base: "80vh", md: "80vh" },
  },
  heading: {
    color: "gray.700",
    fontSize: { base: "2.2em", md: "3.5em" },
    letterSpacing: "-2px",
    lineHeight: "1em",
    marginY: "0.25em",
  },
  text: {
    color: "gray.500",
    fontSize: { base: "1rem", md: "1em" },
    marginY: "0.5em",
  },
};
