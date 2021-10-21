import { Tab, TabList, Tabs as ChakraTabs } from "@chakra-ui/react";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { List } from "./List";

const Tabs = ({ reviews, totalRatings }) => {
  const [index, setIndex] = useState(0);

  const handleChange = (value) => setIndex(value);
  const handleChangeIndex = (index) => setIndex(index);

  const listProps = { reviews, totalRatings };

  return (
    <ChakraTabs
      onChange={(value) => handleChange(value)}
      // Hide star bars if no reviews, display call to action below
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
    </ChakraTabs>
  );
};

export { Tabs };

// Styles

const styles = {
  tabs: {
    flexDirection: "column",
    variant: "unstyled",
    marginY: "1em",
  },
  list: {
    display: "flex",
    marginY: "1em",
    marginTop: { base: "1em", md: "3em" },
  },
  tab: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "0",
    marginRight: "2",
  },
};
