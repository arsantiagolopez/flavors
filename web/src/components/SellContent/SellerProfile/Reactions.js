import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Reactions = () => {
  const reactions = [
    {
      emoji: "🤠",
      amount: 101189,
    },
    {
      emoji: "❤️",
      amount: 136,
    },
    {
      emoji: "🔥",
      amount: 72,
    },
    {
      emoji: "🎉",
      amount: 189,
    },
    {
      emoji: "😕",
      amount: 1200,
    },
  ];

  // Convert 1000 to 1k
  const numberFormat = (amount) => {
    let str = amount;
    if (amount > 999) {
      str =
        (amount / 1000).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + "k";
    }
    return str;
  };

  return (
    <Flex {...styles.wrapper}>
      {reactions?.map(({ emoji, amount }) => (
        <Flex key={emoji} {...styles.reaction}>
          <Text {...styles.emoji}>{emoji}</Text>
          <Text {...styles.amount}>{numberFormat(amount)}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export { Reactions };

// Styles

const styles = {
  wrapper: {
    direction: "row",
    justify: "center",
    align: "center",
    height: "100%",
    width: "100%",
  },
  reaction: {
    direction: "column",
    align: "center",
    marginX: "2vw",
  },
  emoji: {
    fontSize: "32pt",
  },
  amount: {
    color: "gray.500",
    marginTop: "2vh",
  },
};
