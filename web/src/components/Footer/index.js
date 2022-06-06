import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Logo } from "../Logo";

/**
 * @todo: Make categories and links into accordion for mobile.
 * Leave as is for desktop.
 */

const Footer = () => {
  const categories = [
    {
      id: "sell",
      category: "Make Money With Us",
      links: [
        {
          label: "Sell products on Flavors",
          href: "/sell",
        },
        {
          label: "Seller protection",
          href: "/seller-protection",
        },
      ],
    },
    {
      id: "socials",
      category: "Stay In Touch",
      links: [
        {
          label: "Instagram",
          href: "/instagram",
          icon: null,
        },
        {
          label: "Twitter",
          href: "/twitter",
          icon: null,
        },
        {
          label: "Facebook",
          href: "/facebook",
          icon: null,
        },
      ],
    },
    {
      id: "about",
      category: "Who We Are",
      links: [
        {
          label: "Our goal",
          href: "/goal",
        },
        {
          label: "Policies",
          href: "/policy",
        },
      ],
    },
    {
      id: "help",
      category: "Let Us Help You",
      links: [
        {
          label: "Your account",
          href: "/account",
        },
        {
          label: "Your orders",
          href: "/orders",
        },
        {
          label: "Contact us",
          href: "/contact",
        },
      ],
    },
    {
      id: "legal",
      category: "Legal",
      links: [
        {
          label: "Privacy policy",
          href: "/policy",
        },
        {
          label: "Terms of services",
          href: "/terms",
        },
        {
          label: "Trademark policy",
          href: "/trademark",
        },
      ],
    },
  ];
  return (
    <Flex id="footer" {...styles.wrapper}>
      <Flex {...styles.categories}>
        {categories.map(({ id, category, links }) => (
          <Flex key={id} {...styles.category}>
            <Text key={id} {...styles.heading}>
              {category}
            </Text>
            <Flex {...styles.links}>
              {links.map(({ label, href, icon }) => (
                <Link key={href} href={href}>
                  <Text {...styles.link}>
                    {icon && <Icon as={icon} {...styles.icon} />}
                    {label}
                  </Text>
                </Link>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex {...styles.copyright}>
        <Logo isWhite={true} {...styles.logo} />
        <Text {...styles.disclaimer}>
          ⓒ {new Date().getFullYear()} Flavors, All rights reserved.
        </Text>
      </Flex>
    </Flex>
  );
};

export { Footer };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    align: "center",
    height: "100%",
    color: "white",
    width: "100%",
    background: "rgba(0,0,10, 0.8)",
    paddingY: { base: "4vh", md: "5vh" },
    paddingX: { base: "2em", md: "20vw" },
  },
  categories: {
    direction: { base: "column", md: "row" },
    justify: { base: "center", md: "space-between" },
    wrap: "wrap",
    width: "100%",
    // borderTop: "0.5px solid",
    // borderBottom: "0.5px solid",
    // borderColor: "gray.100",
    color: "white",
    fontSize: "10pt",
    maxHeight: { base: "35vh", md: "30vh" },
  },
  category: {
    direction: "column",
    marginY: { base: "1vh", md: "2vh" },
  },
  heading: {
    fontWeight: "bold",
  },
  links: {
    direction: "column",
    paddingTop: "1",
  },
  copyright: {
    direction: "column",
    justify: "center",
    align: "center",
    marginTop: { base: "3vh", md: "4vh" },
  },
  logo: {
    paddingBottom: "1vh",
  },
  disclaimer: {
    fontSize: "10pt",
  },
};
