import { Radio, RadioGroup, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const DeliveryOrPickup = () => {
  const options = [
    {
      value: "both",
      label: "Both",
    },
    {
      value: "delivery",
      label: "Delivery only",
    },
    {
      value: "pickup",
      label: "Pickup only",
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

export { DeliveryOrPickup };

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
