import { Flex, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading}>You might be lost.</Heading>
      <Heading {...styles.subHeading}>
        You&apos;ve arrived at a page that doesn&apos;t exist... the sadness.
      </Heading>
      <Link onClick={() => router.back()} {...styles.link}>
        Go back
      </Link>
    </Flex>
  );
};

export default ErrorPage;

// Styles

const styles = {
  wrapper: {
    direction: "column",
    height: "100vh",
    justify: "center",
    align: "center",
  },
  heading: {
    fontSize: { base: "4xl", md: "7xl" },
  },
  subHeading: {
    fontSize: { base: "sm", md: "xl" },
    paddingY: { base: "0.5em", md: "1em" },
    textAlign: "center",
  },
  link: {
    color: "red.600",
  },
};
