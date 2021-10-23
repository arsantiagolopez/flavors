import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Dietary = () => {
  const [active, setActive] = useState([]);

  const router = useRouter();

  const diets = [
    {
      name: "allergies",
      label: "Allergy friendly",
    },
    {
      name: "glutten",
      label: "Glutten-free",
    },
    {
      name: "lowCarb",
      label: "Low carb",
    },
    {
      name: "vegetarian",
      label: "Vegetarian",
    },
    {
      name: "vegan",
      label: "Vegan",
    },
  ];

  // Set tag to active if not previously active, remove if it was
  const toggleActive = (selected) => {
    let diet = active.find(({ name }) => name === selected);
    let updatedTags = null;

    if (diet) {
      updatedTags = active.filter(({ name }) => diet?.name !== name);
    } else {
      diet = diets.find(({ name }) => name === selected);
      updatedTags = [...active, diet];
    }

    setActive(updatedTags);
    return updatedTags;
  };

  // Update dietary query on active diets change
  const updateQuery = (tags) => {
    if (tags.length) {
      const dietary = tags.map(({ name }) => name);
      router.query = { ...router?.query, dietary };
    } else {
      // Clear query
      const { dietary, ...otherQueries } = router?.query;
      router.query = { ...otherQueries };
    }
    router.push(router, undefined, { shallow: true });
  };

  // Update tag state and query
  const handleClick = (name) => {
    const tags = toggleActive(name);
    updateQuery(tags);
  };

  const isTagActive = (tag) => active?.find(({ name }) => name === tag);

  // Update dietary based on query
  useEffect(() => {
    if (router) {
      const { dietary } = router?.query || {};
      if (dietary) {
        const dietObjects = diets.filter(({ name }) => dietary.includes(name));
        setActive(dietObjects);
      }
    }
  }, [router]);

  return (
    <Flex {...styles.wrapper}>
      {diets.map(({ name, label }) => (
        <Flex
          key={name}
          onClick={() => handleClick(name)}
          color={isTagActive(name) && "white"}
          background={isTagActive(name) && "gray.800"}
          {...styles.tag}
        >
          <Text {...styles.diet}>{label}</Text>
          {isTagActive(name) && <SmallCloseIcon {...styles.remove} />}
        </Flex>
      ))}
    </Flex>
  );
};

export { Dietary };

// Styles

const styles = {
  wrapper: {
    direction: "row",
    wrap: "wrap",
  },
  tag: {
    align: "center",
    borderRadius: "1em",
    boxShadow: "md",
    height: "100%",
    marginBottom: "1",
    marginRight: "1",
    paddingX: "1.5",
    paddingY: "1.5",
    _hover: {
      transform: "scale(102%)",
      background: "gray.800",
      color: "white",
      cursor: "pointer",
      boxShadow: "lg",
    },
  },
  diet: {
    fontSize: "10pt",
    marginX: "1",
    isTruncated: true,
  },
  remove: {
    color: "white",
    marginY: "0",
    animation:
      "rotate-in-2-cw 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
  },
};
