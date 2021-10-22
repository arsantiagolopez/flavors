import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDelay } from "../../utils/useDelay";

const SearchBar = ({ searchValue, setSearchValue }) => {
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [fade, setFade] = useState(true);

  // Update search value on change
  const handleChange = (event) => setSearchValue(event.target.value);

  // Trigger search and make API calls
  const handleSearch = () => {
    setIsSearchLoading(true);

    // Logic here...

    setIsSearchLoading(false);
  };

  // Listen & trigger search when the enter key is pressed
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isSearchLoading) {
      handleSearch();
    }
  };

  const suggestions = [
    "Tacos",
    "Paella",
    "Fish & Chips",
    "Nigerian Suya",
    "Tornado roll",
    "BBQ",
    "Tequeños",
  ];

  const SUGGESTION_DELAY = 5000;

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  // Suggest foods every 5 seconds
  useEffect(() => {
    let randomSuggestions = shuffle(suggestions);

    // Start with "Search for..." & end with ""
    randomSuggestions.unshift("Search for anything");
    randomSuggestions.push("");

    // Iterate through all suggestions before exiting mount
    randomSuggestions.map(async (food, index) => {
      await useDelay(SUGGESTION_DELAY * index);
      setSuggestion(food);
    });
  }, []);

  // Set fade effect on placeholder text change
  useEffect(async () => {
    setFade(true);
    await useDelay(SUGGESTION_DELAY - 1000);
    // Don't set opacity to 0 on last index ""
    if (suggestion !== "") setFade(false);
  }, [suggestion]);

  return (
    <>
      {/* Search bar */}
      <InputGroup {...styles.wrapper}>
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearchSharp color="gray.300" />}
        />
        <Input
          placeholder={suggestion !== "" ? `${suggestion}...` : "Explore..."}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          _placeholder={{ opacity: fade ? 1 : 0 }}
          {...styles.input}
        />
        {searchValue && (
          <InputRightElement
            pointerEvents={isSearchLoading ? "none" : "auto"}
            width={isSearchLoading ? { base: "3em", md: "4em" } : "5.75em"}
          >
            {isSearchLoading ? (
              <Spinner {...styles.spinner} />
            ) : (
              <Button onClick={handleSearch} {...styles.button}>
                Search
              </Button>
            )}
          </InputRightElement>
        )}
      </InputGroup>

      {/* Recent searches */}
      <Flex
        display={isSearchFocused ? { base: "block", md: "none" } : "none"}
        {...styles.recent}
      >
        <Heading>Recent searches</Heading>
      </Flex>
    </>
  );
};

export { SearchBar };

// Styles
const styles = {
  wrapper: {
    focusBorderColor: "gray.700",
    paddingBottom: "3vh",
  },
  input: {
    className: "searchbar",
    transition: "fade 5s",
    focusBorderColor: "gray.800",
  },
  spinner: {
    color: "brand",
    size: "md",
    thickness: "2px",
  },
  button: {
    size: "md",
    paddingY: "auto",
    background: "brand",
    height: "90%",
    marginRight: "0.5",
  },
  recent: {
    marginBottom: "auto",
  },
};
