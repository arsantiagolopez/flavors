import { Avatar, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "urql";
import { Me as MeQuery } from "../../graphql/queries/user";
import { Logo } from "../Logo";
// import { ProfileAvatar } from "../ProfileAvatar";
import { ResponsiveSearchIcon } from "../ResponsiveSearchIcon";
// Sticky navigation: Logo, search bar and authentication nav

const StickyNavigation = () => {
  // MeQuery returns true if user exists, log in
  const [{ data: authData }] = useQuery({
    query: MeQuery,
  });

  const [isSearchFocused, setSearchFocused] = useState(false);

  let body;

  // User not logged in
  if (!authData?.me) {
    body = (
      <Flex direction="row">
        <Link href="/signin">
          <Button {...styles.button} {...styles.signin}>
            Sign in
          </Button>
        </Link>
        <Link href="/joinus">
          <Button {...styles.button} {...styles.joinus}>
            Join us
          </Button>
        </Link>
      </Flex>
    );
  }
  // User logged in
  else {
    // body = <ProfileAvatar />;
    body = <Avatar />;
  }

  const searchProps = { isSearchFocused, setSearchFocused };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.bar}>
        {/* Display full width search bar on focus */}
        {isSearchFocused ? (
          <Flex {...styles.leftSection}>
            <ResponsiveSearchIcon {...searchProps} />
          </Flex>
        ) : (
          <Flex {...styles.leftSection}>
            <Logo paddingX="1em" color="white" fontSize="18pt" />
            <ResponsiveSearchIcon {...searchProps} />
          </Flex>
        )}

        {/* Show auth when search not focused */}
        {!isSearchFocused && <Flex {...styles.rightSection}>{body}</Flex>}
      </Flex>
    </Flex>
  );
};

export { StickyNavigation };

// Styles

const styles = {
  wrapper: {
    position: "sticky",
    top: "0",
    height: "3em",
    width: "100%",
    justify: "center",
    align: "center",
    paddingX: { base: "1em", md: "10vw" },
    // background: "rgba(300,300,300,0.5)",
    background: "rgba(0,0,10, 0.8)",
    zIndex: "500",
    backdropFilter: "blur(10px)",
  },
  bar: {
    width: "100%",
    justify: "space-between",
    align: "center",
  },
  button: {
    borderRadius: "2em",
    fontWeight: "normal",
    size: "sm",
  },
  signin: {
    variant: "link",
    color: "lightgray",
    marginRight: "2",
    padding: "2",
  },
  joinus: {
    background: "white",
    color: "gray.800",
  },
  leftSection: {
    align: "center",
    width: "100%",
  },
  rightSection: {
    align: "center",
    height: "100%",
  },
};
