import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaMoneyBillWaveAlt, FaPercentage } from "react-icons/fa";

const Promotion = ({ promotion }) => {
  const { id, name, discount, startDate, endDate, active } = promotion || {};

  const formatDiscount = ({ type, amount }) => {
    if (type === "percent") {
      return `${amount} % off`;
    }
    return `$${amount} off`;
  };

  return (
    <Flex {...styles.wrapper}>
      <Icon
        as={discount?.type === "percent" ? FaPercentage : FaMoneyBillWaveAlt}
        color={active ? "red.500" : "gray.300"}
        {...styles.icon}
      />
      <Flex {...styles.meta}>
        <Text {...styles.name}>{name}</Text>
        <Text {...styles.discount}>{formatDiscount(discount)}</Text>
      </Flex>
    </Flex>
  );
};

export { Promotion };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    align: "center",
    width: { base: "30vw", md: "10vw" },
    minWidth: { base: "30vw", md: "10vw" },
    height: "100%",
    marginRight: "2",
    boxShadow: "md",
    borderRadius: "0.5em",
    cursor: "pointer",
    paddingY: "2vh",
    _hover: {
      background: "gray.100",
    },
  },
  icon: {
    boxSize: { base: "2em", md: "3em" },
  },
  meta: {
    direction: "column",
    justify: "center",
    align: "center",
    letterSpacing: "tight",
    cursor: "pointer",
    width: "100%",
    maxWidth: "100%",
    paddingY: { base: "1", md: "1vh" },
  },
  name: {
    fontWeight: "semibold",
    letterSpacing: "tight",
    color: "gray.800",
    maxWidth: "100%",
    noOfLines: 2,
    textAlign: "center",
    paddingX: "2",
  },
  discount: {
    color: "gray.400",
    // fontSize: "10pt",
    isTruncated: true,
  },
};
