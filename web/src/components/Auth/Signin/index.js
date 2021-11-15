import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDimensions } from "../../../utils/useDimensions";
import { Logo } from "../../Logo";
import { ErrorModal } from "../ErrorModal";
import { EmailSent } from "./EmailSent";
import { Form } from "./Form";

const Signin = ({ providers }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState(null);
  const [screenHeight, setScreenHeight] = useState(null);

  const { height } = useDimensions();

  const formProps = { providers, setIsEmailSent, setEmail };
  const emailSentProps = { setIsEmailSent, email };

  // Update height post SSR fetch to allow
  // height CSS to work on mount
  useEffect(() => setScreenHeight(height), [height]);

  return (
    <Flex {...styles.wrapper} height={screenHeight}>
      <Flex {...styles.content}>
        {!isEmailSent ? (
          <Form {...formProps} />
        ) : (
          <EmailSent {...emailSentProps} />
        )}

        {/* Footer */}
        <Flex {...styles.footer}>
          <Logo {...styles.logo} />
          <Text {...styles.disclaimer}>All rights reserved 2021</Text>
        </Flex>
      </Flex>

      {/* Desktop banner */}
      <Flex {...styles.banner}>
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

      {/* Error modal */}
      <ErrorModal />
    </Flex>
  );
};

export { Signin };

// Styles

const styles = {
  wrapper: {
    width: "100vw",
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
    minHeight: "30em",
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
    display: { base: "none", md: "flex" },
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
