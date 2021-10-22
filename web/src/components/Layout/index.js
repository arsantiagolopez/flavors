import { Flex } from "@chakra-ui/react";
import React from "react";
import { useDimensions } from "../../utils/useDimensions";
import { Footer } from "../Footer";
import { Navigation } from "../Navigation";

const Layout = ({ children, user, isAccount, isExplore, SidebarComponent }) => {
  const { height, width } = useDimensions();
  const isPortrait = height > width;

  const navigationProps = { user, isPortrait };
  return (
    <Flex {...styles.wrapper}>
      <Navigation {...navigationProps} />
      {isAccount ? (
        children
      ) : (
        <Flex {...styles.userContent}>
          {SidebarComponent && !SidebarComponent?.props?.hidden && (
            <Flex flex={isExplore ? "1 1 20%" : "1 1 30%"} {...styles.sidebar}>
              {SidebarComponent}
            </Flex>
          )}
          <Flex {...styles.content}>{children}</Flex>
        </Flex>
      )}
      <Footer />
    </Flex>
  );
};

export { Layout };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
  },
  userContent: {
    marginX: { base: "1em", md: "20vw" },
  },
  sidebar: {
    display: { base: "none", md: "flex" },
    position: "sticky",
    top: "10vh",
    height: "90vh",
    overflowY: "auto",
  },
  content: {
    flex: "1 1 70%",
    direction: "column",
    width: "100%",
    maxWidth: "100%",
  },
};
