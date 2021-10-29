import {
  AspectRatio,
  Avatar,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Insights } from "./Insights";
import { Reactions } from "./Reactions";
import { SellingSuggestions } from "./SellingSuggestions";

const SellerProfile = ({ user }) => {
  const { image, name } = user || {};

  const reviews = "⭐⭐⭐⭐⭐";
  const ratings = "33 ratings";

  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.title}>Seller Profile</Heading>
      <Flex {...styles.content}>
        <Flex {...styles.profile}>
          <AspectRatio {...styles.aspect}>
            <Avatar src={image} name={name} {...styles.avatar} />
          </AspectRatio>
          <Flex {...styles.info}>
            <Text {...styles.name}>{name}</Text>
            <Text {...styles.reviews}>
              {reviews} {ratings}
            </Text>
          </Flex>
        </Flex>

        <Divider {...styles.divider} />

        <Heading {...styles.heading}>Insights</Heading>
        <Flex {...styles.insights}>
          <Insights />
        </Flex>

        <Divider {...styles.divider} />

        <Heading {...styles.heading}>Reactions</Heading>
        <Flex {...styles.reactions}>
          <Reactions />
        </Flex>

        <Divider {...styles.divider} />

        <Heading {...styles.heading}>Most searched foods</Heading>
        <Flex {...styles.suggestions}>
          <SellingSuggestions />
        </Flex>
      </Flex>
    </Flex>
  );
};

export { SellerProfile };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "7vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
  title: {
    display: { base: "none", md: "block" },
    fontSize: { base: "3xl", md: "5xl" },
    isTruncated: true,
  },
  content: {
    direction: "column",
    paddingY: { base: "2vh", md: "5vh" },
  },
  profile: {
    direction: "row",
  },
  aspect: {
    ratio: 1,
    width: { base: "30%", md: "12%" },
    marginRight: { base: "1em", md: "2vw" },
  },
  info: {
    direction: "column",
    justify: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: "14pt",
    fontWeight: "semibold",
  },
  reviews: {
    fontSize: "10pt",
  },
  divider: {
    marginY: "3vh",
  },
  heading: {
    fontSize: { base: "2xl", md: "2xl" },
  },
  insights: {
    minHeight: { base: "35vh", md: "30vh" },
  },
  reactions: {
    minHeight: { base: "20vh", md: "30vh" },
  },
  suggestions: {
    position: "relative",
    minHeight: { base: "35vh", md: "30vh" },
  },
};
