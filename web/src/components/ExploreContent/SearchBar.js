import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDelay } from "../../utils/useDelay";

const SearchBar = ({
  searchValue,
  setSearchValue,
  isSearchLoading,
  setIsSearchLoading,
}) => {
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [fade, setFade] = useState(true);

  const router = useRouter();

  // Update search value on change
  const handleChange = (event) => {
    const { value } = event?.target;

    // If no search query, hide filter sidebar
    if (value === "") {
      const { search, ...otherQueries } = router?.query;
      router.query = { ...otherQueries };
      router.push(router, undefined, { shallow: true });
    }
    setSearchValue(value);
  };

  // Trigger search and make API calls
  const handleSearch = async () => {
    setIsSearchLoading(true);

    // Add search param to URI query without affecting others
    const { search, ...otherQueries } = router?.query;
    router.query = { ...otherQueries, search: searchValue };
    router.push(router, undefined, { shallow: true });

    // Logic here...
    await useDelay(2000);

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
          children={<Icon as={IoSearchSharp} color="gray.300" />}
          {...styles.left}
        />
        <Input
          placeholder={suggestion !== "" ? `${suggestion}...` : "Explore..."}
          value={searchValue ? searchValue : ""}
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
            height="100%"
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
    marginBottom: { base: "2vh", md: "3vh" },
  },
  left: {
    pointerEvents: "none",
    height: "100%",
  },
  input: {
    className: "searchbar",
    transition: "fade 5s",
    focusBorderColor: "gray.800",
    paddingY: "1.5em",
  },
  spinner: {
    color: "brand",
    size: "md",
    thickness: "2px",
  },
  button: {
    size: "md",
    background: "brand",
    marginRight: "0.5",
    height: "90%",
    paddingY: "auto",
  },
  recent: {
    marginBottom: "auto",
  },
};
