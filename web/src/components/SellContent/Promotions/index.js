import { Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { CreatePromotionModal } from "./CreatePromotionModal";
import { Section } from "./Section";

const Promotions = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activePromos, setActivePromos] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const promotions = [
    {
      id: 1,
      name: "15 percent off everything, BUY NOW!",
      discount: {
        type: "flat",
        amount: "15",
      },
      startDate: new Date(),
      endDate: null,
      active: false,
    },
    {
      id: 2,
      name: "15 percent off everything, BUY NOW!",
      discount: {
        type: "percent",
        amount: "15",
      },
      startDate: new Date(),
      endDate: null,
      active: true,
    },
  ];

  // Filter active promos & store in state
  useEffect(() => {
    if (promotions) {
      const active = promotions.filter(({ active }) => active);
      setActivePromos(active);
    }
  }, []);

  const searchProps = {
    searchValue,
    setSearchValue,
    isSearchLoading,
    setIsSearchLoading,
    isSearchActive,
    setIsSearchActive,
  };
  const createPromotionModalProps = { isOpen, onOpen, onClose };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        {!isSearchActive && <Heading {...styles.title}>Promotions</Heading>}
        <Flex {...styles.actions}>
          <SearchBar {...searchProps} />
          <CreatePromotionModal {...createPromotionModalProps} />
        </Flex>
      </Flex>

      <Flex {...styles.content}>
        <Section heading="Active" type="active" items={activePromos} />

        <Divider {...styles.divider} />

        <Section heading="Created" type="created" items={promotions} />
      </Flex>
    </Flex>
  );
};

export { Promotions };

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
    width: "100%",
  },
  actions: {
    direction: "row",
    justify: "flex-end",
    align: "center",
    width: "100%",
  },
  title: {
    fontSize: { base: "3xl", md: "5xl" },
    isTruncated: true,
    width: "100%",
    paddingBottom: "1vh",
  },
  content: {
    direction: "column",
    paddingY: { base: "2vh", md: "3vh" },
    height: "100%",
  },
  divider: {
    marginY: "3vh",
  },
};
