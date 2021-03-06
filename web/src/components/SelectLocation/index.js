import React from "react";
import Geosuggest from "react-geosuggest";
import { useController } from "react-hook-form";
import { validateFields } from "../../utils/validateFields";
// import { SiGooglemaps } from "react-icons/si";

const SelectLocation = ({ name, control, defaultValue, placeholder }) => {
  const {
    field: { ref, onChange, ...controllerProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  // Update form value on suggest select
  const onSuggestSelect = (value) => {
    // Check for valid address input
    const { success } = validateFields({ field: "address", value });

    // Address was valid
    if (success && value) {
      const {
        location: { lat, lng },
        gmaps: { formatted_address },
      } = value;

      const address = shortenIfNeeded(formatted_address);

      onChange({ name: address, longitude: lng, latitude: lat });
    }
  };

  // Truncate name to under 100 characters if needed
  const shortenIfNeeded = (name) => {
    if (name.length > 99) return name.substring(0, 99);
    return name;
  };

  // Truncate long address string for display, but preserve long for db
  const formatAddress = (str) => str.substring(0, str.indexOf(","));

  return (
    <Geosuggest
      ref={ref}
      onChange={onChange}
      {...controllerProps}
      initialValue={
        defaultValue?.name
          ? formatAddress(defaultValue.name)
          : typeof defaultValue === "string"
          ? formatAddress(defaultValue)
          : null
      }
      placeholder={placeholder}
      onSuggestSelect={onSuggestSelect}
      location={
        typeof google !== "undefined"
          ? defaultValue && google
            ? new google.maps.LatLng(
                defaultValue.latitute,
                defaultValue.longitude
              )
            : google
            ? new google.maps.LatLng(31, -100)
            : null
          : null
      }
      radius="20"
      autoComplete="off"
    />
  );
};

export { SelectLocation };
