import { Circle, Flex, Text } from "@chakra-ui/react";

const Tooltip = ({ point }) => {
  const pointObj = Object.values(point)[0];

  const date = pointObj["data"]["x"];
  const sales = pointObj["data"]["y"];

  const CURRENCY_SYMBOL = "$";

  return (
    <Flex {...styles.wrapper}>
      <Text {...styles.date}>{date}</Text>
      <Text {...styles.balance}>
        {CURRENCY_SYMBOL}
        {sales.toFixed(2)}
      </Text>

      {/* Point */}
      {/* <Circle {...styles.point}>
        <Circle {...styles.pointOutline} />
      </Circle> */}
      <Circle {...styles.point} />

      {/* Bottom arrow */}
      {/* <TriangleDownIcon {...styles.arrow} /> */}
    </Flex>
  );
};

export { Tooltip };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    align: "center",
    justify: "center",
    borderRadius: "12px",
    boxShadow: "lg",
    marginBottom: "5px",
    paddingX: "1em",
    paddingY: "2",
    color: "heading",
    fontSize: "8pt",
    background: "rgba(0,0,10, 0.5)",
    backdropFilter: "blur(10px)",
  },
  date: {},
  balance: {
    fontWeight: "700",
    marginTop: "-1",
  },
  point: {
    // size: "24px",
    size: "12px",
    background: "primary",
    position: "absolute",
    bottom: "0",
    marginBottom: "-25px",
    zIndex: "-2",
  },
  pointOutline: {
    size: "12px",
    background: "heading",
  },
  arrow: {
    position: "absolute",
    bottom: "0",
    marginBottom: "-5px",
    boxSize: "2em",
    color: "secondary",
    zIndex: "-1",
  },
};
