import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDimensions } from "../../utils/useDimensions";

const LoadingScreen = ({ isFullScreen }) => {
  const [screenHeight, setScreenHeight] = useState(null);

  const { height } = useDimensions();

  useEffect(() => setScreenHeight(height), [height]);

  return (
    <Flex
      {...styles.wrapper}
      height={isFullScreen ? screenHeight : "30vh"}
      position={isFullScreen ? "absolute" : "static"}
    >
      <Spinner {...styles.spinner} />
    </Flex>
  );
};

export { LoadingScreen };

// Styles

const styles = {
  wrapper: {
    zIndex: "5000",
    top: "0",
    left: "0",
    direction: "column",
    justify: "center",
    align: "center",
    marginX: "auto",
    width: "100%",
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(10px)",
  },
  spinner: {
    color: "gray.800",
    size: "xl",
    thickness: "5px",
  },
};
