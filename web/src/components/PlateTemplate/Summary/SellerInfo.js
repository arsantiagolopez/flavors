import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

const SellerInfo = ({ seller }) => {
  const { name, avatar, rating } = seller || {};

  const reactions = [
    {
      emoji: "❤️",
      amount: 136,
    },
    {
      emoji: "🔥",
      amount: 72,
    },
    // {
    //   emoji: "🎉",
    //   amount: 189,
    // },
    {
      emoji: "😕",
      amount: 189,
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      <Text {...styles.heading}>Seller info</Text>
      <Flex {...styles.info}>
        <Avatar src={avatar} {...styles.avatar} />
        <Flex {...styles.meta}>
          <Text {...styles.name}>{name}</Text>
          <Text {...styles.joined}>Joined on June, 2021</Text>
        </Flex>
        <Flex {...styles.reputation}>
          <Flex {...styles.reviews}>
            <Text {...styles.stars}>{rating}</Text>
            <Text {...styles.ratings}>1.2k</Text>
          </Flex>

          <Flex {...styles.reactions}>
            {reactions.map(({ emoji, amount }) => (
              <Flex key={emoji} {...styles.reaction}>
                <Text {...styles.emoji}>{emoji}</Text>
                <Text {...styles.amount}>{amount}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { SellerInfo };

// Styles

const styles = {
  wrapper: {
    direction: "column",
  },
  heading: {
    fontSize: "lg",
    fontWeight: "bold",
    marginBottom: "0.5vh",
  },
  info: {
    direction: "row",
    justify: "space-between",
    align: "center",
    borderRadius: "0.5em",
    paddingY: "1vh",
    cursor: "pointer",
    _hover: {
      background: "gray.100",
    },
  },
  avatar: {
    boxSize: { base: "3em", md: "4em" },
    marginLeft: "1",
  },
  meta: {
    flex: "auto",
    direction: "column",
    justify: "space-around",
    letterSpacing: "tight",
    paddingX: "1vw",
  },
  name: {
    fontWeight: "bold",
    fontSize: "xl",
    noOfLines: 1,
  },
  joined: {
    color: "gray.300",
  },
  reputation: {
    direction: "column",
    align: "center",
    justify: "center",
    height: "100%",
    width: "100%",
    minWidth: "35%",
    maxWidth: "35%",
  },
  reviews: {
    direction: "row",
    justify: "center",
    align: "center",
    width: "100%",
  },
  stars: {
    fontSize: "xl",
    isTruncated: true,
  },
  ratings: {
    color: "gray.500",
    fontSize: "10pt",
    isTruncated: true,
    marginLeft: "1",
  },
  reactions: {
    direction: "row",
    maxWidth: "100%",
    isTruncated: true,
  },
  reaction: {
    align: "center",
    paddingY: "1",
    paddingX: "1",
    borderRadius: "1em",
    cursor: "pointer",
    maxWidth: "100%",
    isTruncated: true,

    _hover: {
      border: "0.5px solid",
      borderColor: "gray.100",
      boxShadow: "md",
      background: "white",
    },
  },
  emoji: {
    fontSize: "8pt",
    marginRight: "1",
  },
  amount: {
    fontSize: "8pt",
    color: "gray.400",
    noOfLines: 1,
    isTruncated: true,
  },
};
