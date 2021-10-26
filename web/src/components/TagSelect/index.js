import { CheckIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useController } from "react-hook-form";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";

const TagSelect = ({ name, control }) => {
  const [isMaxReached, setIsMaxReached] = useState(false);

  const {
    field: { ref, value: _, onChange, ...controllerProps },
  } = useController({
    name,
    control,
  });

  // Update controller value
  const handleChange = (values) => {
    const tags = values?.map((obj) => obj["value"]);
    checkIfMaxReached(values);
    onChange(tags);
  };

  // Set max at 5 tags
  const checkIfMaxReached = (values) => {
    if (values?.length > 4) setIsMaxReached(true);
    else setIsMaxReached(false);
  };

  // Custom icon for dropdown
  const ClearIndicator = (props) => (
    <components.ClearIndicator {...props}>
      {isMaxReached && <CheckIcon {...styles.icon} />}
    </components.ClearIndicator>
  );

  return (
    <CreatableSelect
      isMulti
      styles={{
        ...styles,
        input: (provided) => ({
          ...provided,
          textAlign: "left",
          fontSize: "1rem",
          display: isMaxReached ? "none" : "block",
          height: "1.75em",
          overflow: "hidden",
        }),
      }}
      placeholder="Tags (Optional)"
      noOptionsMessage={() => "Already added."}
      onChange={handleChange}
      components={{ ClearIndicator }}
      {...controllerProps}
    />
  );
};

export { TagSelect };

// Styles

const styles = {
  placeholder: (provided) => ({
    ...provided,
    fontFamily: "system-ui, sans-serif",
    fontSize: "1rem",
    color: "#A0AEC0", // gray.400
    textAlign: "left",
    margin: 0,
  }),
  container: (provided) => ({
    ...provided,
    padding: 0,
    maxWidth: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    borderRadius: "0.375rem", // md
    paddingTop: "0.75em",
    paddingBottom: "0.75em",
    // Hover & State
    border: state.isFocused ? `2px solid #1A202C` : `1px solid #E2E8F0`, // gray.200
    marginLeft: state.isFocused ? "-1px" : "0",
    marginTop: state.isFocused ? "-1px" : "0",
    // Disables the blue border
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      borderBottom: state.isFocused ? `2px solid #1A202C` : `1px solid #E2E8F0`, // gray.200
    },
    paddingLeft: "1rem",
    overflow: "hidden",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
    fontSize: "1rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  multiValue: (provided) => ({
    ...provided,
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#1A202C",
    borderRadius: "1rem",
    padding: "3px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    padding: "0",
    margin: "0",
    "&:hover": {
      backgroundColor: "transparent",
      color: "white",
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    display: state.selectProps.inputValue ? "block" : "none",
  }),
  indicatorSeparator: () => ({}),
  option: (provided, state) => ({
    ...provided,
    fontFamily: `system-ui, sans-serif`,
    backgroundColor: state.isFocused ? "#1A202C" : "none", // gray.800
    color: state.isFocused ? "white" : "#1A202C",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    paddingRight: "0.5rem",
  }),

  // Normal styles
  icon: {
    color: "green.400",
    _hover: {
      color: "red.500",
    },
  },
};
