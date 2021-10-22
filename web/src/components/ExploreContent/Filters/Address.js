import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const Address = ({ address }) => {
  const handleAddressChange = () => {};

  return (
    <Flex {...styles.wrapper}>
      <Flex onClick={handleAddressChange} {...styles.address}>
        <Icon as={IoLocationSharp} {...styles.icon} />
        <Text {...styles.street}>{address?.split(",")[0]}</Text>
      </Flex>
    </Flex>
  );
};

export { Address };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    alignSelf: "flex-start",
  },
  address: {
    marginLeft: "-2",
    align: "center",
    marginBottom: "2vh",
    cursor: "pointer",
    width: "calc(100% + 1vw)",
    borderRadius: "2em",
    _hover: {
      fontWeight: "semibold",
      letterSpacing: "tight",
      background: "gray.800",
      color: "white",
      paddingX: "1vw",
      paddingY: "2",
      marginBottom: "1vh",
      marginTop: "-1vh",
      marginLeft: "-3",
    },
  },
  icon: {
    color: "brand",
  },
  street: {
    marginLeft: "3",
    noOfLines: 1,
  },
};
