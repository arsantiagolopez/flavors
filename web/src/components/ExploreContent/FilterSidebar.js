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
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Address } from "./Filters/Address";
import { DeliveryOrPickup } from "./Filters/DeliveryOrPickup";
import { Dietary } from "./Filters/Dietary";
import { Nationality } from "./Filters/Nationality";
import { PriceRange } from "./Filters/PriceRange";
import { SortBy } from "./Filters/SortBy";

const FilterSidebar = ({ user }) => {
  const router = useRouter();
  // const { search } = router?.query;

  const { address } = user || {};

  const filters = [
    {
      id: "sort",
      name: "Sort by",
      children: <SortBy />,
    },
    {
      id: "price",
      name: "Price range",
      children: <PriceRange />,
    },
    {
      id: "delivery",
      name: "Delivery or pickup",
      children: <DeliveryOrPickup />,
    },
    {
      id: "dietary",
      name: "Dietary",
      children: <Dietary />,
    },
    {
      id: "nationality",
      name: "Nationality",
      children: <Nationality />,
    },
  ];

  // @todo: Set Accordion's default index based on query. Expand
  // filters which queries are active, alongside defaults.

  // useEffect(() => {
  //   if (search) {
  //     // const categoryIndex = categories.findIndex(({ links }) =>
  //     //   links.some((link) => link?.path === path)
  //     // );
  //     // setAccordionIndex([categoryIndex]);
  //   }
  // }, [search]);

  const addressProps = { address };

  return (
    <Flex {...styles.wrapper}>
      <Address {...addressProps} />

      <Link href="/explore">
        <Text {...styles.button} {...styles.back}>
          <ArrowBackIcon marginRight="3" />
          Back to featured
        </Text>
      </Link>

      <Text {...styles.notice}>Filters</Text>
      <Accordion defaultIndex={[0, 1, 2, 4]} allowMultiple allowToggle>
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
  back: {
    cursor: "pointer",
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
  },
};
