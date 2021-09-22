import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseSharp, IoSearchSharp } from "react-icons/io5";

const ResponsiveSearchIcon = ({ isSearchFocused, setSearchFocused }) => (
  <InputGroup
    {...styles.inputGroup}
    margin={{ base: isSearchFocused ? "0" : "0.5", md: "0.5" }}
    width={isSearchFocused ? "100%" : "0"}
  >
    {/* Left serarch icon */}
    <InputLeftElement
      {...styles.icon}
      children={<IoSearchSharp color="gray.300" />}
      pointerEvents="none"
    />

    {/* Input */}
    <Input
      {...styles.input}
      placeholder={isSearchFocused ? "Search for anything..." : ""}
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
        {...styles.icon}
        children={<IoCloseSharp color="gray.300" cursor="pointer" />}
        onClick={() => setSearchFocused(false)}
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
  icon: {
    padding: "0",
    background: "transparent",
  },
  input: {
    color: "gray.700",
    border: "none",
  },
};
