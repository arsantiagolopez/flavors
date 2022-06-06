import { AspectRatio, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SellingSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      name: "Pasta carbonara",
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 2,
      name: "Italian food",
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 3,
      name: "Sushi",
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 4,
      name: "Pasta carbonara",
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 5,
      name: "Sushi",
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 6,
      name: "Pasta carbonara",
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ];
  return (
    <Flex {...styles.wrapper}>
      {suggestions.map(({ id, name, image }) => (
        <Flex key={id} {...styles.card}>
          <AspectRatio {...styles.aspect}>
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority="true"
            />
          </AspectRatio>
          <Flex {...styles.meta}>
            <Text {...styles.name}>{name}</Text>
            <Link href="/sell/create">
              <Button {...styles.button}>Create</Button>
            </Link>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export { SellingSuggestions };

// Styles

const styles = {
  wrapper: {
    position: { base: "absolute", md: "static" },
    left: { base: "-1.5em", md: "auto" },
    direction: "row",
    height: { base: "35vh", md: "30vh" },
    overflowX: "scroll",
    width: { base: "100vw", md: "100%" },
    maxWidth: { base: "100vw", md: "100%" },
    marginY: "3vh",
    padding: { base: "3", md: "2" },
    paddingX: { base: "1.5em", md: "2" },
    paddingRight: { base: "0.5em", md: "2" },
  },
  card: {
    direction: "column",
    borderRadius: "0.5em",
    width: { base: "42vw", md: "10vw" },
    minWidth: { base: "42vw", md: "10vw" },
    marginRight: { base: "2vw", md: "1vw" },
    overflow: "hidden",
    boxShadow: "md",
  },
  aspect: {
    ratio: 1,
    height: "60%",
    width: "100%",
  },
  meta: {
    direction: "column",
    height: "100%",
    padding: "2",
  },
  name: {
    color: "gray.800",
    letterSpacing: "tight",
    lineHeight: "1em",
    noOfLines: { base: 1, md: 2 },
  },
  button: {
    marginTop: "auto",
    marginBottom: "1",
    width: "auto",
    paddingY: "1",
    fontSize: "10pt",
  },
};
