import { AspectRatio, Button, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoEyeSharp } from "react-icons/io5";

const Listing = ({ plate, index, isCreate }) => {
  const [hovered, setHovered] = useState(null);

  const wrapperRef = useRef();

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
    userId,
  } = plate || {};

  // Set item to hovered
  const handleItemHover = (id) => setHovered(id);

  // Prevent ref's children form clearing hovered state
  const clearHovered = (event) => {
    const { relatedTarget: hoveredNode } = event;
    const hoveredNodeInsideRef = wrapperRef?.current?.contains(hoveredNode);
    if (!hoveredNodeInsideRef) setHovered(null);
  };

  // console.log("id", id, "hovered", hovered);

  if (isCreate) {
    return (
      <Flex
        ref={wrapperRef}
        onMouseEnter={() => handleItemHover("create")}
        onMouseOut={clearHovered}
        {...styles.newCard}
        {...styles.wrapper}
      >
        <AspectRatio
          onMouseEnter={() => handleItemHover("create")}
          {...styles.aspect}
        >
          <Flex {...styles.add}>
            <Icon as={GiForkKnifeSpoon} {...styles.createIcon} />
          </Flex>
        </AspectRatio>
        <Button {...styles.new}>Create listing</Button>
      </Flex>
    );
  }

  return (
    <Flex
      ref={wrapperRef}
      onMouseEnter={() => handleItemHover(id)}
      onMouseOut={clearHovered}
      marginRight={{ base: index % 2 && "3%", md: (index + 2) % 3 && "3%" }}
      {...styles.wrapper}
    >
      <AspectRatio {...styles.aspect}>
        <Flex direction="column">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority="true"
          />

          <Icon
            opacity={hovered === id ? "1" : "0"}
            as={IoEyeSharp}
            {...styles.circleIcon}
          />
        </Flex>
      </AspectRatio>
      <Flex {...styles.meta}>
        <Text {...styles.price}>{price}</Text>
        <Text {...styles.title}>{title}</Text>
        <Flex direction="row" justify="space-around">
          <Text {...styles.views} marginRight="auto">
            0 views
          </Text>
          <Text {...styles.sales} marginRight="auto">
            0 sales
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Listing };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    flex: { base: "1 1 48%", md: "1 1 31%" },
    minWidth: { base: "48%", md: "31%" },
    maxWidth: { base: "48%", md: "31%" },
    marginBottom: { base: "3%", md: "3%" },
    cursor: "pointer",
    background: "rgba(240,240,240,0.3)",
    padding: "4",
    _hover: {
      background: "gray.100",
    },
  },
  newCard: {
    marginRight: { base: "3%", md: "3%" },
  },
  new: {
    paddingY: "1.3em",
    marginTop: { base: "1em", md: "3vh" },
  },
  add: {
    bg: "gray.100",
  },
  createIcon: {
    color: "gray.200",
    fontSize: "3em",
  },
  aspect: {
    ratio: 1,
    width: "100%",
    boxShadow: "lg",
    borderRadius: "0.5em",
    overflow: "hidden",
  },
  circleIcon: {
    position: "absolute",
    bottom: "2vh",
    right: "2vh",
    boxSize: "3vh",
    transition: "all 0.2s ease-in",
    color: "white",
  },
  meta: {
    direction: "column",
    paddingTop: "2",
  },
  price: {
    fontSize: "12pt",
    fontWeight: "bold",
  },
  title: {
    fontSize: "12pt",
    noOfLines: 1,
    lineHeight: "1.2em",
    paddingY: { base: "0.5", md: "1" },
  },
  views: {
    fontSize: "11pt",
    color: "gray.400",
    noOfLines: 1,
  },
  sales: {
    fontSize: "11pt",
    color: "gray.400",
    noOfLines: 1,
  },
};
