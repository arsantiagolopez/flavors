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
    direction: "row",
    width: "100%",
    height: "8vh",
    minHeight: "8vh",
    boxShadow: "sm",
    borderRadius: "0.5em",
    marginBottom: "2",
    cursor: "pointer",
    _hover: {
      background: "gray.100",
    },
  },
  card: {
    direction: "row",
    justify: "space-between",
    align: "center",
    width: "100%",
    height: "100%",
    paddingX: "2",
  },
  photos: {
    direction: "row",
    cursor: "pointer",
  },
  photo: {
    boxSize: "3em",
  },
  backPhoto: {
    zIndex: "3",
  },
  frontPhoto: {
    zIndex: "5",
    marginLeft: "-1.5em",
  },
  meta: {
    direction: "column",
    justify: "center",
    align: "flex-start",
    letterSpacing: "tight",
    cursor: "pointer",
    maxWidth: "45%",
    minWidth: "30%",
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
  },
  actions: {
    direction: "column",
    width: "10%",
    height: "100%",
    marginRight: "-2",
  },
  button: {
    justify: "center",
    align: "center",
    height: "100%",
    cursor: "pointer",
  },
  acceptButton: {
    background: "green.400",
    borderTopRightRadius: "0.5em",
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
    borderBottomRightRadius: "0.5em",
    _hover: {
      background: "red.500",
    },
  },
  closeIcon: {
    color: "white",
  },
};
