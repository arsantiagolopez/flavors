import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import axios from "../../axios";
import { validateFields } from "../../utils/validateFields";

const UsernameCheck = ({
  name,
  control,
  defaultValue,
  placeholder,
  rules,
  errors,
  styleProps,
}) => {
  const [value, setValue] = useState(null);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const {
    field: { ref, onChange, onBlur, ...controllerProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue ? defaultValue : "",
  });

  const handleChange = (event) => {
    const { target } = event || {};
    onChange(target?.value);
    setValue(target?.value);
  };

  const handleFocus = () => setIsUsernameFocus(true);

  // Check username avilability after change and blur
  const handleBlur = async () => {
    if (value === "") return setIsAvailable(false);

    setIsUsernameFocus(false);
    setIsFetching(true);
    const { status, data } = await axios.get(`/api/user/username/${value}`);

    if (status === 200) setIsAvailable(data?.available);

    setIsFetching(false);
  };

  // Checks if username is of valid format
  const validateUsername = () => {
    const { success } = validateFields({ field: "username", value });
    return success;
  };

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <InputGroup {...styleProps}>
      <Input
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        isInvalid={rules && errors?.username}
        _focus={{
          borderColor: errors?.username ? "red.500" : "gray.800",
          borderWidth: errors?.username ? "1.5px" : "2px",
        }}
        {...controllerProps}
        {...styles.input}
      />
      <InputRightElement
        {...styles.right}
        children={
          // Don't show icons if focused or field empty
          isUsernameFocus ? null : value === defaultValue ||
            // Don't show icon if matching username
            !value ? null : isFetching ? (
            // If fetching, show spinner
            <Spinner {...styles.spinner} />
          ) : // If username is valid and available
          isAvailable && validateUsername() ? (
            <CheckIcon {...styles.check} />
          ) : (
            <SmallCloseIcon {...styles.close} />
          )
        }
      />
    </InputGroup>
  );
};

// Styles

const styles = {
  input: {
    spellCheck: "false",
    paddingY: "1.5em",
  },
  right: {
    pointerEvents: "none",
    height: "100%",
  },
  spinner: {
    color: "red.500",
    size: "sm",
  },
  check: {
    color: "green.500",
  },
  close: {
    color: "red.400",
  },
};

export { UsernameCheck };
