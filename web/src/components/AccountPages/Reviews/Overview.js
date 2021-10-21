import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TiStar, TiStarHalf } from "react-icons/ti";

const Overview = ({ starRatings, totalRatings }) => {
  // Finds object in array of star objects (starRatings)
  const findObj = (starStr) =>
    starRatings.find(({ stars }) => stars === starStr);

  // Calculate weighted rating
  // Returns NaN if no reviews (divides by 0)
  // Test for isNaN
  const numberRating = (
    (5 * findObj("5 star").amount +
      4 * findObj("4 star").amount +
      3 * findObj("3 star").amount +
      2 * findObj("2 star").amount +
      1 * findObj("1 star").amount) /
    totalRatings
  ).toFixed(2);

  return (
    <Flex
      direction={totalRatings < 1 ? "column" : { base: "column", md: "row" }}
    >
      {/* Star reviews heading */}
      <Flex {...styles.stars}>
        {/* Number text value */}
        <Heading>
          <Flex direction="row" align="baseline">
            <Text fontSize="2em">
              {totalRatings < 1 ? Number(5).toFixed(2) : numberRating}
            </Text>

            {/* Responsive display of "Out of 5" or "/5" */}
            <Text
              fontSize="1rem"
              marginLeft="2"
              display={{ base: "block", md: "none" }}
            >
              out of 5
            </Text>
            <Text
              fontSize="1rem"
              marginLeft="2"
              display={{ base: "none", md: "block" }}
            >
              / 5
            </Text>
          </Flex>
        </Heading>

        {/* Stars icon value */}
        <Flex {...styles.starsIconValue}>
          {
            // Create five light gray stars as containers
            Array(5)
              .fill()
              .map((_, index) => (
                // Fill stars if no reviews (toggle color)
                <Icon
                  key={index}
                  as={TiStar}
                  {...styles.star}
                  color={totalRatings < 1 ? "gray.700" : "gray.100"}
                />
              ))
          }

          {/* Fill stars with solid color based on rating */}
          <Flex position="absolute">
            {
              // Get floor of float number to fill whole stars
              numberRating > 0 &&
                Array(Math.floor(numberRating))
                  .fill()
                  .map((_, index) => (
                    <Icon
                      key={index}
                      as={TiStar}
                      {...styles.star}
                      color="gray.700"
                    />
                  ))
            }
            {
              // Get remaining decimal and fill with full, half or no star
              numberRating % 1 === 0 ? null : numberRating % 1 <= 0.54 ? (
                <Icon as={TiStarHalf} {...styles.star} color="gray.700" />
              ) : (
                <Icon as={TiStar} {...styles.star} color="gray.700" />
              )
            }
          </Flex>
        </Flex>

        {/* Summary text value */}
        <Text marginBottom={{ base: "2em", md: "0" }}>
          {totalRatings} reviews
        </Text>
      </Flex>

      {/* Individual star bars/rows */}
      <Flex
        {...styles.bars}
        // Hide star bars if no reviews, display call to action below
        display={totalRatings < 1 ? "none" : "block"}
      >
        {starRatings.map((row, index) => (
          <Flex key={index} direction="row" marginY="1">
            {/* Left side star label */}
            <Text {...styles.starLabel}>{row.stars}</Text>
            {/* Star percentage bar*/}
            <Flex {...styles.barPlaceholder}>
              <Box
                {...styles.barFilled}
                width={`${(row.amount / totalRatings) * 100}%`}
              />
              <Text {...styles.barAmountHelper}>{`(${row.amount})`}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>

      {/* Call to action (show when no reviews) */}
      <Flex
        {...styles.callToAction}
        // Hide star bars if no reviews, display call to action below
        display={totalRatings < 1 ? "block" : "none"}
      >
        <Heading color="gray.700" paddingBottom="2">
          Do it right.
        </Heading>
        <Text color="gray.500">
          You only have one chance to make a first good impression. Ratings is
          how others see you. Be nice, respectful and keep those reviews high.
          Make your first sell or purchase to update your review.
        </Text>
      </Flex>
    </Flex>
  );
};

export { Overview };

// Styles

const styles = {
  wrapper: {},
  stars: {
    width: "100%",
    direction: "column",
    basis: { base: "0", md: "40%" },
  },
  starsIconValue: {
    direction: "row",
    width: "100%",
    marginTop: "0",
    marginBottom: "1em",
  },
  star: {
    fontSize: "2.5em",
    marginRight: "-2",
  },
  bars: {
    direction: "column",
    width: "100%",
  },
  starLabel: {
    flexBasis: { base: "30%", md: "20%" },
    paddingRight: { base: "3", md: "2em" },
    textAlign: { base: "left", md: "right" },
  },
  barPlaceholder: {
    width: "100%",
    bg: "gray.100",
    borderRadius: "2px",
    _hover: { bg: "gray.200" },
  },
  barFilled: {
    bg: "gray.300",
    borderRadius: "2px",
    _hover: { bg: "gray.500" },
  },
  barAmountHelper: {
    position: "absolute",
    marginLeft: "2",
    marginTop: "1",
    fontSize: "8pt",
    color: "gray.200",
  },
  callToAction: {
    direction: "column",
    marginY: { base: "0", md: "2em" },
    paddingY: "2em",
  },
};
