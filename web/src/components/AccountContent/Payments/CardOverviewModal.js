import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SiVisa } from "react-icons/si";

const CardOverviewModal = ({ isOpen, onClose }) => {
  return (
    <Modal {...styles.modal} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent {...styles.content}>
        <Flex {...styles.description}>
          <Icon as={SiVisa} {...styles.icon} />
          <Text color="gray.700">**** 8866</Text>
        </Flex>
        {/* <Button color="red.500">Remove {card.type}</Button> */}

        <Flex {...styles.actions}>
          <Button {...styles.button} {...styles.default}>
            Make default
          </Button>
          <Button {...styles.button} {...styles.remove}>
            Remove bank
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export { CardOverviewModal };

// Styles

const styles = {
  modal: {
    isCentered: "true",
    motionPreset: "slideInBottom",
  },
  content: {
    justify: "center",
    align: "center",
    direction: "column",
    width: "90%",
    borderRadius: "1em",
    bg: "rgba(300,300,300, 0.9)",
    backdropFilter: "blur(10px)",
    height: "30vh",
  },
  description: {
    direction: "column",
    justify: "center",
    align: "center",
    marginY: "2vh",
    grow: "1",
  },
  icon: {
    fontSize: "5em",
    color: "gray.300",
  },
  actions: {
    direction: "column",
    justify: "center",
    align: "center",
    width: "100%",
    height: "12vh",
    borderTop: "0.5px solid rgba(150,150,150,0.1)",
  },
  button: {
    variant: "ghost",
    width: "100%",
    height: "100%",
    borderRadius: "none",
  },
  default: {
    color: "gray.700",
    paddingTop: "1",
  },
  remove: {
    color: "red.500",
    borderBottomRadius: "1em",
    paddingBottom: "1",
  },
};
