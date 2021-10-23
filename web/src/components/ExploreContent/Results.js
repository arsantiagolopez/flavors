import { Flex } from "@chakra-ui/react";
import React from "react";
import { LoadingScreen } from "../LoadingScreen";
import { ResultCard } from "../ResultCard";

const Results = ({ isSearchLoading }) => {
  const results = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: "$5",
      title: "Delicious pasta carbonara and everything else",
      meta: "5 miles away. Delivers.",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: "$15",
      title: "Tequenos 6 pack",
      meta: "3 miles away. Pickup only.",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: "$12",
      title: "Avocado Toast",
      meta: "0.6 miles away. Pickup only.",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$27",
      title: "Chicken bacon pieces",
      meta: "5 miles away. Delivers.",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg?cs=srgb&dl=pexels-sebastian-coman-photography-3590401.jpg&fm=jpg",
      price: "$10",
      title: "Champinogne Gnoccis",
      meta: "1.2 miles away. Speedy.",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=pexels-rajesh-tp-1633578.jpg&fm=jpg",
      price: "$7",
      title: "Everything stuffed burger",
      meta: "2 miles away. Fast delivery.",
    },
    {
      id: 7,
      image:
        "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: "$5",
      title: "Delicious pasta carbonara and everything else",
      meta: "5 miles away. Delivers.",
    },
    {
      id: 8,
      image:
        "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: "$15",
      title: "Tequenos 6 pack",
      meta: "3 miles away. Pickup only.",
    },
    {
      id: 9,
      image:
        "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: "$12",
      title: "Avocado Toast",
      meta: "0.6 miles away. Pickup only.",
    },
    {
      id: 10,
      image:
        "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$27",
      title: "Chicken bacon pieces",
      meta: "5 miles away. Delivers.",
    },
    {
      id: 11,
      image:
        "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg?cs=srgb&dl=pexels-sebastian-coman-photography-3590401.jpg&fm=jpg",
      price: "$10",
      title: "Champinogne Gnoccis",
      meta: "1.2 miles away. Speedy.",
    },
    {
      id: 12,
      image:
        "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=pexels-rajesh-tp-1633578.jpg&fm=jpg",
      price: "$7",
      title: "Everything stuffed burger",
      meta: "2 miles away. Fast delivery.",
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      {isSearchLoading && <LoadingScreen />}
      <Flex {...styles.results}>
        {results.map((result) => (
          <ResultCard key={result?.id} {...result} />
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
