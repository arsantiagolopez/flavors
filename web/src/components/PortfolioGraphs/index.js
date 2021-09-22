import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Graph } from "./Graph";

/**
 *  Displays graphs for the Day, Week, Month and Year time intervals
 *  The portfolioHistory prop contains a portfolio object with a prop
 *  for each one of these intervals. Each prop has values: propbaseValue,
 *  equity, profitLoss, profitLossPct, timeframe, timestamp
 */

const PortfolioGraphs = ({ portfolioHistory }) => {
  const [graphData, setGraphData] = useState(null);

  // All data is loaded if no null entries
  const dataLoaded = !Object.keys(portfolioHistory).some(
    (interval) => !portfolioHistory[interval]
  );

  // Convert timestamp to date string
  const getDate = (timestamp) => moment.unix(timestamp).format("MMM DD");

  useEffect(() => {
    if (dataLoaded) {
      // Iterate through intervals and update graph data
      const intervalsData = Object.keys(portfolioHistory).map((interval) => {
        // Get equity & timestamp fields
        const { equity, timestamp } = portfolioHistory[interval];

        // Make array of timestamp/equity data
        const timestampEquityGraph = timestamp.map((stamp, index) => ({
          x: getDate(stamp),
          // x: stamp,
          y: equity[index],
        }));

        // Return graph required format
        return {
          id: interval,
          data: timestampEquityGraph,
        };
      });

      // Update graph data
      setGraphData(intervalsData);
    }
  }, [portfolioHistory]);

  return (
    <Flex {...styles.wrapper}>
      <Tabs {...styles.tabs} defaultIndex={1}>
        {graphData && (
          <>
            {/* Graphs */}
            <TabPanels {...styles.panels}>
              {graphData.map((data) => (
                <TabPanel key={data.id} {...styles.panel}>
                  <Graph data={data} />
                </TabPanel>
              ))}
            </TabPanels>

            {/* Tabs */}
            <TabList {...styles.tabList}>
              {graphData.map(({ id }) => (
                <Tab key={id} {...styles.tab}>
                  {id[0]}
                </Tab>
              ))}
            </TabList>
          </>
        )}
      </Tabs>
    </Flex>
  );
};

export { PortfolioGraphs };

// Styles

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "60em",
    height: { base: "60vh", md: "70vh" },
    marginY: "2em",
  },
  tabs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    variant: "soft-rounded",
    width: "100%",
  },
  tabList: {
    width: "100%",
    paddingX: { base: "2em", md: "20%" },
    marginBottom: "2em",
  },
  tab: {
    width: "100%",
    borderRadius: "1em",
    paddingY: "3",
    marginX: { base: "2", md: "2em" },
    fontSize: "10pt",
    textTransform: "capitalize",
    fontFamily: "'Josefin Sans', sans-serif",
    color: "heading",
    outline: "none!important",
    _selected: {
      background: "tertiary",
    },
  },
  panels: {
    display: "flex",
    marginY: "1em",
    width: "100%",
    height: "100%",
    whiteSpace: "nowrap",
  },
  panel: {
    height: "100%",
    width: "100%",
    padding: "0",
  },
};
