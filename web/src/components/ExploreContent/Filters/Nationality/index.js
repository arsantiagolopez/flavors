import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CountrySearch } from "./CountrySearch";

const Nationality = () => {
  const [active, setActive] = useState(null);
  const router = useRouter();

  // All countries and their flags
  const countries = [
    { emoji: "🇻🇪", name: "venezuela" },
    { emoji: "🇮🇹", name: "italy" },
    { emoji: "🇲🇽", name: "mexico" },
    { emoji: "🇨🇳", name: "china" },
    { emoji: "🇪🇸", name: "spain" },
  ];

  // Top 5 most searched nationalities
  const hottest = [
    { emoji: "🇻🇪", name: "venezuela" },
    { emoji: "🇮🇹", name: "italy" },
    { emoji: "🇲🇽", name: "mexico" },
    { emoji: "🇨🇳", name: "china" },
    { emoji: "🇪🇸", name: "spain" },
  ];

  const handleRemove = () => {
    setActive(null);
    const { nationality, ...otherQueries } = router?.query;
    router.query = { ...otherQueries };
    // Don't refresh the page
    router.push(router, undefined, { shallow: true });
  };

  // Update
  useEffect(() => {
    if (router) {
      const { nationality } = router?.query || {};
      const { emoji } =
        countries.find(({ name }) => nationality === name) || {};
      if (emoji) setActive({ emoji, name: nationality });
    }
  }, [router]);

  const countrySearchProps = { countries };

  return (
    <Flex {...styles.wrapper}>
      {active ? (
        <Flex {...styles.active}>
          <Text onClick={handleRemove} {...styles.emoji} paddingRight="1vw">
            ✖️
          </Text>
          <Text {...styles.emoji}>{active?.emoji}</Text>
          <Text {...styles.name}>{active?.name}</Text>
        </Flex>
      ) : (
        <>
          <CountrySearch {...countrySearchProps} />
          <Text {...styles.heading}>Hottest</Text>
          <Flex {...styles.emojis}>
            {hottest.map(({ emoji, name }) => (
              <Link
                key={name}
                href={{
                  pathname: "/explore",
                  query: { ...router?.query, nationality: name },
                }}
                shallow
              >
                <Text {...styles.emoji}>{emoji}</Text>
              </Link>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export { Nationality };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
  },
  active: {
    direction: "row",
    align: "center",
  },
  name: {
    fontSize: "11pt",
    textTransform: "capitalize",
  },
  heading: {
    fontWeight: "semibold",
    letterSpacing: "tight",
    paddingTop: "2",
    paddingBottom: "1",
  },
  emojis: {
    direction: "row",
  },
  emoji: {
    fontSize: "1.5rem",
    paddingRight: "1",
    cursor: "pointer",
  },
};
