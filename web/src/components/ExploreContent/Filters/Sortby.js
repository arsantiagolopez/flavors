import { Radio, RadioGroup, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SortBy = () => {
  const options = [
    {
      value: "popular",
      label: "Most popular",
    },
    {
      value: "lowestPrice",
      label: "Price: Low to high",
    },
    {
      value: "highestPrice",
      label: "Price: High to low",
    },
  ];

  const [active, setActive] = useState(options[0].value);

  const router = useRouter();

  // Update query string with selected sort value
  const handleChange = (value) => {
    // Popular query is default, so no query
    if (value === "popular") {
      const { sort, ...otherQueries } = router?.query;
      router.query = { ...otherQueries };
    } else {
      router.query = { ...router?.query, sort: value };
    }
    router.push(router, undefined, { shallow: true });

    setActive(value);
  };

  // Update radio choice based on query
  useEffect(() => {
    if (router) {
      const { sort } = router?.query || {};
      if (sort) setActive(sort);
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
    cursor: "pointer",
    isTruncated: true,
  },
};
