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

  /**
   * Update min and max state and call query update.
   * @param {string} value - Number value.
   * @param {string} type - Min or max.
   */
  const handleChange = ({ value, type }) => {
    const number = parse(value);

    if (type === "min") setMin(number);
    else setMax(number);

    updateQuery({ action: "add", type, number });
  };

  /**
   * Update query on price change.
   * @param {string} action - Add or remove from query.
   * @param {string} type - Min or max.
   * @param {string} number - Number string.
   */
  const updateQuery = ({ action, type, number }) => {
    if (action === "add") {
      router.query = {
        ...router?.query,
        ...(type === "min" ? { min: number } : { max: number }),
      };
    }

    if (action === "remove") {
      if (type === "min") {
        const { min: minQuery, ...otherQueries } = router?.query;
        router.query = { ...otherQueries };
      } else {
        const { max: minQuery, ...otherQueries } = router?.query;
        router.query = { ...otherQueries };
      }
    }

    // Make shallow request to update query
    router.push(router, undefined, { shallow: true });
  };

  const clearValues = (event) => {
    const { target } = event;

    if (target?.id === "min" && min) {
      setMin(null);
      updateQuery({ action: "remove", type: "min" });
    }
    if (target?.id === "max" && max) {
      setMax(null);
      updateQuery({ action: "remove", type: "max" });
    }
  };

  // Update prices state based on query on mount
  useEffect(() => {
    if (router) {
      const { min, max } = router?.query || {};
      if (min) setMin(min);
      if (max) setMax(max);
    }
  }, [router]);

  return (
    <Flex {...styles.wrapper}>
      <NumberInput
        onClick={clearValues}
        onChange={(value) => handleChange({ value, type: "min" })}
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
        onChange={(value) => handleChange({ value, type: "max" })}
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
