import { Tab, TabList, Tabs as Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { List } from "./List";

const TypeTabs = ({ reviews, totalRatings }) => {
  const [index, setIndex] = useState(0);

  const handleChange = (value) => setIndex(value);
  const handleChangeIndex = (index) => setIndex(index);

  const listProps = { reviews, totalRatings };

  return (
    <Tabs
      onChange={(value) => handleChange(value)}
      display={totalRatings < 1 ? "none" : "flex"}
      {...styles.tabs}
    >
      <TabList {...styles.list}>
        <Tab {...styles.tab} color={index === 0 ? "gray.800" : "gray.300"}>
          All
        </Tab>
        <Tab {...styles.tab} color={index === 1 ? "gray.800" : "gray.300"}>
          Buying
        </Tab>

        <Tab {...styles.tab} color={index === 2 ? "gray.800" : "gray.300"}>
          Selling
        </Tab>
      </TabList>

      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <List type="all" {...listProps} />
        <List type="buying" {...listProps} />
        <List type="selling" {...listProps} />
      </SwipeableViews>
    </Tabs>
  );
};

export { TypeTabs };

// Styles

const styles = {
  tabs: {
    flexDirection: "column",
    variant: "unstyled",
    marginY: "2vh",
  },
  list: {
    display: "flex",
    marginY: "2vh",
    marginTop: { base: "1em", md: "5vh" },
  },
  tab: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "0",
    marginRight: "2",
  },
};
