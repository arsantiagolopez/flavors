import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { Section } from "./Section";

const Orders = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchProps = {
    searchValue,
    setSearchValue,
    isSearchLoading,
    setIsSearchLoading,
    isSearchActive,
    setIsSearchActive,
  };

  const acceptOrders = [
    {
      buyer: {
        id: 1,
        name: "Andrea Piacquiado",
        photo:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        rating: "⭐⭐⭐⭐",
        ratingAmount: "1.2k",
      },
      plate: {
        id: 2,
        name: "food",
        photo:
          "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      },
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        {!isSearchActive && <Heading {...styles.title}>Orders</Heading>}
        <SearchBar {...searchProps} />
      </Flex>

      <Flex {...styles.content}>
        <Section heading="To accept" type="accept" items={acceptOrders} />

        <Section heading="Preparing" type="preparing" />

        <Section heading="Pending pickup/delivery" type="pickup" />
      </Flex>
    </Flex>
  );
};

export { Orders };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "7vh" },
    paddingX: { base: "0.5em", md: "0" },
    // height: "100%",
  },
  header: {
    direction: "row",
    justify: "space-between",
    align: "baseline",
    marginBottom: "2vh",
  },
  title: {
    fontSize: { base: "3xl", md: "5xl" },
    isTruncated: true,
    width: "100%",
    paddingBottom: "1vh",
  },
  content: {
    direction: "row",
    paddingY: { base: "2vh", md: "5vh" },
    height: "100%",
  },
};
