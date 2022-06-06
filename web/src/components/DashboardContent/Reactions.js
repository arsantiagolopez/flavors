import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

const Reactions = ({ items }) => {
  return (
    <Flex {...styles.wrapper}>
      <Tabs {...styles.tabs}>
        <Flex {...styles.header}>
          <Heading {...styles.heading}>Reactions</Heading>
          <TabList {...styles.tabList}>
            {items?.map(({ emoji }) => (
              <Tab key={emoji} {...styles.tab}>
                {emoji}
              </Tab>
            ))}
            <Flex {...styles.shadows} {...styles.emojiShadows} />
          </TabList>
        </Flex>

        <TabPanels>
          {items?.map(({ emoji, items }, index) => (
            <TabPanel key={index} {...styles.panel}>
              {items?.map((item, index) => (
                <Card key={index} card={item} />
              ))}
            </TabPanel>
          ))}
          <Flex {...styles.shadows} />
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export { Reactions };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
  },
  tabs: {
    variant: "unstyled",
  },
  header: {
    direction: "row",
    justify: "flex-start",
  },
  heading: {
    fontSize: { base: "3xl", md: "5xl" },
  },
  tabList: {
    marginLeft: { base: "2", md: "2vw" },
    marginTop: { base: "-1", md: "-2" },
    width: "100%",
    overflow: "scroll",
  },
  tab: {
    fontSize: { base: "3xl", md: "5xl" },
    filter: "grayscale(1)",
    paddingX: { base: "2", md: "1vw" },
    paddingY: "0",
    _selected: {
      filter: "grayscale(0)",
    },
    _hover: {
      filter: "grayscale(0)",
    },
  },
  panel: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100vw",
    marginLeft: { base: "-1em", md: "-20vw" },
    paddingLeft: { base: "1em", md: "20vw" },
    paddingRight: { base: "1em", md: "10vw" },
    overflow: "scroll",
  },
  shadows: {
    height: "85%",
    width: "100vw",
    pointerEvents: "none",
    position: "absolute",
    right: "0",
    bottom: "0",
    marginRight: { base: "-1em", md: "-20vw" },
    boxShadow: "inset 15vw 0 5vw -10vw white, inset -15vw 0 10vw -10vw white",
  },
  emojiShadows: {
    top: "0",
    right: { base: "1em", md: "20vw" },
    width: { base: "calc(100% - 9em)", md: "calc(100% - 15em)" },
    height: { base: "5vh", md: "10vh" },
  },
};
