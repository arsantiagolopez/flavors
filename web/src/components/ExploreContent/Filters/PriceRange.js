import { Flex, NumberInput, NumberInputField, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PriceRange = () => {
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const router = useRouter();

  const format = (val) => {
    const number = parseInt(val).toLocaleString();
    return "$" + number.toString();
  };
  const parse = (val) => val.replace(/^\$/, "");

  const handleMinChange = (str) => setMin(parse(str));
  const handleMaxChange = (str) => setMax(parse(str));

  const clearValues = (event) => {
    const { target } = event;

    if (target?.id === "min" && min) setMin(null);
    if (target?.id === "max" && max) setMax(null);
  };

  // Update query on price change
  useEffect(() => {
    // Handle min query
    if (min) {
      router.query = { ...router?.query, min };
    } else {
      const { min: minQuery, ...otherQueries } = router?.query;
      router.query = { ...otherQueries };
    }

    // Handle max query
    if (max) {
      router.query = { ...router?.query, max };
    } else {
      const { max: maxQuery, ...otherQueries } = router?.query;
      router.query = { ...otherQueries };
    }

    // Make shallow request to update query
    router.push(router, undefined, { shallow: true });
  }, [min, max]);

  return (
    <Flex {...styles.wrapper}>
      <NumberInput
        onClick={clearValues}
        onChange={(str) => handleMinChange(str)}
        value={min ? format(min) : "Min"}
        clampValueOnBlur={min ? true : false}
        min={0}
        max={999}
        {...styles.input}
      >
        <NumberInputField
          id="min"
          {...styles.field}
          background={min && "gray.800"}
          color={min && "white"}
        />
      </NumberInput>

      <Text {...styles.divider}>to</Text>

      <NumberInput
        onClick={clearValues}
        onChange={(str) => handleMaxChange(str)}
        value={max ? format(max) : "Max"}
        clampValueOnBlur={max ? true : false}
        min={1}
        max={1000}
        {...styles.input}
      >
        <NumberInputField
          id="max"
          {...styles.field}
          background={max && "gray.800"}
          color={max && "white"}
        />
      </NumberInput>
    </Flex>
  );
};

export { PriceRange };

// Styles

const styles = {
  wrapper: {
    direction: "row",
    align: "center",
    justify: "space-between",
  },
  input: {
    size: "sm",
  },
  field: {
    justify: "center",
    align: "center",
    boxShadow: "md",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "11pt",
    letterSpacing: "tight",
    borderWidth: "0",
    paddingX: "2",
    borderRadius: "0.5em",
    _focus: {
      borderWidth: "0",
    },
    _hover: {
      background: "gray.800",
      color: "white",
      boxShadow: "lg",
      transform: "scale(101%)",
    },
  },
  divider: {
    marginX: "2",
  },
};
