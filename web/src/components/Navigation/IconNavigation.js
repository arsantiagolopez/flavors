import { Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  IoFileTrayOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTrendingUpSharp,
} from "react-icons/io5";
import { Logo } from "../Logo";

/**
 * @todo: Show more icons for nav in desktop version
 * Limit mobile to important 4
 * Ref: https://www.apple.com/
 */

const IconNavigation = ({ user, isPortrait }) => (
  <Flex {...styles.wrapper}>
    <Flex {...styles.bar}>
      {!isPortrait && <Logo {...styles.logo} />}

      <Link href="/dashboard">
        <IconButton
          aria-label="Dashboard"
          icon={<IoTrendingUpSharp />}
          {...styles.icon}
        />
      </Link>
      <Link href="/explore">
        <IconButton
          aria-label="Explore"
          icon={<IoSearchOutline />}
          {...styles.icon}
        />
      </Link>
      <Link href="/messages">
        <IconButton
          aria-label="Messages"
          icon={<IoFileTrayOutline />}
          {...styles.icon}
        />
      </Link>
      <Link href="/account">
        <IconButton
          aria-label="My Account"
          icon={<IoPersonOutline />}
          {...styles.icon}
        />
      </Link>
    </Flex>
  </Flex>
);

export { IconNavigation };

// Styles

const styles = {
  wrapper: {
    zIndex: "500",
    position: "sticky",
    top: "0",
    height: "3em",
    width: "100%",
    justify: "center",
    align: "center",
    paddingX: { base: "1em", md: "10vw" },
    background: "rgba(0,0,10, 0.8)",
    backdropFilter: "blur(10px)",
  },
  bar: {
    position: "relative",
    width: "100%",
    justify: "space-around",
    align: "center",
    height: "100%",
    paddingX: { base: "0", md: "35%" },
  },
  logo: {
    marginLeft: "-3em",
    marginRight: "1em",
    color: "white",
    fontSize: "18pt",
    _hover: {
      color: "gray.800",
    },
  },
  icon: {
    colorScheme: "white",
    fontSize: "14pt",
    background: "transparent",
    _hover: {
      color: "gray.800",
    },
  },
};
