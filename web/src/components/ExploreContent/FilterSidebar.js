import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Nationality } from "./Filters/Nationality";

const FilterSidebar = ({ setSearchValue }) => {
  const router = useRouter();
  const { search } = router?.query;

  const filters = [
    {
      id: "sort",
      name: "Sort by",
      children: null,
    },
    {
      id: "price",
      name: "Price range",
      children: null,
    },
    {
      id: "delivery",
      name: "Delivery or pickup",
      children: null,
    },
    {
      id: "dietary",
      name: "Dietary",
      children: null,
    },
    {
      id: "nationality",
      name: "Nationality",
      children: <Nationality />,
    },
  ];

  // // Keep synced with AccountPages's categories
  // const categories = [
  //   {
  //     name: "Personal",
  //     links: [
  //       { name: "Profile", path: "profile" },
  //       { name: "Payments", path: "payments" }, //
  //       { name: "Addresses", path: "addresses" }, //
  //       { name: "Reviews", path: "reviews" }, //
  //     ],
  //   },

  useEffect(() => {
    if (search) {
      // const categoryIndex = categories.findIndex(({ links }) =>
      //   links.some((link) => link?.path === path)
      // );
      // setAccordionIndex([categoryIndex]);

      console.log("foo", search);
    }
  }, [search]);

  return (
    <Flex {...styles.wrapper}>
      <Text onClick={() => setSearchValue(null)} {...styles.button}>
        <ArrowBackIcon marginRight="3" />
        Back to featured
      </Text>
      <Text {...styles.notice}>Filters</Text>
      <Accordion defaultIndex={[0, 1, 2, 3, 4, 5]} allowMultiple allowToggle>
        {filters?.map(({ id, name, children }) => {
          return (
            <AccordionItem key={id} {...styles.filters}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    fontWeight={isExpanded && "bold"}
                    {...styles.button}
                  >
                    <AccordionIcon marginRight="2" />
                    <Text {...styles.name}>{name}</Text>
                  </AccordionButton>

                  <AccordionPanel {...styles.panel}>
                    <Flex {...styles.children}>{children}</Flex>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Flex>
  );
};

export { FilterSidebar };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    paddingX: "1em",
    paddingY: "7vh",
  },
  notice: {
    color: "gray.400",
    textTransform: "uppercase",
    fontSize: "10pt",
    letterSpacing: "widest",
    paddingY: "0.75em",
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  button: {
    paddingY: "0.75em",
    paddingX: "0",
    marginLeft: "-2",
    width: "100%",
    _hover: {
      background: "none",
      fontWeight: "bold",
    },
  },
  name: {
    isTruncated: true,
  },
  panel: {
    borderLeft: "1px solid rgba(200,200,200,0.3)",
    marginLeft: "0.5",
    paddingY: "0",
  },
  children: {
    direction: "column",
    paddingY: "0.5em",
    cursor: "pointer",
  },
};
