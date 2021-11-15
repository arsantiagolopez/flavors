import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { Logo } from "../Logo";
import { ProfileAvatar } from "../ProfileAvatar";
import { ResponsiveSearchIcon } from "../ResponsiveSearchIcon";

const StickyNavigation = ({ user }) => {
  const [isSearchFocused, setSearchFocused] = useState(false);

  let body;

  if (!user) {
    body = (
      <Flex>
        <Link href="/signin">
          <Button {...styles.signin}>Log in</Button>
        </Link>
        <Link href="/joinus">
          <Button {...styles.joinus}>Join us</Button>
        </Link>
      </Flex>
    );
  }
  // User logged in
  else {
    body = <ProfileAvatar user={user} />;
  }

  const searchProps = { isSearchFocused, setSearchFocused };

  return (
    <Flex
      // width=
      {...styles.wrapper}
    >
      {/* Display full width search bar on focus */}
      {isSearchFocused ? (
        <Flex {...styles.left}>
          <ResponsiveSearchIcon {...searchProps} />
        </Flex>
      ) : (
        <Flex {...styles.left}>
          <Logo {...styles.logo} />
          <ResponsiveSearchIcon {...searchProps} />
        </Flex>
      )}

      {/* Show auth when search not focused */}
      {!isSearchFocused && <Flex {...styles.right}>{body}</Flex>}
    </Flex>
  );
};

export { StickyNavigation };

// Styles

const styles = {
  wrapper: {
    zIndex: "500",
    position: "sticky",
    top: "0",
    height: "3em",
    width: "100%",
    justify: "space-between",
    align: "center",
    paddingX: { base: "1em", md: "20vw" },
    background: "rgba(300,300,300,0.5)",
    backdropFilter: "blur(10px)",
    alignSelf: "center",
  },
  signin: {
    background: "transparent",
    borderRadius: "2em",
    fontWeight: "normal",
    variant: "link",
    color: "lightgray",
    size: "sm",
    marginRight: "2",
    padding: "2",
  },
  joinus: {
    background: "red.500",
    color: "white",
    borderRadius: "2em",
    fontWeight: "normal",
    size: "sm",
    paddingY: "1",
  },
  left: {
    align: "center",
    width: "100%",
  },
  right: {
    align: "center",
    height: "100%",
  },
  logo: {
    paddingRight: "3",
  },
};
