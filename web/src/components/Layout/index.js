import { Flex } from "@chakra-ui/react";
import React from "react";
import { useDimensions } from "../../utils/useDimensions";
import { Footer } from "../Footer";
import { Navigation } from "../Navigation";

const Layout = ({
  children,
  user,
  isLanding,
  isAccount,
  isDashboard,
  SidebarComponent,
}) => {
  const { height, width } = useDimensions();
  const isPortrait = height > width;

  const navigationProps = { user, isLanding, isPortrait };
  return (
    <Flex {...styles.wrapper}>
      <Navigation {...navigationProps} />
      {isLanding || isAccount ? (
        children
      ) : (
        <Flex {...styles.userContent}>
          {SidebarComponent && (
            <Flex
              flex={isDashboard ? "1 1 35%" : "1 1 30%"}
              {...styles.sidebar}
            >
              <SidebarComponent />
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
    position: "sticky",
    top: "10vh",
    display: { base: "none", md: "flex" },
    height: "90vh",
    overflowY: "auto",
  },
  content: {
    flex: "1 1 70%",
  },
};
