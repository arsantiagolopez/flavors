import { Flex } from "@chakra-ui/react";
import React from "react";
import { Overview } from "./Overview";
import { Tabs } from "./Tabs";

const Reviews = () => {
  const starRatings = [
    { stars: "5 star", amount: 1 || 0 },
    { stars: "4 star", amount: null || 0 },
    { stars: "3 star", amount: null || 0 },
    { stars: "2 star", amount: null || 0 },
    { stars: "1 star", amount: null || 0 },
  ];

  const userReviews = [
    {
      id: 1,
      stars: 5,
      type: "buyer",
      user: "Alex Santiago",
      notes: "excellent experience!",
      timestamp: new Date("Wed, 27 July 2020 13:30:00"),
    },
    {
      id: 2,
      stars: 3,
      type: "seller",
      user: "Mary",
      notes:
        "good but delivery took too long good but delivery took too long good but delivery took too long good but delivery took too long good but delivery took too long good but delivery took too long good but delivery took too long good but delivery took too long",
      timestamp: new Date("Wed, 27 July 2020 07:45:00 UTC"),
    },
    {
      id: 3,
      stars: 3,
      type: "seller",
      user: "Clemence Curthois",
      notes: "Was mean, but food was okay.",
      timestamp: new Date("27 July 2019 13:30:00 UTC+05:45"),
    },
    {
      id: 4,
      stars: 5,
      type: "buyer",
      user: "Tom Segura",
      notes: "Great tasting food! Delicious",
      timestamp: new Date("25 July 2020"),
    },
    {
      id: 5,
      stars: 1,
      type: "seller",
      user: "Chris Diestefano",
      notes: "worst experience ever. Never again.",
      timestamp: new Date("July 25, 2020"),
    },
  ];

  // Adds up all star rating amounts
  const totalRatings = starRatings.reduce((a, b) => a + b.amount, 0);

  const overviewProps = { starRatings, totalRatings };
  const listProps = { totalRatings, reviews: userReviews };

  return (
    <Flex {...styles.wrapper}>
      {/* Ratings overview bar */}
      <Overview {...overviewProps} />

      {/* List of reviews */}
      <Tabs {...listProps} />
    </Flex>
  );
};

export { Reviews };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: { base: "1em", md: "0" },
  },
};
