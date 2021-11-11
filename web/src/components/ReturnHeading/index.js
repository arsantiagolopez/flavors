import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const ReturnHeading = ({ heading, onlyMobile, withProgress }) => {
  const router = useRouter();

  return (
    <Flex
      {...styles.wrapper}
      display={onlyMobile ? { base: "flex", md: "none" } : "flex"}
    >
      <ArrowBackIcon
        display={{ base: "block", md: "none" }}
        onClick={() => router.back()}
        {...styles.button}
      />
      <Heading {...styles.heading}>{heading}</Heading>
      {withProgress}
    </Flex>
  );
};

export { ReturnHeading };

// Styles

const styles = {
  wrapper: {
    direction: "row",
    justify: { base: "center", md: "flex-start" },
    align: "center",
    width: "100%",
    marginTop: { base: "1vh", md: "7vh" },
  },
  button: {
    position: "absolute",
    left: "0",
    fontSize: { base: "3xl", md: "4xl" },
    cursor: "pointer",
    marginTop: { base: "-2", md: "0" },
  },
  heading: {
    marginLeft: "0",
    fontSize: { base: "2xl", md: "5xl" },
    isTruncated: true,
  },
};
