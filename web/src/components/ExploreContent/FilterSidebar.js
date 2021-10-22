import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { DeliveryOrPickup } from "./Filters/DeliveryOrPickup";
import { Nationality } from "./Filters/Nationality";
import { PriceRange } from "./Filters/PriceRange";
import { SortBy } from "./Filters/Sortby";

const FilterSidebar = ({ user, setSearchValue }) => {
  const router = useRouter();
  // const { search } = router?.query;

  const { address } = user || {};

  const handleAddressChange = () => {};

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
      children: null,
    },
    {
      id: "nationality",
      name: "Nationality",
      children: <Nationality />,
    },
  ];

  // useEffect(() => {
  //   if (search) {
  //     // const categoryIndex = categories.findIndex(({ links }) =>
  //     //   links.some((link) => link?.path === path)
  //     // );
  //     // setAccordionIndex([categoryIndex]);
  //   }
  // }, [search]);

  return (
    <Flex {...styles.wrapper}>
      <Flex onClick={handleAddressChange} {...styles.address}>
        <Icon as={IoLocationSharp} color="brand" />
        <Text {...styles.street}>{address?.split(",")[0]}</Text>
      </Flex>

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
  address: {
    marginLeft: "-2",
    align: "center",
    marginBottom: "2vh",
    cursor: "pointer",
    _hover: {
      fontWeight: "bold",
      transform: "scale(101%)",
    },
  },
  street: {
    marginLeft: "3",
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
