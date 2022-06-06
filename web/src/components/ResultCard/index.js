import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ResultCard = ({ _id, image, price, title, meta, isSearchLoading }) => {
  return (
    <Flex opacity={isSearchLoading && "0.1"} {...styles.wrapper}>
      <Link href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/plates/${_id}`}>
        <a>
          <AspectRatio
            // onClick={() => setActive(_id)}
            {...styles.aspect}
          >
            <Image
              src={image}
              alt="Flavors"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority="true"
            />
          </AspectRatio>
          <Text {...styles.price}>{price}</Text>
          <Text {...styles.title}>{title}</Text>
          <Text {...styles.meta}>{meta}</Text>
        </a>
      </Link>
    </Flex>
  );
};

export { ResultCard };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    flex: { base: "1 1 48%", md: "1 1 24%" },
    maxWidth: { base: "48%", md: "24%" },
    marginBottom: { base: "2vh", md: "2vh" },
    marginX: "0",
    cursor: "pointer",
  },
  aspect: {
    ratio: 1,
    width: "100%",
    boxShadow: "lg",
    borderRadius: "0.5em",
    overflow: "hidden",
  },
  price: {
    fontSize: "12pt",
    fontWeight: "bold",
    paddingTop: "2",
    paddingBottom: "1",
  },
  title: {
    fontSize: "12pt",
    noOfLines: 2,
    lineHeight: "1.2em",
  },
  meta: {
    fontSize: "11pt",
    color: "gray.400",
    paddingY: "1",
    noOfLines: 1,
  },
};
