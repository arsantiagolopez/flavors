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
          </TabList>
        </Flex>

        <TabPanels>
          {items?.map(({ emoji, items }) => (
            <TabPanel key={emoji} {...styles.panel}>
              {items?.map((item) => (
                <Card key={item?.emoji} card={item} />
              ))}
            </TabPanel>
          ))}
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
    marginX: { base: "1em", md: "2vw" },
    marginTop: { base: "-1", md: "-2" },
  },
  tab: {
    padding: "0",
    fontSize: { base: "3xl", md: "5xl" },
    filter: "grayscale(1)",
    marginX: { base: "2", md: "1vw" },
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
    // marginY: { base: "2vh", md: "3vh" },
  },
  shadows: {
    height: "100%",
    width: "10vw",
    pointerEvents: "none",
    position: "absolute",
    right: "0",
    top: "0",
    marginRight: { base: "-1em", md: "-20vw" },
    boxShadow: "inset -15vw 0 5vw -10vw white",
  },
};
