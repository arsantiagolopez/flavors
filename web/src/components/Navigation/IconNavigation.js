import { Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  IoFileTrayOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoPricetagsOutline,
  IoSearchOutline,
} from "react-icons/io5";

/**
 * @todo: Show more icons for nav in desktop version
 * Limit mobile to important 4
 * Ref: https://www.apple.com/
 */

const IconNavigation = ({ user }) => (
  <Flex {...styles.wrapper}>
    <Link href="/loves">
      <IconButton
        aria-label="Loves"
        icon={<IoHeartOutline />}
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
    <Link href="/sell">
      <IconButton
        aria-label="Sell"
        icon={<IoPricetagsOutline />}
        {...styles.icon}
      />
    </Link>

    <Flex {...styles.desktopOnly}>
      <Link href="/account">
        <IconButton
          aria-label="Account"
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
    height: "3em",
    width: "100%",
    justify: "space-around",
    align: "center",
    paddingX: { base: "0", md: "30vw" },
    background: "rgba(0,0,10, 0.8)",
    backdropFilter: "blur(10px)",
  },
  icon: {
    colorScheme: "white",
    fontSize: "14pt",
    background: "transparent",
    _hover: {
      color: "gray.800",
    },
  },
  desktopOnly: {
    display: { base: "none", md: "flex" },
    width: "100%",
  },
};
