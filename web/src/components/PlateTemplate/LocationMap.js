import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Map } from "../Map";

const LocationMap = () => {
  const [coordinates, setCoordinates] = useState(null);

  const hideNames = true;

  const geolocation = {
    type: "point",
    coordinates: [-95.57079379999999, 30.1780123],
  };

  useEffect(() => {
    if (geolocation) {
      const { coordinates: point } = geolocation;
      setCoordinates({ lng: point[0], lat: point[1] });
    }
  }, []);

  const mapProps = { coordinates, hideNames };

  return (
    <Flex {...styles.wrapper}>
      <Map {...mapProps} />
    </Flex>
  );
};

export { LocationMap };

// Styles

const styles = {
  wrapper: {
    height: "50vh",
    marginTop: "5vh",
  },
};
