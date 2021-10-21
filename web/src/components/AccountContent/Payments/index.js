import {
  Badge,
  Button,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IoAddSharp, IoChevronForwardSharp } from "react-icons/io5";
import { SiApplepay, SiVisa } from "react-icons/si";
import { AddCardModal } from "./AddCardModal";
import { CardOverviewModal } from "./CardOverviewModal";

const Payments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardsData = [
    {
      id: 1,
      icon: SiVisa,
      description: "**** 8967",
      type: "card",
      isDefault: true,
    },
    {
      id: 2,
      icon: SiApplepay,
      description: "Apple Pay",
      type: "bank",
      isDefault: false,
    },
  ];

  const modalProps = { isOpen, onOpen, onClose };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.cards}>
        {cardsData.map(({ id, icon, description, type, isDefault }) => (
          <Button key={id} onClick={onOpen} {...styles.card}>
            <Flex {...styles.left}>
              <Icon as={icon} {...styles.icon} />
            </Flex>

            <Flex {...styles.actions}>
              <Text>{description}</Text>
              <Flex {...styles.right}>
                {isDefault && <Badge {...styles.badge}>DEFAULT</Badge>}
                <Icon
                  as={IoChevronForwardSharp}
                  {...styles.icon}
                  {...styles.chevron}
                />
              </Flex>
            </Flex>

            {/* Card overview modal */}
            <CardOverviewModal {...modalProps} />
          </Button>
        ))}
      </Flex>

      <Button {...styles.addCardButton}>
        <Flex {...styles.left}>
          <Icon as={IoAddSharp} {...styles.icon} fontSize="1em" />
        </Flex>
        <Flex width="100%" color="gray.400">
          Add a new card
        </Flex>
      </Button>

      {/* Add new card modal */}
      <AddCardModal {...modalProps} />
    </Flex>
  );
};

export { Payments };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: "0",
    grow: "1",
    align: "space-between",
  },
  cards: {
    direction: "column",
    overflowY: "scroll",
    maxHeight: "60vh",
  },
  card: {
    variant: "ghost",
    direction: "row",
    align: "center",
    fontWeight: "normal",
    borderBottom: "0.5px solid rgba(150,150,150,0.1)",
    paddingY: { base: "2em", md: "5vh" },
  },
  left: {
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
  actions: {
    width: "100%",
    paddingY: "3",
    justify: "space-between",
    align: "center",
  },
  right: {
    align: "center",
  },
  badge: {
    paddingY: "1",
    paddingX: "2",
    color: "lightgray",
    fontSize: "8pt",
  },
  addCardButton: {
    borderTop: "0.5px solid rgba(150,150,150,0.1)",
    marginTop: "auto",
    marginBottom: "2vh",
    variant: "ghost",
    fontWeight: "normal",
    paddingY: { base: "2em", md: "5vh" },
  },
};
