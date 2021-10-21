import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useController } from "react-hook-form";
import axios from "../../axios";
import { validateFields } from "../../utils/validateFields";

const UsernameCheck = ({
  name,
  control,
  defaultValue,
  placeholder,
  styleProps,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const {
    field: { ref, onChange, ...controllerProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const controllerRef = useRef(null);

  const handleChange = (event) => {
    const { target } = event || {};
    onChange(target?.value);
    setValue(target?.value);
  };

  const handleFocus = () => setIsUsernameFocus(true);

  // Check username avilability after change and blur
  const handleBlur = async () => {
    if (value === "") return;

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

  return (
    <InputGroup {...styleProps}>
      <Input
        ref={controllerRef}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...controllerProps}
      />
      <InputRightElement
        pointerEvents="none"
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
