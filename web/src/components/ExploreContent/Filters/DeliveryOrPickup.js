import { Radio, RadioGroup, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DeliveryOrPickup = () => {
  const options = [
    {
      value: "both",
      label: "Delivery & Pickup",
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

  const router = useRouter();

  // Update query string with selected sort value
  useEffect(() => {
    // Both query is default, so no query
    if (value === "both") {
      const { delivery, ...otherQueries } = router?.query;
      router.query = { ...otherQueries };
    } else {
      router.query = { ...router?.query, delivery: value };
    }
    router.push(router, undefined, { shallow: true });
  }, [value]);

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
    cursor: "pointer",
    isTruncated: true,
  },
};
