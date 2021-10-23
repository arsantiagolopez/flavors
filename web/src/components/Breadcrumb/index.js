import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ links }) => (
  <ChakraBreadcrumb
    separator={<ChevronRightIcon {...styles.separator} />}
    {...styles.breadcrumb}
  >
    {links.map(({ name, href }) => (
      <BreadcrumbItem key={href}>
        <BreadcrumbLink as={Link} href={href}>
          {name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </ChakraBreadcrumb>
);

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
};
