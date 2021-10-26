import { Flex } from "@chakra-ui/react";
import React from "react";

const PreviewScreen = ({
  listing,
  setListing,
  handleChange,
  setFormCompleteIndex,
}) => {
  console.log("HEA!!!", listing);
  return <Flex {...styles.wrapper}></Flex>;
};

export { PreviewScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "8vh", md: "12vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  next: {
    width: "100%",
    padding: "1.75em",
    borderRadius: "0.5em",
  },
};
