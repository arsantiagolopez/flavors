import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
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
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineStop } from "react-icons/ai";
import { IoDocumentText, IoEyeSharp, IoPricetag } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

const DetailsModal = ({ plate, isOpen, onOpen, onClose }) => {
  const {
    id,
    tags,
    menu,
    title,
    description,
    price,
    category,
    subCategory,
    image,
  } = plate || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...styles.wrapper}>
      <ModalOverlay {...styles.overlay} />
      <ModalContent>
        <ModalHeader {...styles.header}>Plate Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody {...styles.body}>
          <Flex {...styles.plate}>
            <AspectRatio {...styles.aspect}>
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
                quality={100}
                priority="true"
              />
            </AspectRatio>

            <Flex {...styles.meta}>
              <Text {...styles.category}>
                {category} <ChevronRightIcon /> {subCategory}
              </Text>
              <Text {...styles.title}>{title}</Text>
              <Text>{price}</Text>

              <Heading {...styles.heading}>Description</Heading>
              <Text {...styles.text} {...styles.description}>
                {description}
              </Text>
            </Flex>
          </Flex>

          {tags?.length ? (
            <Flex {...styles.tags}>
              {tags.map((tag) => (
                <Text key={tag} {...styles.tag}>
                  {tag}
                </Text>
              ))}
            </Flex>
          ) : (
            <Flex {...styles.tags} {...styles.empty}>
              No tags? Tags help your plate be seen by more people. Add some!
            </Flex>
          )}

          <Divider {...styles.divider} />

          <Flex {...styles.insights}>
            <Heading {...styles.heading} paddingTop="0">
              Insights
            </Heading>
            <Text {...styles.text}>
              <Icon as={IoEyeSharp} {...styles.icon} />
              23 views
            </Text>
            <Text {...styles.text}>
              <Icon as={IoPricetag} {...styles.icon} />3 sales
            </Text>
            <Text {...styles.text}>
              <Icon as={AiOutlineStop} {...styles.icon} />
              Listing is marked as out of stock.
            </Text>
          </Flex>

          <Divider {...styles.divider} />

          <Flex {...styles.actions}>
            {/* @todo: Edit */}
            <Button {...styles.button} rightIcon={<Icon as={CheckIcon} />}>
              Mark as available
            </Button>
            <Link href={`/plates/${id}`}>
              <Button
                {...styles.button}
                rightIcon={<Icon as={IoDocumentText} />}
              >
                View listing
              </Button>
            </Link>
            <Link href={`/plates/edit/${id}`}>
              <Button {...styles.button} rightIcon={<Icon as={MdModeEdit} />}>
                Edit listing
              </Button>
            </Link>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { DetailsModal };

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
  plate: {
    direction: { base: "column", md: "row" },
  },
  aspect: {
    ratio: 1,
    width: { base: "100%", md: "35%" },
    minWidth: { base: "100%", md: "35%" },
    boxShadow: "lg",
    borderRadius: "0.5em",
    overflow: "hidden",
  },
  meta: {
    direction: "column",
    paddingX: { base: "0", md: "2vw" },
    paddingY: { base: "1em", md: "0" },
    maxWidth: "100%",
  },
  category: {
    color: "gray.400",
    fontSize: "10pt",
  },
  title: {
    fontSize: "14pt",
    fontWeight: "semibold",
    noOfLines: "2",
    paddingY: { base: "1", md: "1" },
  },
  heading: {
    fontSize: { base: "xl", md: "xl" },
    paddingY: { base: "1", md: "2" },
    paddingTop: { base: "2", md: "2vh" },
  },
  text: {
    color: "gray.600",
  },
  description: {
    lineHeight: { base: "1.3em", md: "1.2em" },
    noOfLines: 3,
  },
  icon: {
    marginRight: "3",
  },
  tags: {
    direction: "row",
    align: "center",
    width: "100%",
    wrap: "wrap",
    paddingTop: { base: "1vh", md: "3vh" },
    overflow: "hidden",
    textAlign: "left",
  },
  tag: {
    borderRadius: "2em",
    marginBottom: { base: "1", md: "2" },
    marginRight: { base: "1", md: "2" },
    paddingX: { base: "1em", md: "1vw" },
    paddingY: { base: "1", md: "1.5" },
    background: "gray.800",
    color: "white",
  },
  empty: {
    color: "gray.400",
    lineHeight: { base: "1.3em", md: "1.2em" },
  },
  divider: {
    marginY: "2vh",
  },
  insights: {
    direction: "column",
  },
  actions: {
    direction: "column",
  },
  button: {
    marginBottom: "1vh",
  },
};
