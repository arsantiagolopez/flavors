import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { TiStar } from "react-icons/ti";

/**
 *
 * @param {string} type - Possible types are "all", "buying", and "selling"
 * @returns
 */

const List = ({ type, reviews }) => {
  // const [seeMore, setSeeMore] = useState()

  const handleSeeMore = (event) => {
    const { target } = event;
  };

  switch (type) {
    // Show my buying reviews (seller reviews)
    case "buying":
      reviews = reviews.filter((review) => review["type"] === "seller");
      break;
    // Show my selling reviews (buyer reviews)
    case "selling":
      reviews = reviews.filter((review) => review["type"] === "buyer");
      break;
    // Show all
    case "all":
      // default
      break;
  }

  const noBuyingReviews = type === "buying" && reviews.length < 1;
  const noSellingReviews = type === "selling" && reviews.length < 1;

  return (
    <Flex {...styles.wrapper}>
      {reviews.map(({ id, stars, user, type, notes, timestamp }, index) => (
        <Flex
          key={id}
          {...styles.review}
          borderBottom={
            index === reviews.length - 1
              ? "none"
              : "0.5px solid rgba(150,150,150,0.1)"
          }
        >
          {/* Review star rating */}
          <Flex {...styles.rating}>
            {Array(Number(stars))
              .fill()
              .map((_, index) => (
                <Icon key={index} as={TiStar} {...styles.star} />
              ))}
          </Flex>

          {/* User name and type */}
          <Text {...styles.name}>{`${user} (${type})`}</Text>

          {/* User notes/feedback */}
          <Text {...styles.notes} onClick={handleSeeMore}>
            {notes}
          </Text>

          {/* Review timestamp */}
          <Text {...styles.timestamp}>
            {moment(timestamp).fromNow().toUpperCase()}
          </Text>
        </Flex>
      ))}

      {/* Show call to action if no reviews */}
      <Flex
        {...styles.noReviewsMessage}
        display={noBuyingReviews ? "flex" : "none"}
      >
        <Text>
          You haven't made a purchase.{" "}
          <Link color="red.500">Go find something!</Link>
          <ChevronRightIcon color="red.500" />
        </Text>
      </Flex>

      <Flex
        {...styles.noReviewsMessage}
        display={noSellingReviews ? "flex" : "none"}
      >
        <Text>
          You've yet to make your first sale!{" "}
          <Link color="red.500">Get started</Link>
          <ChevronRightIcon color="red.500" />
        </Text>
      </Flex>
    </Flex>
  );
};

export { List };

// Styles

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    overflowY: "scroll",
    // maxHeight: "55vh",
  },
  review: {
    width: "100%",
    direction: "column",
    paddingY: "2vh",
  },
  rating: {
    direction: "row",
    width: "100%",
    marginBottom: "1",
  },
  star: {
    fontSize: "1em",
    marginRight: "-1",
    color: "gray.700",
  },
  name: {
    color: "gray.500",
  },
  notes: {
    paddingY: "2",
    paddingBottom: "0",
    marginBottom: "4",
    noOfLines: 3,
  },
  timestamp: {
    color: "lightgray",
    fontSize: "8pt",
  },
  noReviewsMessage: {
    color: "gray.500",
    paddingY: "1em",
    marginLeft: "5%",
  },
};
