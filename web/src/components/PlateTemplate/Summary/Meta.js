import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaTruck } from "react-icons/fa";
import { IoBagCheck, IoRestaurant, IoTimeSharp } from "react-icons/io5";

const Meta = ({ data }) => {
  const { price, markdown } = data || {};

  const available = true;

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.prices}>
        <Text {...styles.price}>${price}</Text>
        <Text {...styles.markdown}>{markdown && `$${markdown}`}</Text>
      </Flex>

      <Flex {...styles.prop}>
        <Icon as={available ? IoBagCheck : IoRestaurant} {...styles.icon} />
        <Text> Available now!</Text>
      </Flex>

      <Flex {...styles.prop}>
        <Icon as={FaTruck} {...styles.icon} />
        <Text>Delivery & Pickup</Text>
      </Flex>

      <Flex {...styles.prop}>
        <Icon as={IoTimeSharp} {...styles.icon} />
        <Text>Estimated 30 minutes</Text>
      </Flex>
    </Flex>
  );
};

export { Meta };

// Styles

const styles = {
  wrapper: {
    direction: "column",
  },
  prices: {
    direction: "row",
    align: "baseline",
    letterSpacing: "tighter",
  },
  price: {
    fontSize: { base: "xl", md: "4xl" },
    fontWeight: "bold",
  },
  markdown: {
    textDecoration: "line-through",
    fontWeight: "semibold",
    fontSize: "xl",
    color: "gray.300",
    marginLeft: "2",
  },
  prop: {
    direction: "row",
    align: "center",
    paddingY: "1",
  },
  icon: {
    marginRight: "3",
    fontSize: "14pt",
  },
};
