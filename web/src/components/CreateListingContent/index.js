import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { ProgressLine } from "./ProgressLine";
import {
  DetailsScreen,
  PhotoScreen,
  PriceScreen,
  StartScreen,
  SuccessScreen,
} from "./Screens";

const CreateListingContent = () => {
  const [index, setIndex] = useState(0);
  // formCompleteIndex holds the number of unlocked screens
  const [formCompleteIndex, setFormCompleteIndex] = useState(0);
  const [title, setTitle] = useState(null);
  const [plate, setPlate] = useState(null);

  const lastIndex = 3;

  const handleChange = (value) => {
    if (value === -1 && index < 1) setIndex(0);
    if (value === 1 && index === lastIndex) return setIndex(lastIndex);
    setIndex(index + value);
  };

  const handleChangeIndex = (index) => setIndex(index);

  const preventUnauthorizedSwipe = () => {
    // Prevent forward swipe if current index form hasn't been filled
    if (index + 1 > formCompleteIndex) {
      setIndex(formCompleteIndex);
    }
  };

  const startProps = { handleChange, setFormCompleteIndex };
  const photoProps = { handleChange, setFormCompleteIndex, plate, setPlate };
  const detailsProps = { handleChange, setFormCompleteIndex, plate, setPlate };
  const priceProps = { handleChange, setFormCompleteIndex, plate, setPlate };
  const successProps = { index, lastIndex, formCompleteIndex };

  // Screens to be displayed
  const screens = [
    {
      id: "start",
      screen: <StartScreen {...startProps} />,
    },
    {
      id: "photo",
      screen: <PhotoScreen {...photoProps} />,
    },
    {
      id: "details",
      screen: <DetailsScreen {...detailsProps} />,
    },
    {
      id: "price",
      screen: <PriceScreen {...priceProps} />,
    },
    {
      id: "success",
      screen: <SuccessScreen {...successProps} />,
    },
  ];

  // Update page's tite based on current screen
  useEffect(() => {
    switch (index) {
      case 0:
        setTitle("Create a plate");
        break;
      case 1:
        setTitle("Add a photo & name");
        break;
      case 2:
        setTitle("Add details");
        break;
      case 3:
        setTitle("What's the price?");
        break;
      case 4:
        setTitle("Congrats! 🎉");
        break;
    }
  }, [index]);

  const progressLineProps = { title, screens, index };

  return (
    <Flex {...styles.wrapper}>
      <ProgressLine {...progressLineProps} />
      <SwipeableViews
        enableMouseEvents={true}
        // onTransitionEnd={preventUnauthorizedSwipe}
        index={index}
        onChangeIndex={handleChangeIndex}
        style={styles.views}
        resistance
      >
        {screens.map(({ id, screen }) => (
          <Flex {...styles.screen} key={id}>
            {screen}
          </Flex>
        ))}
      </SwipeableViews>
    </Flex>
  );
};

export { CreateListingContent };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    align: "center",
    width: "100%",
  },
  views: {
    width: "100vw",
    marginTop: "20vh",
  },
  screen: {
    width: "100%",
    minHeight: "calc(100vh - 6em - 20vh)",
    height: "100%",
  },
};
