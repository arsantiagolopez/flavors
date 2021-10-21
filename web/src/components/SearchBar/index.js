import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDelay } from "../../utils/useDelay";

const SearchBar = () => {
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [fade, setFade] = useState(true);

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

    // Start with "Explore..." & end with ""
    randomSuggestions.unshift("Explore");
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
          className="searchbar"
          placeholder={suggestion !== "" ? `${suggestion}...` : "Explore..."}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          _placeholder={{ opacity: fade ? 1 : 0 }}
          {...styles.input}
        />
      </InputGroup>

      {/* Recent searches */}
      <Flex display={isSearchFocused ? "block" : "none"} {...styles.recent}>
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
    transition: "fade 5s",
    focusBorderColor: "gray.800",
  },
  recent: {
    marginBottom: "auto",
  },
};
