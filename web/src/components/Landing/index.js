import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDimensions } from "../../utils/useDimensions";
import { Logo } from "../Logo";
import { GetTheApp } from "./GetTheApp";

const Landing = () => {
  const [screenHeight, setScreenHeight] = useState();

  const { height, width } = useDimensions();

  const isPortrait = height > width;

  // Update height post SSR fetch to allow
  // height CSS to work on mount
  useEffect(() => setScreenHeight(height), [height]);

  return (
    <Flex {...styles.wrapper}>
      {/* Call to action */}
      <Flex
        // marginTop={isPortrait ? "-6em" : "-3em"}
        marginTop="-3em"
        height={screenHeight}
        {...styles.landingScreen}
      >
        {/* Absolutely positioned call to action */}
        <Flex {...styles.callToAction}>
          <Flex {...styles.logo}>
            <Logo color="white" />
          </Flex>

          <Heading {...styles.meta}>
            Less risk. {isPortrait && <br />}
            Higher returns. <br />
            Emotionless trading.
          </Heading>

          <Flex {...styles.buttons}>
            <Link href="/signin">
              <Button {...styles.button} {...styles.signin}>
                Sign in
              </Button>
            </Link>
            <Link href="/joinus">
              <Button {...styles.button} {...styles.joinus}>
                Join us
              </Button>
            </Link>
          </Flex>
        </Flex>

        {/* Background video */}
        <video autoPlay muted loop style={styles.video}>
          <source src="/video/landing.mp4" type="video/mp4" />
        </video>
      </Flex>

      {/* How it works */}
      <Flex
        id="howitworks"
        minHeight={screenHeight}
        {...styles.section}
        {...styles.howItWorks}
      >
        <Heading {...styles.title}>How it works</Heading>
      </Flex>

      {/* Last months */}
      <Flex
        id="lastmonths"
        minHeight={screenHeight}
        {...styles.section}
        {...styles.lastMonths}
      >
        <Heading {...styles.title} color="white">
          Last months
        </Heading>
      </Flex>

      {/* Get the app */}
      <GetTheApp screenHeight={screenHeight} />

      {/* Tell a friend */}
      <Flex
        id="tellafriend"
        minHeight={screenHeight}
        {...styles.section}
        {...styles.tellAfriend}
      >
        <Heading {...styles.title}>Tell a friend</Heading>
      </Flex>
    </Flex>
  );
};

export { Landing };

// Styles

const styles = {
  wrapper: {
    width: "100vw",
    direction: "column",
  },
  landingScreen: {
    position: "relative",
    width: "100%",
    direction: "column",
  },
  callToAction: {
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "100%",
    direction: "column",
    justify: { base: "flex-end", md: "center" },
    align: { base: "flex-start", md: "center" },
    padding: "7vw",
    paddingBottom: { base: "max(4em, 5vw)", md: "none" },
  },
  logo: {
    display: { base: "flex", md: "none" },
  },
  meta: {
    color: "heading",
    fontSize: { base: "4xl", md: "5vw" },
    letterSpacing: "tighter",
    marginBottom: { base: "1em", md: "1vw" },
    textAlign: { base: "left", md: "center" },
  },
  buttons: {
    direction: "row",
  },
  button: {
    borderRadius: "1.5em",
    size: "lg",
    marginRight: "2",
    paddingY: "1.5em",
    paddingX: { base: "1.5em", md: "2em" },
  },
  signin: {
    variant: "outline",
    color: "white",
    borderColor: "white",
    _hover: {
      borderColor: "gray.800",
      background: "gray.800",
    },
    _active: {
      borderColor: "gray.300",
      background: "gray.300",
    },
  },
  joinus: {
    variant: "solid",
    background: "white",
    color: "black",
    _hover: {
      background: "gray.800",
      color: "white",
    },
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
    filter: "brightness(80%)",
  },
  section: {
    direction: "column",
    paddingY: "4em",
    paddingX: "1em",
  },
  howItWorks: {},
  title: {
    width: "100%",
    color: "gray.800",
    fontSize: { base: "4xl", md: "4vw" },
    letterSpacing: "tighter",
    textAlign: "center",
  },
  lastMonths: {
    background: "rgba(0,0,10,0.8)",
  },
  tellAfriend: {},
};
