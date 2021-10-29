import { Flex } from "@chakra-ui/react";
import React from "react";
import { useDimensions } from "../../utils/useDimensions";
import { Footer } from "../Footer";
import { Navigation } from "../Navigation";

const Layout = ({
  children,
  user,
  isAccount,
  isFullScreen,
  SidebarComponent,
}) => {
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
            <Flex
              top={isFullScreen ? "6vh" : "10vh"}
              flex={isFullScreen ? "1 1 20%" : "1 1 30%"}
              height={isFullScreen ? "94vh" : "90vh"}
              maxWidth={isFullScreen ? "18vw" : "30%"}
              marginLeft={isFullScreen ? "-18vw" : "auto"}
              paddingRight={isFullScreen ? "1vw" : "none"}
              {...styles.sidebar}
            >
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
    overflowY: "scroll",
    overflowX: "hidden",
  },
  content: {
    flex: "1 1 70%",
    direction: "column",
    width: "100%",
  },
};
