import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const CountrySearch = ({ countries }) => {
  const [value, setValue] = useState(null);
  const [results, setResults] = useState(null);

  const router = useRouter();

  let countriesCopy = countries;

  const handleChange = (event) => setValue(event.target.value);

  // Filter countries by name
  useEffect(() => {
    if (value === "") return setResults(null);
    if (countriesCopy) {
      const filtered = countries.filter((country) => {
        const name = country.name.toLowerCase();
        const search = value?.toLowerCase();
        const isMatch = name.includes(search);
        if (isMatch) return true;
      });
      return setResults(filtered);
    }
  }, [value]);

  return (
    <>
      <InputGroup {...styles.group}>
        <InputLeftElement
          children={<IoSearchSharp {...styles.icon} />}
          {...styles.left}
        />
        <Input
          placeholder="Country..."
          value={value ? value : ""}
          onChange={handleChange}
          {...styles.input}
        />
      </InputGroup>

      <Flex display={results ? "flex" : "none"} {...styles.results}>
        {results?.map(({ emoji, name }) => (
          <Link
            key={name}
            href={{
              pathname: "/explore",
              query: { ...router?.query, nationality: name },
            }}
            shallow
          >
            <Flex {...styles.result}>
              <Text {...styles.emoji}>{emoji}</Text>
              <Text {...styles.country}>{name}</Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </>
  );
};

export { CountrySearch };

// Styles

const styles = {
  group: {
    size: "sm",
  },
  left: {
    pointerEvents: "none",
  },
  icon: {
    color: "gray.300",
  },
  input: {
    zIndex: "3",
    borderRadius: "0.5em",
    paddingLeft: "1.7rem",
    background: "white",
  },
  results: {
    position: "absolute",
    top: "calc(2em - 3px)",
    direction: "column",
    maxHeight: { base: "10vh", md: "20vh" },
    overflowY: "scroll",
    background: "white",
    boxShadow: "md",
    borderBottomRadius: "0.25em",
    width: "100%",
  },
  result: {
    direction: "row",
    align: "center",
    paddingY: "1",
    paddingX: "1em",
    _hover: {
      background: "gray.100",
    },
  },
  emoji: {
    fontSize: "1.2rem",
    marginRight: "2",
  },
  country: {
    fontSize: "11pt",
    textTransform: "capitalize",
  },
};
