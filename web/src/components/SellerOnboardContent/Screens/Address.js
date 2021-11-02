import { CheckIcon } from "@chakra-ui/icons";
import { Button, Flex, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Map } from "../../Map";

// Screen index: possible 2 or 3

const AddressScreen = ({
  user,
  form,
  handleChange,
  setFormCompleteIndex,
  lastIndex,
}) => {
  const [coordinates, setCoordinates] = useState(null);

  // Unlock & swipe to next screen
  const handleNext = () => {
    const nextScreen = lastIndex === 4 ? 4 : 3;

    setFormCompleteIndex(nextScreen);
    handleChange(1);
  };
  // Swipe back
  const handleBack = () => handleChange(-1);

  /**
   * Newly added addresses on form take priority over
   * Previously saved addresses. If an address is inputed on
   * the form, update coordinate values to new address, else
   * address was previously saved, thus coordinates can be
   * taken from user value.
   */
  useEffect(() => {
    // Only bypass if at least user input address on form, or
    // user document has address and geolocation.
    if (form?.address) {
      const { longitude, latitude } = form?.address || {};

      if (latitude) return setCoordinates({ lng: longitude, lat: latitude });

      const { coordinates: point } = user?.geolocation || {};
      setCoordinates({ lng: point[0], lat: point[1] });
    }
  }, [form]);

  const mapProps = { coordinates };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.map}>
        <Map {...mapProps} />
      </Flex>

      <Flex {...styles.actions}>
        <Button onClick={handleNext} rightIcon={<CheckIcon />} {...styles.next}>
          Confirm adress
        </Button>
        <Link onClick={handleBack} {...styles.back}>
          Change address
        </Link>
      </Flex>
    </Flex>
  );
};

export { AddressScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "5vh", md: "9vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "1em", md: "calc(35vw - 2em)" },
  },
  map: {
    height: { base: "42vh", md: "40vh" },
    marginX: { base: "1em" },
  },
  actions: {
    direction: "column",
    justify: "center",
    align: "center",
    position: "absolute",
    bottom: "8vh",
    width: { base: "calc(100% - 4em)", md: "calc(100% - 35vw - 35vw + 2em)" },
    marginX: "1em",
  },
  next: {
    padding: "1.75em",
    width: "100%",
    borderRadius: "0.5em",
    iconSpacing: "3",
    marginBottom: "2vh",
  },
  back: {
    color: "gray.600",
  },
};
