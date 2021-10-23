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

  const [active, setActive] = useState(options[0].value);

  const router = useRouter();

  // Update query string with selected delivery value
  const handleChange = (value) => {
    // Both query is default, so no query
    if (value === "both") {
      const { delivery, ...otherQueries } = router?.query;
      router.query = { ...otherQueries };
    } else {
      router.query = { ...router?.query, delivery: value };
    }
    router.push(router, undefined, { shallow: true });

    setActive(value);
  };

  // Update radio choice based on query
  useEffect(() => {
    if (router) {
      const { delivery } = router?.query || {};
      if (delivery) setActive(delivery);
    }
  }, [router]);

  return (
    <RadioGroup
      onChange={(val) => handleChange(val)}
      value={active}
      defaultValue={options[0].value}
      {...styles.wrapper}
    >
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
