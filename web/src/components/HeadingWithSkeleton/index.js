import { Heading, Skeleton } from "@chakra-ui/react";
import React from "react";

const HeadingWithSkeleton = ({ children, width, ...styleProps }) => {
  const childrenLoaded = typeof children !== "undefined";

  if (!childrenLoaded) {
    return (
      <Skeleton
        width={width ? width : { base: "90%", md: "60%" }}
        {...styles.skeleton}
      />
    );
  }

  return <Heading {...styleProps}>{children}</Heading>;
};

export { HeadingWithSkeleton };

// Styles

const styles = {
  skeleton: {
    height: { base: "4vh", md: "5vh" },
  },
};
