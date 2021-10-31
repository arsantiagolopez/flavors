import { CheckIcon } from "@chakra-ui/icons";
import {
  Avatar,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { DetailsModal } from "./DetailsModal";

const Order = ({ order }) => {
  const { buyer, plate } = order || {};

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get first name and last name initial
  const formatName = (name) => {
    let [first, ...last] = name.split(" ");
    return `${first} ${last[0][0]}.`;
  };

  const detailsModalProps = { order, isOpen, onOpen, onClose };

  return (
    <Flex {...styles.wrapper}>
      {/* Card */}
      <Flex onClick={onOpen} {...styles.card}>
        <Flex {...styles.photos}>
          <Avatar src={plate?.photo} {...styles.photo} {...styles.backPhoto} />
          <Avatar src={buyer?.photo} {...styles.photo} {...styles.frontPhoto} />
        </Flex>

        <Flex {...styles.meta}>
          <Text {...styles.name}>{formatName(buyer?.name)}</Text>
          <Text {...styles.rating}>
            {buyer?.rating} {buyer?.ratingAmount}
          </Text>
        </Flex>

        <Flex {...styles.time}>
          <CircularProgress value={40} {...styles.progress}>
            <CircularProgressLabel letterSpacing="tight">
              15:59
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </Flex>

      {/* Actions */}
      <Flex {...styles.actions}>
        <Flex {...styles.button} {...styles.declineButton}>
          <Icon as={IoCloseSharp} {...styles.closeIcon} />
        </Flex>
        <Flex {...styles.button} {...styles.acceptButton}>
          <CheckIcon {...styles.checkIcon} />
        </Flex>
      </Flex>

      {/* Modal */}
      <DetailsModal {...detailsModalProps} />
    </Flex>
  );
};

export { Order };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: { base: "30vw", md: "10vw" },
    minWidth: { base: "30vw", md: "10vw" },
    height: "100%",
    boxShadow: { base: "sm", md: "md" },
    borderRadius: "0.5em",
    marginRight: "2",
    cursor: "pointer",
    _hover: {
      background: "gray.100",
    },
  },
  card: {
    direction: "column",
    justify: "space-between",
    align: "center",
    width: "100%",
    height: "100%",
    paddingY: { base: "1vh", md: "2vh" },
  },
  photos: {
    direction: "row",
  },
  photo: {
    boxSize: { base: "2em", md: "3em" },
  },
  backPhoto: {
    zIndex: "3",
  },
  frontPhoto: {
    zIndex: "5",
    marginLeft: { base: "-1em", md: "-1.5em" },
  },
  meta: {
    direction: "column",
    justify: "center",
    align: "center",
    letterSpacing: "tight",
    cursor: "pointer",
    maxWidth: "100%",
    minWidth: "100%",
    paddingY: { base: "1", md: "1vh" },
  },
  name: {
    fontWeight: "semibold",
    letterSpacing: "tight",
    color: "gray.800",
    maxWidth: "100%",
    isTruncated: true,
  },
  rating: {
    color: "gray.400",
    fontSize: { base: "8pt", md: "10pt" },
    isTruncated: true,
  },
  time: {
    direction: "column",
    justify: "flex-start",
    align: "center",
  },
  progress: {
    color: "gray.800",
    size: { base: "1.5em", md: "1.75em" },
  },
  actions: {
    direction: "row",
    width: "100%",
    height: "100%",
  },
  button: {
    justify: "center",
    align: "center",
    height: "100%",
    width: "100%",
    cursor: "pointer",
    paddingY: "1.5",
  },
  acceptButton: {
    background: "green.400",
    borderBottomRightRadius: "0.5em",
    _hover: {
      background: "green.500",
    },
  },
  checkIcon: {
    color: "white",
    width: "45%",
  },
  declineButton: {
    background: "red.400",
    borderBottomLeftRadius: "0.5em",
    _hover: {
      background: "red.500",
    },
  },
  closeIcon: {
    color: "white",
  },
};
