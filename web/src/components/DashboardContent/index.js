import { Divider, Flex } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { Reactions } from "./Reactions";
import { Section } from "./Section";

const DashboardContent = ({ user }) => {
  const { data } = useSWR("/api/plates/");
  const { plates } = data || {};

  // @todo

  const available = plates ? [plates[2]] : [];

  const featured = plates ?? [];

  const reactions = [
    {
      emoji: "🎉",
      items: plates ? plates.slice(5, 8) : [],
    },
    {
      emoji: "🥳",
      items: plates ? plates.slice(1, 6) : [],
    },
    {
      emoji: "🙁",
      items: plates ? plates.slice(2, 5) : [],
    },
  ];

  const bestSellers = plates ? plates.slice(2, 8) : [];

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.content}>
        <Section heading="Available now 🍴" items={available} />

        <Divider {...styles.divider} />

        <Section heading="Order again" items={featured} />

        <Divider {...styles.divider} />

        <Reactions items={reactions} />

        <Divider {...styles.divider} />

        <Section heading="Today's best sellers" items={bestSellers} />
      </Flex>
    </Flex>
  );
};

export { DashboardContent };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    maxWidth: "100%",
    minHeight: { base: "90vh", md: "80vh" },
    paddingY: { base: "1em", md: "7vh" },
    marginBottom: "2vh",
  },
  content: {
    direction: "column",
    height: "100%",
  },
  divider: {
    marginTop: "0",
    marginBottom: "3vh",
  },
};
