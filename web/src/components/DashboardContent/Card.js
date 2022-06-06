import { CheckIcon } from "@chakra-ui/icons";
import { AspectRatio, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

const Card = ({ card, index }) => {
  const [hovered, setHovered] = useState(null);
  const wrapperRef = useRef();
  const { _id, title, price, image } = card || {};

  // Set item to hovered
  const handleItemHover = (id) => setHovered(id);

  // Prevent ref's children form clearing hovered state
  const clearHovered = (event) => {
    const { relatedTarget: hoveredNode } = event;
    const hoveredNodeInsideRef = wrapperRef?.current?.contains(hoveredNode);
    if (!hoveredNodeInsideRef) setHovered(null);
  };

  return (
    <Flex
      ref={wrapperRef}
      onMouseEnter={() => handleItemHover(_id)}
      onMouseOut={clearHovered}
      marginRight={{ base: index % 2 && "1%", md: "0" }}
      {...styles.wrapper}
    >
      <Link href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/plates/${_id}`}>
        <a>
          <AspectRatio {...styles.aspect}>
            <Flex direction="column">
              {image && (
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  priority="true"
                />
              )}

              <Icon
                opacity={hovered === _id ? "1" : "0"}
                as={IoEyeSharp}
                {...styles.eye}
              />
            </Flex>
          </AspectRatio>
          <Flex {...styles.meta}>
            <Text {...styles.price}>{price}</Text>
            <Text {...styles.title}>{title}</Text>
            <Flex {...styles.insights}>
              <Text {...styles.views} marginRight="auto">
                0 views
              </Text>
              <Text {...styles.sales} marginRight="auto">
                0 sales
              </Text>
              <Icon as={CheckIcon} marginLeft="auto" />
            </Flex>
          </Flex>
        </a>
      </Link>
    </Flex>
  );
};

export { Card };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    flex: { base: "1 1 40%", md: "1 1 20%" },
    minWidth: { base: "40%", md: "20%" },
    maxWidth: { base: "40%", md: "20%" },
    marginBottom: { base: "1%", md: "1%" },
    cursor: "pointer",
    padding: { base: "2", md: "1vw" },
  },
  aspect: {
    ratio: 1,
    width: "100%",
    boxShadow: "lg",
    borderRadius: "0.5em",
    overflow: "hidden",
  },
  eye: {
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
  insights: {
    direction: "row",
    justify: "space-around",
    align: "center",
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
