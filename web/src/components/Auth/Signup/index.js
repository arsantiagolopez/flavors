import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDimensions } from "../../../utils/useDimensions";
import { Logo } from "../../Logo";
import { Form } from "./Form";
import { SuccessfulSignupScreen } from "./SuccessfulSignupScreen";

const Signup = ({ providers }) => {
  const [screenHeight, setScreenHeight] = useState(null);
  const [isSignupSuccesful, setIsSignupSuccessful] = useState(null);

  const { height, width } = useDimensions();

  const isPortrait = height > width;

  // Update height post SSR fetch to allow
  // height CSS to work on mount
  useEffect(() => setScreenHeight(height), [height]);

  const formProps = { providers, setIsSignupSuccessful };

  return (
    <Flex {...styles.wrapper} height={screenHeight}>
      <Flex {...styles.content}>
        {!isSignupSuccesful ? (
          <Form {...formProps} />
        ) : (
          <SuccessfulSignupScreen />
        )}

        {/* Footer */}
        <Flex {...styles.footer}>
          <Logo {...styles.logo} />
          <Text {...styles.disclaimer}>All rights reserved 2021</Text>
        </Flex>
      </Flex>

      {/* Desktop banner */}
      <Flex {...styles.banner} display={{ base: "none", md: "flex" }}>
        <Box {...styles.imageWrapper}>
          <Image
            src="/images/logo.png"
            alt="Flavors"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority="true"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export { Signup };

// Styles

const styles = {
  wrapper: {
    width: "100%",
    justify: "center",
  },
  content: {
    flex: 1,
    position: "relative",
    paddingX: { base: "2em", md: "5vw" },
    maxWidth: "40em",
    direction: "column",
    justify: "center",
    align: "flex-start",
    background: "white",
    height: "100%",
  },
  footer: {
    position: "absolute",
    bottom: "8vh",
    left: "0",
    direction: "column",
    justify: "center",
    align: "center",
    width: "100%",
  },
  logo: {
    paddingY: "3",
  },
  disclaimer: {
    fontSize: "10pt",
  },
  // Only on desktop
  banner: {
    flex: 2,
    justify: "center",
    align: "center",
    background: "brand",
  },
  imageWrapper: {
    position: "relative",
    width: "50%",
    height: "50%",
  },
};
