import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useController } from "react-hook-form";
import { categoriesData } from "./categoriesData";

const CategorySelect = ({ name, control, errors }) => {
  const [selection, setSelection] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    field: { ref, value, onChange, ...controllerProps },
  } = useController({
    name,
    control,
    rules: { required: "Please choose a category." },
  });

  const handleSelection = (category, subCategory) => {
    onChange({ category, subCategory });
    setSelection({ category, subCategory });
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        color={selection ? "gray.800" : "gray.400"}
        border={errors?.category && "2px solid"}
        borderColor={errors?.category && "red.500"}
        rightIcon={
          selection ? (
            <CheckIcon color="green.400" {...styles.icon} />
          ) : (
            <ChevronDownIcon {...styles.icon} />
          )
        }
        {...styles.trigger}
      >
        <Text {...styles.text}>
          {selection ? (
            <>
              {selection?.category.label}
              <ChevronRightIcon />
              {selection?.subCategory.label}
            </>
          ) : (
            "Category"
          )}
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay {...styles.overlay} />
        <ModalContent>
          <ModalHeader>Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody {...styles.body}>
            <Accordion allowToggle {...controllerProps}>
              {categoriesData.map(({ name, label, sub }) => (
                <AccordionItem key={name} {...styles.categories}>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        fontWeight={isExpanded && "bold"}
                        {...styles.button}
                      >
                        <Text {...styles.label}>{label}</Text>
                        <AccordionIcon marginRight="2" />
                      </AccordionButton>

                      <AccordionPanel {...styles.panel}>
                        <Flex direction="column">
                          {sub.map((subCategory) => {
                            const { name: id, label: subLabel } = subCategory;
                            const parentCategory = { name, label };
                            return (
                              <Text
                                key={id}
                                onClick={() =>
                                  handleSelection(parentCategory, subCategory)
                                }
                                {...styles.subLabel}
                              >
                                {subLabel}
                              </Text>
                            );
                          })}
                        </Flex>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CategorySelect };

// Styles

const styles = {
  trigger: {
    position: "relative",
    variant: "outline",
    fontWeight: "normal",
    width: "100%",
    justify: "flex-end",
    paddingY: "1.75em",
    _hover: {
      background: "none",
      border: "1px solid",
      borderColor: "gray.300",
      color: "gray.400",
    },
    _active: {
      background: "none",
    },
  },
  text: {
    width: "100%",
    textAlign: "left",
    isTruncated: true,
    maxWidth: "90%",
    marginRight: "auto",
  },
  overlay: {
    backdropFilter: "blur(2px)",
  },
  icon: {
    position: "absolute",
    top: "0",
    right: "1em",
    height: "100%",
  },
  body: {
    paddingBottom: "3vh",
    paddingX: "2em",
  },
  categories: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  button: {
    paddingY: "0.75em",
    paddingX: "0",
    width: "100%",
    _hover: {
      background: "none",
      fontWeight: "bold",
    },
  },
  label: {
    isTruncated: true,
  },
  panel: {
    borderLeft: "1px solid rgba(200,200,200,0.3)",
    paddingY: "0",
    paddingX: "0",
  },
  subLabel: {
    paddingY: "0.5em",
    cursor: "pointer",
    paddingLeft: { base: "1em", md: "1vw" },
    _hover: {
      fontWeight: "bold",
      letterSpacing: "tight",
      bg: "gray.100",
    },
    _active: {
      fontWeight: "bold",
      letterSpacing: "tight",
      bg: "gray.100",
    },
  },
};
