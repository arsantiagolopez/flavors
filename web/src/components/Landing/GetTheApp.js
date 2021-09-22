import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { useInView } from "react-intersection-observer";

const FirstFeature = forwardRef(({ height }, ref) => (
  <Flex
    ref={ref}
    height={height}
    {...styles.screen}
    marginTop={(height / 3) * -1}
    // bg="red"
  >
    <Heading {...styles.heading}>Live updates</Heading>
    <Text {...styles.text}>
      Stay in the loop. Check your returns 24/7. At your own time.
    </Text>
  </Flex>
));

const SecondFeature = forwardRef(({ height }, ref) => (
  <Flex
    ref={ref}
    height={height}
    {...styles.screen}
    alignSelf="flex-end"
    // bg="blue"
  >
    <Heading {...styles.heading}>Something about push notifications</Heading>
    <Text {...styles.text}>
      Stay in the loop. Check your returns 24/7. At your own time.
    </Text>
  </Flex>
));

const ThirdFeature = forwardRef(({ height }, ref) => (
  <Flex
    ref={ref}
    height={height}
    {...styles.screen}
    // bg="red"
  >
    <Heading {...styles.heading}>Something about other mobile feature</Heading>
    <Text {...styles.text}></Text>
  </Flex>
));

const GetTheApp = ({ screenHeight }) => {
  const [firstRef, isFirstVisible] = useInView({
    // Set visible when half of the screen is scrolled
    threshold: 0.5,
  });
  const [secondRef, isSecondVisible] = useInView({
    threshold: 0.5,
  });
  const [thirdRef, isThirdVisible] = useInView({
    threshold: 0.5,
  });

  return (
    <Flex
      id="gettheapp"
      {...styles.wrapper}
      background="linear-gradient(0deg, rgba(235,235,235,1) 0%, rgba(255,255,255,1) 30%)"
    >
      {/* Title */}
      <Heading {...styles.title}>Stay up to date with the app</Heading>

      {/* Sticky iphone */}
      <Flex top={screenHeight / 5} {...styles.image}>
        {/* Iphone device */}
        <img
          // src="/images/iphone.png"
          src="/images/iphoneFull.png"
          style={styles.iphoneImage}
        />

        {/* Images inside the iphone */}
        {isFirstVisible && (
          <img src="/images/screen1.png" style={styles.iphoneScreen} />
        )}
        {isSecondVisible && (
          <img src="/images/screen2.png" style={styles.iphoneScreen} />
        )}
        {isThirdVisible && (
          <img src="/images/screen3.png" style={styles.iphoneScreen} />
        )}
      </Flex>

      {/* Screens */}
      <Flex {...styles.content} paddingBottom={screenHeight / 2}>
        <FirstFeature ref={firstRef} height={screenHeight} />

        <SecondFeature ref={secondRef} height={screenHeight} />

        <ThirdFeature ref={thirdRef} height={screenHeight} />
      </Flex>
    </Flex>
  );
};

export { GetTheApp };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: "6em",
    paddingX: "1em",
    position: "relative",
    width: "100%",
    height: "100%",
    align: "center",
  },
  title: {
    width: "100%",
    color: "gray.800",
    fontSize: { base: "4xl", md: "4vw" },
    letterSpacing: "tighter",
    textAlign: "center",
    paddingBottom: "5vh",
  },
  content: {
    direction: "column",
    width: "90%",
  },
  screen: {
    direction: "column",
    justify: "center",
    align: "flex-start",
    width: "50%",
    paddingX: "12%",
  },
  image: {
    position: "sticky",
    justify: "center",
  },
  iphoneImage: {
    zIndex: "5",
    width: "60vw",
  },
  iphoneScreen: {
    zIndex: "3",
    width: "14.5vw",
    bg: "red",
    position: "absolute",
    top: "5vh",
  },
  heading: {
    color: "red.400",
    size: "md",
  },
  text: {
    lineHeight: "1em",
    fontSize: "2vw",
    fontWeight: "bold",
  },
};
