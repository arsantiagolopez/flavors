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
    <Flex {...styles.wrapper} direction={totalRatings < 1 && "column"}>
      {/* Rating out of 5 and stars */}
      <Flex {...styles.rating}>
        <Heading>
          <Flex {...styles.average}>
            <Text fontSize="2em">
              {totalRatings < 1 ? Number(5).toFixed(2) : numberRating}
            </Text>
            <Text {...styles.dividend} {...styles.mobileOnly}>
              out of 5
            </Text>
            <Text {...styles.dividend} {...styles.desktopOnly}>
              / 5
            </Text>
          </Flex>
        </Heading>

        {/* Star icons  */}
        <Flex {...styles.starIconValue}>
          {
            // Create five light gray stars as containers
            Array(5)
              .fill()
              .map((_, index) => (
                // Fill stars if no reviews (toggle color)
                <Icon
                  key={index}
                  as={TiStar}
                  color={totalRatings < 1 ? "gray.700" : "gray.100"}
                  {...styles.star}
                />
              ))
          }

          {/* Fill stars with solid color based on rating */}
          <Flex {...styles.overlay}>
            {
              // Get floor of float number to fill whole stars
              numberRating > 0 &&
                Array(Math.floor(numberRating))
                  .fill()
                  .map((_, index) => (
                    <Icon
                      key={index}
                      as={TiStar}
                      {...styles.icon}
                      {...styles.star}
                    />
                  ))
            }
            {
              // Get remaining decimal and fill with full, half or no star
              numberRating % 1 === 0 ? null : numberRating % 1 <= 0.54 ? (
                <Icon as={TiStarHalf} {...styles.icon} {...styles.star} />
              ) : (
                <Icon as={TiStar} {...styles.icon} {...styles.star} />
              )
            }
          </Flex>
        </Flex>

        <Text {...styles.summary}>{totalRatings} reviews</Text>
      </Flex>

      {/* Star bars with percentages */}
      <Flex
        {...styles.bars}
        // Hide star bars if no reviews, display call to action below
        display={totalRatings < 1 ? "none" : "block"}
      >
        {starRatings.map(({ stars, amount }) => (
          <Flex key={stars} {...styles.bar}>
            <Text {...styles.left}>{stars}</Text>
            <Flex {...styles.right}>
              <Box
                {...styles.fill}
                width={`${(amount / totalRatings) * 100}%`}
              />
              <Text {...styles.amount}>{`(${amount})`}</Text>
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
        <Heading {...styles.primary}>Do it right.</Heading>
        <Text {...styles.secondary}>
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
  wrapper: {
    direction: { base: "column", md: "row" },
  },
  rating: {
    width: "100%",
    direction: "column",
    basis: { base: "0", md: "40%" },
  },
  average: {
    direction: "row",
    align: "baseline",
  },
  mobileOnly: {
    display: { base: "block", md: "none" },
  },
  desktopOnly: {
    display: { base: "none", md: "block" },
  },
  dividend: {
    fontSize: "1rem",
    marginLeft: "2",
  },
  starIconValue: {
    direction: "row",
    width: "100%",
    marginTop: "0",
    marginBottom: { base: "1em", md: "2vh" },
  },
  icon: {
    color: "gray.700",
  },
  star: {
    fontSize: "2.5em",
    marginRight: "-2",
  },
  overlay: {
    position: "absolute",
  },
  summary: {
    marginBottom: { base: "2em", md: "0" },
  },
  bars: {
    direction: "column",
    width: "100%",
  },
  bar: {
    direction: "row",
    marginY: "1",
  },
  left: {
    flexBasis: { base: "30%", md: "20%" },
    paddingRight: { base: "3", md: "2vw" },
    textAlign: { base: "left", md: "right" },
  },
  right: {
    width: "100%",
    bg: "gray.100",
    borderRadius: "2px",
    _hover: { bg: "gray.200" },
  },
  fill: {
    bg: "gray.300",
    borderRadius: "2px",
    _hover: { bg: "gray.500" },
  },
  amount: {
    position: "absolute",
    marginLeft: "2",
    marginTop: "1",
    fontSize: "8pt",
    color: "gray.200",
  },
  callToAction: {
    direction: "column",
    marginY: { base: "3vh", md: "5vh" },
  },
  primary: {
    color: "gray.700",
    paddingBottom: "2",
  },
  secondary: {
    color: "gray.500",
  },
};
