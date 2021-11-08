import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const OAuthAccountNotLinked = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay {...styles.overlay} />
      <ModalContent {...styles.content}>
        <ModalHeader {...styles.heading}>
          Social Media Account Not Linked
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            A {process.env.NEXT_PUBLIC_APP_NAME} account hasn't been associated
            to that social media provider. Try a different sign in button. To
            allow signin from other social media accounts, go to{" "}
            <b>Account, Privacy, Social Media Accounts, </b> and add your
            accounts to allow login.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Alright, try again</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { OAuthAccountNotLinked };

// Styles

const styles = {
  overlay: {
    opacity: "0.1",
  },
  content: {
    paddingY: "1rem",
    paddingX: "0.5rem",
  },
  heading: {
    paddingY: "0.5em",
  },
};
