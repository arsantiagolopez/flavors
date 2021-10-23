import { Button, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { SellerInfo } from "./SellerInfo";

const Summary = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { price, markdown, description, meta, seller } = data || {};

  // Toggle description expand state
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const sellerInfoProps = { seller };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.plate}>
        <Flex {...styles.meta}>
          <Flex {...styles.prices}>
            <Text {...styles.price}>${price}</Text>
            <Text {...styles.markdown}>{markdown && `$${markdown}`}</Text>
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

        <Divider {...styles.divider} />

        <Flex {...styles.details}>
          <Text {...styles.subheading}>Details</Text>
          <Text noOfLines={isExpanded ? "none" : 3} {...styles.description}>
            {description}
          </Text>
          <Text
            onClick={toggleExpand}
            children={isExpanded ? "Less" : "More"}
            {...styles.more}
          />
        </Flex>
      </Flex>

      <Divider {...styles.divider} />

      <SellerInfo {...sellerInfoProps} />

      <Divider {...styles.divider} />

      <Flex {...styles.actions}>
        <Button {...styles.button} {...styles.buy}>
          Buy now
        </Button>
        <Button {...styles.button} {...styles.add}>
          Add to cart
        </Button>
      </Flex>
    </Flex>
  );
};

export { Summary };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    width: { base: "100%", md: "49%" },
    paddingX: "1vw",
    height: { base: "100%", md: "60vh" },
    maxHeight: { base: "100%", md: "60vh" },
    overflow: "scroll",
  },
  plate: {
    direction: "column",
  },
  meta: {
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
  },
  icon: {
    marginRight: "3",
    fontSize: "14pt",
  },
  details: {
    direction: "column",
  },
  subheading: {
    fontSize: "lg",
    fontWeight: "bold",
    paddingY: "1",
  },
  description: {
    color: "gray.600",
  },
  more: {
    fontSize: "9pt",
    textTransform: "uppercase",
    letterSpacing: "widest",
    color: "gray.300",
    cursor: "pointer",
    paddingY: "1",
    _hover: {
      textDecoration: "underline",
    },
  },
  divider: {
    marginY: "2vh",
  },
  actions: {
    position: "sticky",
    bottom: "0",
    direction: "column",
    marginTop: "auto",
    width: "100%",
    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 20%, rgba(0,0,0,0) 100%);",
  },
  button: {
    variant: "solid",
    marginBottom: "1vh",
  },
  buy: {
    background: "gray.800",
    _hover: {
      background: "brand",
    },
  },
  add: {
    background: "gray.200",
    _hover: {
      background: "gray.300",
    },
  },
};
