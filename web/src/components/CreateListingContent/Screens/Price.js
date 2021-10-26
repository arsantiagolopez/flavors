import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Screen index: 3

const PriceScreen = ({
  listing,
  setListing,
  handleChange: handleScreenChange,
  setFormCompleteIndex,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    trigger,
  } = useForm();

  const format = (val) => "$" + val.toLocaleString();
  const parse = (val) => val.replace(/^\$/, "");

  // Handle max validation: Prevent user from inputing past max
  const handleChange = (value) => {
    if (parseInt(value) > 10000) {
      setValue(10000);
      return setError("price", {
        type: "manual",
        message: "$10,000 is the max you can sell a plate for.",
      });
    }
    trigger("price");
    return setValue(parse(value));
  };

  // Submit form
  const handleNext = () => handleSubmit(onSubmit)();

  // Handle submit
  const onSubmit = async (values) => {
    setIsLoading(false);

    // Unlock & swipe to next screen
    setFormCompleteIndex(4);
    handleScreenChange(1);

    // Update root form state
    setListing({ ...listing, price: value });
  };

  const priceRegister = register("price", {
    required: "How much do you want for your plate?",
    min: { value: 1, message: "Your price's gotta be greater than 0." },
  });

  return (
    <Flex {...styles.wrapper}>
      <NumberInput
        value={value ? format(value) : ""}
        onChange={(value) => handleChange(value)}
        min={0}
        max={10000}
        precision={2}
        clampValueOnBlur={true}
        isInvalid={errors?.price}
        {...styles.input}
      >
        <NumberInputField
          placeholder="Price"
          border={errors?.price && "1px solid"}
          borderColor={errors?.price && "red.500"}
          _focus={{
            border: errors?.price ? "1px solid" : "2px solid",
            borderColor: errors?.price ? "red.500" : "gray.800",
          }}
          {...styles.field}
          {...priceRegister}
        />
      </NumberInput>
      {errors?.price && <Text {...styles.error}>{errors?.price?.message}</Text>}

      <Button
        onClick={handleNext}
        rightIcon={isLoading ? <Spinner {...styles.spinner} /> : <CheckIcon />}
        {...styles.next}
      >
        Next
      </Button>
    </Flex>
  );
};

export { PriceScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "7vh", md: "12vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  input: {
    _focus: {
      border: "1px solid",
      borderColor: "gray.800",
    },
  },
  field: {
    justify: "center",
    align: "center",
    paddingY: "1.75em",
  },
  error: {
    color: "red.500",
    marginY: "2",
    textAlign: "left",
  },
  spinner: {
    size: "sm",
    speed: "2s",
    color: "white",
  },
  next: {
    position: "absolute",
    bottom: "10vh",
    width: { base: "calc(100% - 4em)", md: "calc(100% - 35vw - 35vw)" },
    padding: "1.75em",
    borderRadius: "0.5em",
    iconSpacing: "3",
  },
};
