import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const CreateMenuModal = ({ isOpen, onOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...styles.wrapper}>
      <ModalOverlay {...styles.overlay} />
      <ModalContent>
        <ModalHeader {...styles.header}>Create a Menu</ModalHeader>
        <ModalCloseButton />
        <ModalBody {...styles.body}></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { CreateMenuModal };

// Styles

const styles = {
  wrapper: {
    size: "xl",
  },
  overlay: {
    backdropFilter: "blur(2px)",
  },
  header: {
    textAlign: "center",
  },
  body: {
    paddingY: "3vh",
  },
};
