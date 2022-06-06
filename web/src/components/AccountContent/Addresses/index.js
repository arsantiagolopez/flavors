import { Badge, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoAddSharp, IoChevronForwardSharp } from "react-icons/io5";

const Addresses = () => {
  const router = useRouter();

  const addresses = [
    {
<<<<<<< HEAD
=======
      id: 1,
      street: "19 Archer Oak Pl",
      lineTwo: null,
      lineThree: "The woodlands, TX, 77382",
      isPrimary: true,
    },
    {
>>>>>>> 17bc58afd709c8c3dfa4d01afbeb7bff5e483368
      id: 2,
      street: "39 bessdale ct",
      lineTwo: null,
      lineThree: "The woodlands, TX, 77382",
      isPrimary: false,
    },
    {
      id: 3,
      street: "10 Red adler Pl",
      lineTwo: "Apt. 310",
      lineThree: "The woodlands, TX, 77382",
      isPrimary: false,
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.addresses}>
        {addresses.map(({ id, street, lineTwo, lineThree, isPrimary }) => (
          <Button key={id} {...styles.address}>
            <Flex {...styles.left}>
              <Text>{street}</Text>
              {lineTwo && <Text>{lineTwo}</Text>}
              <Text>{lineThree}</Text>
            </Flex>

            <Flex {...styles.actions}>
              <Flex {...styles.badges}>
                {isPrimary && <Badge {...styles.badge}>PRIMARY</Badge>}
                {true && <Badge {...styles.badge}>BILLING</Badge>}
                {/* {true && <Badge {...styles.badge}>DEFAULT</Badge>} */}
              </Flex>

              <Icon
                as={IoChevronForwardSharp}
                {...styles.icon}
                {...styles.chevron}
              />
            </Flex>
          </Button>
        ))}
      </Flex>

      <Button {...styles.addAddressButton}>
        <Flex {...styles.leftIcon}>
          <Icon as={IoAddSharp} {...styles.icon} fontSize="1em" />
        </Flex>
        <Flex width="100%" color="gray.400">
          Add new address
        </Flex>
      </Button>
    </Flex>
  );
};

export { Addresses };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: "0",
    grow: "1",
    align: "space-between",
  },
  addresses: {
    direction: "column",
    overflowY: "scroll",
    maxHeight: "60vh",
  },
  address: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    variant: "ghost",
    fontWeight: "normal",
    borderBottom: "0.5px solid rgba(150,150,150,0.1)",
    paddingY: { base: "2.5em", md: "5vh" },
  },
  left: {
    direction: "column",
    paddingLeft: "1vw",
    textAlign: "left",
  },
  actions: {
    direction: "row",
    align: "center",
  },
  addAddressButton: {
    borderTop: "0.5px solid rgba(150,150,150,0.1)",
    marginTop: "auto",
    marginBottom: "2vh",
    variant: "ghost",
    fontWeight: "normal",
    paddingY: { base: "2em", md: "5vh" },
  },
  leftIcon: {
    justify: { base: "flex-start", md: "center" },
    flexBasis: { base: "30%", md: "20%" },
    marginRight: { base: "2", md: "2vw" },
  },
  icon: {
    fontSize: { base: "2em", md: "2.5em" },
    color: "gray.300",
  },
  chevron: {
    fontSize: { base: "10pt", md: "1em" },
    marginLeft: { base: "1em", md: "2vw" },
  },
  badges: {
    direction: { base: "column", md: "row" },
  },
  badge: {
    paddingY: "1",
    paddingX: "2",
    color: "lightgray",
    fontSize: "8pt",
    marginY: "0.8",
    marginLeft: { base: "1", md: "2" },
  },
};
