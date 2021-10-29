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
          <Text {...styles.details}>See details</Text>
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
        <Flex {...styles.button} {...styles.acceptButton}>
          <CheckIcon {...styles.checkIcon} />
        </Flex>
        <Flex {...styles.button} {...styles.declineButton}>
          <Icon as={IoCloseSharp} {...styles.closeIcon} />
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
    direction: { base: "column", md: "row" },
    width: { base: "30vw", md: "100%" },
    minWidth: { base: "30vw", md: "100%" },
    height: { base: "95%", md: "8vh" },
    minHeight: { base: "none", md: "8vh" },
    boxShadow: "sm",
    borderRadius: "0.5em",
    marginBottom: { base: "0", md: "2" },
    paddingRight: { base: "2", md: "0" },
    cursor: "pointer",
    _hover: {
      background: "gray.100",
    },
  },
  card: {
    direction: { base: "column", md: "row" },
    justify: "space-between",
    align: "center",
    width: "100%",
    height: "100%",
    paddingX: "3",
    paddingY: { base: "1", md: "0" },
  },
  photos: {
    direction: "row",
    cursor: "pointer",
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
    align: { base: "center", md: "flex-start" },
    letterSpacing: "tight",
    cursor: "pointer",
    maxWidth: { base: "100%", md: "45%" },
    minWidth: { base: "100%", md: "30%" },
    paddingY: "1",
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
    fontSize: "8pt",
    isTruncated: true,
  },
  details: {
    display: { base: "none", md: "block" },
    color: "gray.400",
    fontSize: "8pt",
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
    direction: { base: "row", md: "column" },
    width: { base: "100%", md: "15%" },
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
    order: { base: 2, md: 1 },
    background: "green.400",
    borderTopRightRadius: { base: "0", md: "0.5em" },
    borderBottomRightRadius: { base: "0.5em", md: "0" },
    _hover: {
      background: "green.500",
    },
  },
  checkIcon: {
    color: "white",
    width: "45%",
  },
  declineButton: {
    order: { base: 1, md: 2 },
    background: "red.400",
    borderBottomRightRadius: { base: "0", md: "0.5em" },
    borderBottomLeftRadius: { base: "0.5em", md: "0" },
    _hover: {
      background: "red.500",
    },
  },
  closeIcon: {
    color: "white",
  },
};
