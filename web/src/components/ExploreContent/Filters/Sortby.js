import { Radio, RadioGroup, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const SortBy = () => {
  const options = [
    {
      value: "popular",
      label: "Most popular",
    },
    {
      value: "priceLowest",
      label: "Price: Low to high",
    },
    {
      value: "priceHighest",
      label: "Price: High to low",
    },
  ];

  const [value, setValue] = useState(options[0].value);

  return (
    <RadioGroup onChange={setValue} value={value} {...styles.wrapper}>
      {options.map(({ value, label }) => (
        <Radio key={value} value={value}>
          <Text {...styles.label}>{label}</Text>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export { SortBy };

// Styles

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    colorScheme: "red",
  },
  label: {
    fontSize: "11pt",
  },
};
