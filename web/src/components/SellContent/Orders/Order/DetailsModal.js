import { CheckIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const DetailsModal = ({ order, isOpen, onOpen, onClose }) => {
  const { buyer, plate } = order || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...styles.wrapper}>
      <ModalOverlay {...styles.overlay} />
      <ModalContent>
        <ModalHeader {...styles.header}>Order Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody {...styles.body}>
          <Flex {...styles.plate}>
            <Avatar src={plate?.photo} {...styles.avatar} />
          </Flex>

          <Divider {...styles.divider} />

          <Flex {...styles.seller}>
            <Avatar src={buyer?.photo} {...styles.avatar} />
            <Heading {...styles.heading}>Buyer Ratings</Heading>
            <Flex {...styles.rating}>
              <Text>{buyer?.rating}</Text>
              <Text>{buyer?.ratingAmount}</Text>
            </Flex>
          </Flex>

          <Flex {...styles.actions}>
            <Button
              rightIcon={<Icon as={IoCloseSharp} />}
              {...styles.button}
              {...styles.declineButton}
            >
              Decline
            </Button>
            <Button
              rightIcon={<CheckIcon />}
              {...styles.button}
              {...styles.acceptButton}
            >
              Accept
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { DetailsModal };

// Styles

const styles = {
  wrapper: {},
  overlay: {
    backdropFilter: "blur(2px)",
  },
  header: {
    textAlign: "center",
  },
  body: {},
  plate: {
    direction: "column",
  },
  divider: {
    marginY: "3vh",
  },
  seller: {
    direction: "column",
  },
  avatar: {
    boxSize: "4em",
  },
  heading: {
    fontSize: { base: "xl", md: "xl" },
  },
  rating: {
    direction: "column",
  },
  actions: {
    direction: "row",
    marginY: "2vh",
  },
  button: {},
  declineButton: {
    background: "red.400",
    _hover: {
      background: "red.500",
    },
  },
  acceptButton: {
    background: "green.400",
    marginLeft: "2",
    _hover: {
      background: "green.500",
    },
  },
};
