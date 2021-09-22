import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Referrals = () => {
  const router = useRouter();

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.top}>
        <ArrowBackIcon onClick={() => router.back()} {...styles.backIcon} />
        <Heading {...styles.heading}>Referrals</Heading>
      </Flex>
    </Flex>
  );
};

export { Referrals };

// Styles

const styles = {
  wrapper: {
    direction: "column",
  },
  top: {
    display: { base: "flex", md: "none" },
    direction: "row",
    justify: "center",
    align: "center",
    marginTop: "1em",
  },
  backIcon: {
    position: "absolute",
    left: "0",
    marginLeft: "0.5em",
    fontSize: "3xl",
    cursor: "pointer",
  },
  heading: {
    fontSize: "2xl",
  },
};
