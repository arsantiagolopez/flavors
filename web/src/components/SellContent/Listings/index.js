import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { Listing } from "./Listing";

const Listings = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const plates = [
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
    {
      id: "09434j8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
    {
      id: "29334j8ssdff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
      id: "09120k8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg?cs=srgb&dl=pexels-sebastian-coman-photography-3590401.jpg&fm=jpgd",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "89sja10j8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://flavors-arsantiagolopez.s3.us-east-2.amazonaws.com/61787c1fae53dd5fbdcc7748/4fb8e37e-2f59-48cf-8842-2f9c302e81ad",
      userId: "61787c1fae53dd5fbdcc7748",
    },
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
        {!isSearchActive && <Heading {...styles.title}>Listings</Heading>}
        <SearchBar {...searchProps} />
      </Flex>

      <Flex {...styles.content}>
        <Flex {...styles.items}>
          <Listing isCreate />
          {plates?.map((item, index) => (
            <Listing key={item?.id} plate={item} index={index} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Listings };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "1em", md: "7vh" },
    width: "100%",
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
    height: "100%",
    maxWidth: "100%",
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
