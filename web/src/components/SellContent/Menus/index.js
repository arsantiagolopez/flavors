import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { Menu } from "./Menu";

const Menus = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const menus = [
    {
      id: 1,
      name: "Keto foods",
      plates: [
        {
          id: "1280j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg?cs=srgb&dl=pexels-sebastian-coman-photography-3590401.jpg&fm=jpg",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "aas80s8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=pexels-rajesh-tp-1633578.jpg&fm=jpg",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "803234j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
      ],
    },
    {
      id: 2,
      name: "Second menu",
      plates: [
        {
          id: "61788baff81b6915bb0b4aec",
          tags: [],
          menu: ["My plates"],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
      ],
    },
  ];

  const searchProps = {
    searchValue,
    setSearchValue,
    isSearchLoading,
    setIsSearchLoading,
    isSearchActive,
    setIsSearchActive,
  };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        {!isSearchActive && <Heading {...styles.title}>Menus</Heading>}
        <SearchBar {...searchProps} />
      </Flex>

      <Flex {...styles.content}>
        <Menu isCreate />
        {menus?.map((menu, index) => (
          <Menu key={menu?.id} data={menu} index={index} />
        ))}
      </Flex>
    </Flex>
  );
};

export { Menus };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "1em", md: "7vh" },
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
    direction: { base: "column", md: "row" },
    paddingY: { base: "2vh", md: "5vh" },
    height: "100%",
  },
  items: {
    direction: "row",
    wrap: "wrap",
    height: "100%",
    width: "100%",
    marginX: "0",
    // marginY: "5vh",
    paddingY: { base: "2vh", md: "3vh" },
  },
};
