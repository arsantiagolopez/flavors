import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDimensions } from "../../../utils/useDimensions";
import { Logo } from "../../Logo";
import { EmailSent } from "./EmailSent";
import { Form } from "./Form";

const BANNER_IMAGE_URL =
  // "https://images.unsplash.com/photo-1599422281620-143e425acfd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3300&q=80";
  // "https://images.pexels.com/photos/7031674/pexels-photo-7031674.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  // "https://images.pexels.com/photos/3753025/pexels-photo-3753025.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  // "https://images.pexels.com/photos/3530110/pexels-photo-3530110.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  "https://images.pexels.com/photos/1959387/pexels-photo-1959387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const Signin = ({ providers }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState(null);
  const [screenHeight, setScreenHeight] = useState();

  const { height } = useDimensions();

  const formProps = {
    providers,
    setIsEmailSent,
    setEmail,
  };

  const emailSentProps = {
    setIsEmailSent,
    email,
  };

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
      <Flex
        {...styles.banner}
        backgroundImage={`url(${BANNER_IMAGE_URL})`}
        display={{
          base: "none",
          // Hide banner on mobile landscape
          md: screenHeight < 500 ? "none" : "flex",
        }}
      >
        <Heading {...styles.title}>
          Algorithmic <br /> trading.
        </Heading>
      </Flex>
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
    color: "gray.200",
    fontSize: "18pt",
    paddingY: "3",
    letterSpacing: "tighter",
  },
  disclaimer: {
    fontSize: "10pt",
  },
  // Only on desktop
  banner: {
    flex: 2,
    justify: "center",
    align: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    color: "white",
    letterSpacing: "tight",
    fontSize: "5vw",
    textAlign: "center",
  },
};
