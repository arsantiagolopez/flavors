import {
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { GoPlus } from "react-icons/go";

const CreatePromotionModal = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      <Icon onClick={onOpen} as={GoPlus} {...styles.trigger} />

      <Modal isOpen={isOpen} onClose={onClose} {...styles.wrapper}>
        <ModalOverlay {...styles.overlay} />
        <ModalContent>
          <ModalHeader {...styles.header}>Create Promotion</ModalHeader>
          <ModalCloseButton />
          <ModalBody {...styles.body}></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreatePromotionModal };

// Styles

const styles = {
  trigger: {
    fontSize: { base: "2xl", md: "3xl" },
    cursor: "pointer",
    color: "gray.300",
    marginLeft: { base: "0.5em", md: "1vw" },
  },
  wrapper: {},
  overlay: {
    backdropFilter: "blur(2px)",
  },
  header: {
    textAlign: "center",
  },
  body: {},
};
