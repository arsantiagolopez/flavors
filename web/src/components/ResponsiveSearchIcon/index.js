import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { IoCloseSharp, IoSearchSharp } from "react-icons/io5";

// @todo: Set focus to search on isSearchFocused

const ResponsiveSearchIcon = ({ isSearchFocused, setSearchFocused }) => {
  const inputRef = useRef(null);

  const handleFocus = async () => setSearchFocused(true);
  const handleBlur = () => setSearchFocused(false);

  // Set focus to input onClick
  useEffect(() => {
    if (isSearchFocused) inputRef.current.focus();
  }, [isSearchFocused]);

  return (
    <InputGroup {...styles.inputGroup} width={isSearchFocused ? "100%" : "0"}>
      <InputLeftElement
        onClick={handleFocus}
        children={<IoSearchSharp {...styles.icon} />}
        pointerEvents={isSearchFocused ? "none" : "auto"}
        {...styles.element}
      />
      <Input
        ref={inputRef}
        onBlur={handleBlur}
        placeholder={isSearchFocused ? "Search for anything..." : null}
        cursor={isSearchFocused ? "text" : "pointer"}
        paddingX={isSearchFocused ? "2rem" : "0"}
        {...styles.input}
      />
      {isSearchFocused && (
        <InputRightElement
          onClick={handleBlur}
          children={<IoCloseSharp {...styles.icon} />}
          {...styles.element}
        />
      )}
    </InputGroup>
  );
};

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
