import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseSharp, IoSearchSharp } from "react-icons/io5";
import { useDelay } from "../../../utils/useDelay";

const SearchBar = ({
  searchValue,
  setSearchValue,
  isSearchLoading,
  setIsSearchLoading,
  isSearchActive,
  setIsSearchActive,
}) => {
  const toggleActive = () => setIsSearchActive(!isSearchActive);

  // Update search value on change
  const handleChange = (event) => setSearchValue(event?.target.value);

  // Trigger search and make API calls
  const handleSearch = async () => {
    setIsSearchLoading(true);

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

  return (
    <>
      {!isSearchActive ? (
        <Icon onClick={toggleActive} as={IoSearchSharp} {...styles.trigger} />
      ) : (
        <InputGroup {...styles.wrapper}>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={IoSearchSharp} {...styles.icon} />}
            {...styles.left}
          />
          <Input
            placeholder="Look up orders..."
            value={searchValue ? searchValue : ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...styles.input}
          />

          <InputRightElement
            pointerEvents={isSearchLoading && "none"}
            onClick={!isSearchLoading && toggleActive}
            cursor={!isSearchLoading && "pointer"}
            {...styles.right}
          >
            {searchValue && isSearchLoading ? (
              <Spinner {...styles.spinner} />
            ) : searchValue ? (
              <Button onClick={handleSearch} {...styles.button}>
                Search
              </Button>
            ) : (
              <Icon as={IoCloseSharp} {...styles.close} />
            )}
          </InputRightElement>
        </InputGroup>
      )}
    </>
  );
};

export { SearchBar };

// Styles
const styles = {
  trigger: {
    fontSize: { base: "2xl", md: "3xl" },
    cursor: "pointer",
    color: "gray.300",
  },
  icon: {
    color: "gray.300",
  },
  left: {
    cursor: "pointer",
    height: "100%",
  },
  wrapper: {
    focusBorderColor: "gray.700",
    marginY: { base: "0", md: "2" },
  },
  input: {
    focusBorderColor: "gray.800",
    paddingY: "1.5em",
  },
  right: {
    width: "fit-content",
    height: "100%",
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
    width: "100%",
  },
  close: {
    color: "gray.300",
    width: "3em",
    cursor: "pointer",
  },
};
