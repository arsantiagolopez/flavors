import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ links }) => {
  const linksLoaded = !links?.some(({ href }) => href.includes("undefined"));

  if (!linksLoaded) {
    return (
      <Flex {...styles.skeleton}>
        <Skeleton
          {...styles.categorySkeleton}
          width={{ base: "15%", md: "5%" }}
        />
        <ChevronRightIcon {...styles.chevron} />
        <Skeleton {...styles.categorySkeleton} />
        <ChevronRightIcon {...styles.chevron} />
        <Skeleton
          {...styles.categorySkeleton}
          width={{ base: "30%", md: "15%" }}
        />
      </Flex>
    );
  }

  return (
    <ChakraBreadcrumb
      separator={<ChevronRightIcon {...styles.separator} />}
      {...styles.breadcrumb}
    >
      {links?.map(({ name, href }, index) => (
        <BreadcrumbItem key={index} {...styles.link}>
          <BreadcrumbLink as={Link} href={href}>
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export { Breadcrumb };

// Styles

const styles = {
  breadcrumb: {
    paddingY: "1vh",
    color: "gray.400",
    isTruncated: true,
  },
  separator: {
    color: "gray.500",
  },
  skeleton: {
    marginY: { base: "2vh", md: "2vh" },
    dirction: "row",
    align: "center",
  },
  categorySkeleton: {
    height: { base: "1.5rem", md: "1.5rem" },
    width: { base: "20%", md: "7%" },
  },
  chevron: {
    marginX: "1",
  },
  link: {
    _hover: {
      color: "gray.500",
      fontWeight: "semibold",
      letterSpacing: "tight",
    },
  },
};
