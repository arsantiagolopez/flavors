import { Flex, Icon } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import React, { useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Map = ({ coordinates, hideNames }) => {
  const ref = useRef(null);

  const mapStyles = [
    {
      stylers: [{ saturation: -80 }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      <Icon as={FaMapMarkerAlt} {...styles.marker} />
      <GoogleMapReact
        ref={ref}
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={15}
        options={{
          styles: hideNames && mapStyles,
          gestureHandling: "none",
          keyboardShortcuts: false,
          fullscreenControl: false,
          zoomControlOptions: {
            position: 7,
          },
        }}
      ></GoogleMapReact>
    </Flex>
  );
};

export { Map };

// Styles

const styles = {
  wrapper: {
    justify: "center",
    align: "center",
    width: "100%",
    height: "100%",
    borderRadius: "0.5em",
    overflow: "hidden",
  },
  marker: {
    color: "red.500",
    fontSize: "2em",
    position: "absolute",
    zIndex: "5",
  },
};
