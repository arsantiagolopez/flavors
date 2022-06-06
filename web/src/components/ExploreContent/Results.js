import { Flex } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { LoadingScreen } from "../LoadingScreen";
import { ResultCard } from "../ResultCard";

const Results = ({ isSearchLoading }) => {
  const { data } = useSWR("/api/plates/");
  const { plates } = data || {};

  const metaArr = [
    "5 miles away. Delivers.",
    "3 miles away. Pickup only.",
    "0.6 miles away. Pickup only.",
    "1.2 miles away. Speedy.",
    "2 miles away. Fast delivery.",
  ];

  const results = plates?.map(({ _id, title, image, price }) => {
    const meta = metaArr[Math.floor(Math.random() * metaArr.length)];
    price = `$${price}`;

    return {
      _id,
      title,
      image,
      price,
      meta,
    };
  });

  return (
    <Flex {...styles.wrapper}>
      {isSearchLoading && <LoadingScreen />}
      <Flex {...styles.results}>
        {results?.map((result) => (
          <ResultCard key={result?._id} {...result} />
        ))}
      </Flex>
    </Flex>
  );
};

export { Results };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    paddingY: "3vh",
  },
  results: {
    direction: "row",
    justify: "space-between",
    wrap: "wrap",
    maxWidth: "100%",
  },
};
