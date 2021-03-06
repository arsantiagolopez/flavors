import {
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";

const ProgressLine = ({ title, screens, index }) => {
  const multiplier = 100 / (screens?.length + 1);
  const value = multiplier * (index + 1);
  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.mobileTitle}>{title}</Heading>
      <Slider
        aria-label="slider-progress"
        value={value}
        defaultValue={multiplier}
        isReadOnly
        {...styles.slider}
      >
        <SliderTrack {...styles.track}>
          <SliderFilledTrack {...styles.filledTrack} />
        </SliderTrack>
        <SliderThumb {...styles.thumb}>
          <Heading {...styles.desktopTitle}>{title}</Heading>
        </SliderThumb>
      </Slider>
    </Flex>
  );
};

export { ProgressLine };

// Styles

const styles = {
  wrapper: {
    zIndex: "5",
    position: "absolute",
    direction: "column",
    paddingTop: { base: "1em", md: "10vh" },
    width: "100vw",
    overflow: "hidden",
  },
  mobileTitle: {
    display: { base: "block", md: "none" },
    letterSpacing: "tighter",
    marginX: "1em",
  },
  slider: {
    size: "sm",
    marginTop: "5vh",
  },
  track: {
    background: "gray.100",
  },
  filledTrack: {
    background: "gray.800",
    transition: "width 0.3s cubic-bezier(0.7, 0.030, 0.685, 0.220)",
  },
  thumb: {
    boxSize: 5,
    background: "gray.800",
    justify: "center",
    align: "center",
    transition: "left 0.3s cubic-bezier(0.7, 0.030, 0.685, 0.220)",
  },
  desktopTitle: {
    display: { base: "none", md: "block" },
    position: "absolute",
    top: "-9vh",
    width: "10em",
    letterSpacing: "tighter",
  },
};
