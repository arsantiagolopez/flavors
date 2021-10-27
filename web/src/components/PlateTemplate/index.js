import { AspectRatio, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Breadcrumb } from "../Breadcrumb";
import { HeadingWithSkeleton } from "../HeadingWithSkeleton";
// import { Location } from "./Location";
import { Summary } from "./Summary";

const PlateTemplate = ({ user, plate, seller }) => {
  const { _id, image, category, subCategory, title, description } = plate || {};

  const breadcrumbLinks = [
    { name: "Home", href: "/" },
    {
      name: category,
      href: `/${category?.toLowerCase()}`,
    },
    { name: subCategory, href: `/${subCategory?.toLowerCase()}` },
  ];

  const breadcrumbProps = { links: breadcrumbLinks };
  const summaryProps = { plate, seller };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        <HeadingWithSkeleton {...styles.title}>{title}</HeadingWithSkeleton>
        <Breadcrumb {...breadcrumbProps} />
      </Flex>

      <Flex {...styles.landing}>
        {/* Left */}
        <AspectRatio {...styles.aspect}>
          {image ? (
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority="true"
            />
          ) : (
            <Skeleton {...styles.placeholder} />
          )}
        </AspectRatio>

        {/* Right */}
        <Summary {...summaryProps} />
      </Flex>

      <Flex {...styles.section}>
        <Heading {...styles.heading}>More details</Heading>
        <Text {...styles.text}>{description}</Text>
      </Flex>

      <Flex {...styles.section}>
        <Heading {...styles.heading}>
          Customers who viewed this item also viewed
        </Heading>
      </Flex>

      <Flex {...styles.section}>
        <Heading {...styles.heading}>Location</Heading>
        {/* <Location /> */}
      </Flex>

      <Flex {...styles.section}>
        <Heading {...styles.heading}>More on the seller</Heading>
      </Flex>

      <Flex {...styles.section}>
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
    overflow: { base: "none", md: "hidden" },
  },
  placeholder: {
    width: "100%",
    height: "100%",
  },
  section: {
    direction: "column",
    paddingBottom: { base: "1em", md: "5vh" },
  },
  heading: {
    size: "lg",
  },
  text: {
    color: "gray.600",
    paddingY: "3vh",
  },
};
