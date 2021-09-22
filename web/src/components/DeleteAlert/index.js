import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { showToast } from "../../utils/showToast";

const DeleteAlert = ({ onDeleteConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // Delete schedule on confirmation
  const handleDelete = async () => {
    setIsLoading(true);

    // Run on delete function
    const success = await onDeleteConfirm();

    if (success) {
      setIsLoading(false);
    } else {
      // Show error toast
      showToast({
        status: "error",
        title: "Something went wrong. Please try again later.",
      });
    }
    // Close modal
    onClose();
  };

  return (
    <>
      {/* Alert trigger */}
      <Button onClick={onOpen} {...styles.trigger}>
        Delete
      </Button>

      {/* Alert */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        {...styles.alert}
      >
        <AlertDialogOverlay />

        <AlertDialogContent {...styles.content}>
          <AlertDialogHeader {...styles.header}>
            Account Deletion
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want out? Once your account is deleted, it cannot
            be recovered.
          </AlertDialogBody>
          <AlertDialogFooter {...styles.footer}>
            <Button
              ref={cancelRef}
              onClick={onClose}
              background="gray.200"
              {...styles.button}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              isLoading={isLoading}
              background="red.600"
              _hover={{
                background: "red.900",
              }}
              {...styles.button}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { DeleteAlert };

// Styles

const styles = {
  trigger: {
    background: "red.600",
    color: "white",
    marginY: { base: "2em", md: "5vh" },
    width: { base: "100%", md: "7em" },
    paddingX: "5em",
    boxShadow: "lg",
    _hover: {
      background: "red.900",
    },
  },
  alert: {
    isCentered: true,
    motionPreset: "slideInBottom",
  },
  content: {
    borderRadius: "0.5em",
    paddingX: { base: "0.5em", md: "1em" },
    paddingY: "1em",
  },
  header: {
    textAlign: "center",
    paddingY: "0.5em",
  },
  body: {
    align: "center",
  },
  footer: {
    paddingY: "1vh",
    width: { base: "100%", md: "100%" },
    marginX: "auto",
  },
  button: {
    loadingText: "Deleting",
    spinnerPlacement: "end",
    marginY: "1vh",
    marginX: "1",
    paddingY: { base: "1.5em", md: "1.75em" },
    width: "100%",
    borderRadius: "0.5em",
    color: "white",
    boxShadow: "lg",
  },
};
