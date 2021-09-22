import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Graph } from "../../src/components/PortfolioGraphs/Graph";
import { GradientTestGraph, PositiveTestGraph } from "./GradientTestGraph";
import { apple, gamestop, main, snp, trendierData } from "./testData";

const TestGraph = () => main && <Graph data={main} />;

const DashboardSidebar = () => {
  const roiPercent = 9.05;

  const trendier = {
    stock: "TRND",
    graph: trendierData && (
      <PositiveTestGraph data={trendierData} isPositive={true} />
    ),
    price: 33970,
    roi: 614.41,
  };

  const stocks = [
    {
      stock: "S&P500",
      graph: snp && <GradientTestGraph data={snp} />,
      price: 33970,
      roi: -614.41,
    },
    {
      stock: "AAPL",
      graph: apple && <GradientTestGraph data={apple} />,
      price: 142.94,
      roi: -3.12,
    },
    {
      stock: "GME",
      graph: gamestop && <GradientTestGraph data={gamestop} />,
      price: 4358,
      roi: -75.26,
    },
  ];

  const intervals = ["D", "W", "M", "Y", "All"];

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.balance}>
        <Flex {...styles.roi}>
          {roiPercent > 0 ? (
            <ArrowUpIcon color="green.400" />
          ) : (
            <ArrowDownIcon color="red.500" />
          )}
          <Text color={roiPercent > 0 ? "green.400" : "red.500"}>
            {roiPercent}%
          </Text>
        </Flex>

        <Heading {...styles.amount}>$40,000.63</Heading>
      </Flex>

      <Flex {...styles.graph}>
        <TestGraph />
      </Flex>

      <Flex {...styles.tabs}>
        {intervals.map((interval, index) => (
          <Button
            key={interval}
            {...styles.tab}
            background={index === 0 && "gray.200"}
          >
            {interval}
          </Button>
        ))}
      </Flex>

      <Flex {...styles.comparison}>
        <Flex {...styles.trendier}>
          <Heading {...styles.heading}>Trendier</Heading>
          <Flex {...styles.data}>
            <Flex {...styles.stocks}>
              <Flex {...styles.stock}>
                <Text {...styles.stockName}>{trendier.stock}</Text>
                <Flex {...styles.stockGraph}>{trendier.graph}</Flex>
                <Flex {...styles.stockMeta}>
                  <Text {...styles.stockPrice}>${trendier.price}</Text>
                  <Text {...styles.stockRoi}>{trendier.roi}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex {...styles.market}>
          <Heading {...styles.heading}>Market</Heading>
          <Flex {...styles.data}>
            <Flex {...styles.stocks}>
              {stocks.map(({ stock, graph, price, roi }) => (
                <Flex key={stock} {...styles.stock}>
                  <Text {...styles.stockName}>{stock}</Text>
                  <Flex {...styles.stockGraph}>{graph}</Flex>
                  <Flex {...styles.stockMeta}>
                    <Text {...styles.stockPrice}>${price}</Text>
                    <Text {...styles.stockRoi} color="red.500">
                      {roi}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { DashboardSidebar };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    maxWidth: "calc(100% - 1.5em)",
    borderRadius: "1em",
    marginTop: "5vh",
    marginBottom: "7.5vh",
    boxShadow: "xl",
    background:
      "linear-gradient(180deg, rgba(0,0,10,0.8) 40%, rgba(0,0,10,0.9) 100%)",
    backdropFilter: "blur(10px)",
    paddingY: "1em",
    marginX: "0.75em",
  },
  balance: {
    direction: "column",
    justify: "center",
    align: "center",
    paddingY: "1vh",
    paddingBottom: "1vh",
    // bg: "yellow",
  },
  roi: {
    direction: "row",
    align: "center",
    fontSize: "8pt",
    paddingY: "2",
    fontWeight: "bold",
  },
  amount: {
    color: "white",
    letterSpacing: "normal",
    fontSize: "2vw",
  },
  graph: {
    minHeight: "23vh",
  },
  tabs: {
    justify: "space-around",
    width: "100%",
    marginTop: "-1vh",
    marginBottom: "2vh",
    paddingX: "2vw",
  },
  tab: {
    width: "100%",
    height: "9",
    borderRadius: "1em",
    paddingY: "1",
    marginX: "1",
    fontSize: "8pt",
    textTransform: "capitalize",
    fontFamily: "'Josefin Sans', sans-serif",
    color: "white",
    outline: "none!important",
    background: "none",
  },
  stocks: {
    direction: "column",
    justify: "center",
    width: "100%",
    height: "100%",
    paddingY: "2",
  },
  stock: {
    direction: "row",
    justify: "space-between",
    align: "center",
    width: "100%",
    paddingY: "2.5",
    paddingX: "0.5em",
  },
  stockName: {
    color: "gray.300",
    fontWeight: "bold",
    fontSize: "10pt",
  },
  stockGraph: {
    height: "100%",
    width: "30%",
  },
  stockMeta: {
    direction: "column",
    justify: "center",
    align: "flex-end",
  },
  stockPrice: {
    fontSize: "10pt",
    color: "white",
    fontWeight: "bold",
  },
  stockRoi: {
    fontSize: "8pt",
    color: "green.500",
  },
  comparison: {
    direction: "column",
    height: "100%",
    width: "100%",
    paddingX: "1em",
    paddingTop: "1vh",
  },
  trendier: {
    direction: "column",
  },
  heading: {
    size: "md",
    color: "white",
    letterSpacing: "normal",
  },
  data: {
    align: "center",
  },
  market: {
    direction: "column",
  },
};
