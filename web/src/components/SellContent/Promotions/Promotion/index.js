import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaMoneyBillWaveAlt, FaPercentage } from "react-icons/fa";

const Promotion = ({ promotion }) => {
  const { id, name, discount, startDate, endDate, active } = promotion || {};

  const formatDiscount = ({ type, amount }) => {
    const metric = type === "percent" ? "percent" : "dollars";
    return `${amount} ${metric} off`;
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
    direction: { base: "column", base: "row" },
    align: "center",
    width: { base: "30vw", md: "100%" },
    minWidth: { base: "30vw", md: "100%" },
    height: { base: "95%", md: "8vh" },
    minHeight: { base: "none", md: "8vh" },
    marginBottom: { base: "0", md: "2" },
    paddingRight: { base: "2", md: "0" },
    boxShadow: "sm",
    borderRadius: "0.5em",
    cursor: "pointer",
    _hover: {
      background: "gray.100",
    },
  },
  icon: {
    boxSize: { base: "2em", md: "3em" },
    marginRight: { base: "0", md: "1vw" },
    marginX: "2",
  },
  meta: {
    direction: "column",
    justify: "center",
    align: { base: "center", md: "flex-start" },
    letterSpacing: "tight",
    cursor: "pointer",
    maxWidth: { base: "100%", md: "45%" },
    minWidth: { base: "100%", md: "30%" },
    paddingY: "1",
  },
  name: {
    fontWeight: "semibold",
    letterSpacing: "tight",
    color: "gray.800",
    maxWidth: "100%",
    isTruncated: true,
  },
  discount: {
    color: "gray.400",
    // fontSize: "10pt",
    isTruncated: true,
  },
};
