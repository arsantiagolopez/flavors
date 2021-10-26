import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useDelay } from "../../utils/useDelay";
import { ClearIndicator, DropdownIndicator } from "./CustomComponents";

const MenuSelectCreatable = ({ name, control, menuOptions, defaultValue }) => {
  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const getInitialValues = () =>
    menuOptions?.map((option) => createOption(option));

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(getInitialValues);
  const [value, setValue] = useState(null);

  const {
    field: { ref, value: _, onChange, ...controllerProps },
  } = useController({
    name,
    control,
  });

  // Update value on created or selected values
  const handleChange = (newValue) => {
    setValue(newValue);
    if (newValue) onChange(newValue?.label);
    // If no value added, default to first element of passed down array
    else onChange(menuOptions[0]);
  };

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    await useDelay(1000);
    setIsLoading(false);

    // Create option, add to list, set as new value
    const newOption = createOption(inputValue);
    setOptions([...options, newOption]);
    setValue(newOption);

    // Handle null
    if (newOption) onChange(newOption?.label);
  };

  // Set initial value to passed down default value
  useEffect(() => handleChange(createOption(defaultValue)), []);

  return (
    <CreatableSelect
      value={value}
      onChange={handleChange}
      defaultValue={defaultValue}
      isDisabled={isLoading}
      isLoading={isLoading}
      onCreateOption={handleCreate}
      options={options}
      isClearable={true}
      styles={styles}
      placeholder="Menu (Optional)"
      noOptionsMessage={() => "You don't have any menus. Add one."}
      components={{ DropdownIndicator, ClearIndicator }}
      {...controllerProps}
    />
  );
};

export { MenuSelectCreatable };

// Styles

const styles = {
  placeholder: (provided) => ({
    ...provided,
    fontFamily: "system-ui, sans-serif",
    fontSize: "1rem",
    color: "#A0AEC0", // gray.400
    textAlign: "left",
    paddingLeft: "1rem",
    paddingRight: "1em",
    margin: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1em",
    textAlign: "left",
    color: "#1A202C", // gray.800
    margin: 0,
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
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: `system-ui, sans-serif`,
    backgroundColor: state.isFocused ? "#1A202C" : "none", // gray.800
    color: state.isFocused ? "white" : "#1A202C",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  input: (provided) => ({
    ...provided,
    textAlign: "left",
    fontSize: "1rem",
    paddingLeft: "0.75rem",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    paddingRight: "0.5rem",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "25vh",
  }),
};
