import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseSharp, IoSearchSharp } from "react-icons/io5";

// @todo: Set focus to search on isSearchFocused

const ResponsiveSearchIcon = ({ isSearchFocused, setSearchFocused }) => (
  <InputGroup {...styles.inputGroup} width={isSearchFocused ? "100%" : "0"}>
    {/* Left search icon */}
    <InputLeftElement
      children={<IoSearchSharp {...styles.icon} />}
      pointerEvents="none"
      {...styles.element}
    />

    {/* Input */}
    <Input
      {...styles.input}
      placeholder={isSearchFocused && "Search for anything..."}
      onFocus={() => setSearchFocused(true)}
      onBlur={() => setSearchFocused(false)}
      cursor={isSearchFocused ? "text" : "pointer"}
      // Padding is clickable area of search Icon
      // Left & right instead of paddingX to override
      paddingLeft={isSearchFocused ? "2rem" : "1rem"}
      paddingRight={isSearchFocused ? "2rem" : "1rem"}
    />

    {/* Show right close icon on focus */}
    {isSearchFocused && (
      <InputRightElement
        children={<IoCloseSharp {...styles.icon} />}
        onClick={() => setSearchFocused(false)}
        {...styles.element}
      />
    )}
  </InputGroup>
);

export { ResponsiveSearchIcon };

// Styles

const styles = {
  inputGroup: {
    color: "lightgray",
    size: "sm",
  },
  element: {
    padding: "0",
    background: "transparent",
  },
  icon: {
    color: "gray.300",
    cursor: "pointer",
  },
  input: {
    color: "gray.700",
    border: "none",
  },
};
