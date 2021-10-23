import { AspectRatio, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Breadcrumb } from "../Breadcrumb";
import { Summary } from "./Summary";

const PlateTemplate = ({ user, data }) => {
  const { id, image, title, seller } = data || {};

  const breadcrumbLinks = [
    { name: "Home", href: "/" },
    {
      name: "Electronics & Media Books, Movies, & Music",
      href: "/categories/electronics",
    },
    { name: "Go Pro Max 360", href: "#" },
  ];

  const breadcrumbProps = { links: breadcrumbLinks };
  const summaryProps = { data };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        <Heading {...styles.title}>{title}</Heading>
        <Breadcrumb {...breadcrumbProps} />
      </Flex>

      <Flex {...styles.landing}>
        {/* Left */}
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

        {/* Right */}
        <Summary {...summaryProps} />
      </Flex>

      <Flex {...styles.description}>
        <Heading {...styles.heading}>More details</Heading>
      </Flex>

      <Flex {...styles.description}>
        <Heading {...styles.heading}>
          Customers who viewed this item also viewed
        </Heading>
      </Flex>

      <Flex {...styles.description}>
        <Heading {...styles.heading}>More on the seller</Heading>
      </Flex>

      <Flex {...styles.description}>
        <Heading {...styles.heading}>Customer reviews</Heading>
      </Flex>
    </Flex>
  );
};

export { PlateTemplate };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "1em", md: "7vh" },
  },
  header: {
    direction: "column",
    paddingBottom: { base: "1em", md: "3vh" },
  },
  title: {
    fontWeight: "bold",
    letterSpacing: "tighter",
    noOfLines: { base: 2, md: 1 },
  },
  landing: {
    direction: { base: "column", md: "row" },
    justify: "space-between", // mobile ?
    paddingBottom: { base: "1em", md: "5vh" },
  },
  aspect: {
    ratio: 1,
    width: { base: "100%", md: "50%" },
    boxShadow: "lg",
    borderRadius: "0.5em",
    overflow: "hidden",
  },
  description: {
    direction: "column",
    paddingBottom: { base: "1em", md: "5vh" },
  },
  heading: {
    size: "lg",
  },
};
