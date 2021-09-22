import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { IconNavigation } from "./IconNavigation";

const UserNavigation = ({ user, isPortrait }) => {
  const { firstName } = user || {};
  const iconNavigationProps = { user, isPortrait };
  return (
    <>
      <IconNavigation {...iconNavigationProps} />
      {!isPortrait && (
        <Flex {...styles.bar}>
          <Text {...styles.notice}>
            Welcome {firstName} 👋🏼 Version 1.0 of Flavors is under development.{" "}
            <Link href="#" {...styles.link}>
              Reach <ExternalLinkIcon {...styles.external} />
            </Link>{" "}
            out to us if you have any questions.
          </Text>
        </Flex>
      )}
    </>
  );
};

export { UserNavigation };

// Styles

const styles = {
  bar: {
    justify: "center",
    align: "center",
    height: "2.5em",
    background: "rgba(240,240,240,0.5)",
    backdropFilter: "blur(10px)",
    boxShadow: "md",
  },
  notice: {
    color: "gray.800",
    fontSize: "sm",
  },
  link: {
    isExternal: true,
    textTransform: "underline",
  },
  external: {
    size: "xs",
    marginX: "1px",
  },
};
