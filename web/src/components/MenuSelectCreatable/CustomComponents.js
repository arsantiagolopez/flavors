import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { components } from "react-select";

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    {props.hasValue ? <CheckIcon color="green.400" /> : <ChevronDownIcon />}
  </components.DropdownIndicator>
);

const ClearIndicator = (props) => (
  <components.ClearIndicator {...props}>
    <IoCloseSharp />
  </components.ClearIndicator>
);

export { DropdownIndicator, ClearIndicator };
