import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Meta } from "./Meta";
import { SellerInfo } from "./SellerInfo";

const Summary = ({ plate, seller }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { description, meta } = plate || {};

  // Toggle description expand state
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const metaProps = { plate, seller };
  const sellerInfoProps = { seller };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.plate}>
        <Meta {...metaProps} />

        <Divider {...styles.divider} />

        <Flex {...styles.details}>
          <Text {...styles.subheading}>Details</Text>
          <Text noOfLines={isExpanded ? "none" : 2} {...styles.description}>
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
    height: { base: "100%", md: "62vh" },
    minHeight: { base: "100%", md: "62vh" },
    maxHeight: { base: "100%", md: "62vh" },
    overflowY: "scroll",
    overflowX: "hidden",
  },
  plate: {
    direction: "column",
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
