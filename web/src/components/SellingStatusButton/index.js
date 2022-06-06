import { CheckIcon } from "@chakra-ui/icons";
import { Button, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineBlock } from "react-icons/md";

const SellingStatusButton = (otherStyles) => {
  const [isActive, setIsActive] = useState(true);

  const handleActive = () => setIsActive(!isActive);

  return (
    <Button
      onClick={handleActive}
      {...styles.button}
      {...otherStyles}
      rightIcon={isActive ? <CheckIcon /> : <Icon as={MdOutlineBlock} />}
      background={isActive ? "green.400" : "red.400"}
      _hover={{ background: isActive ? "green.500" : "red.500" }}
    >
      {isActive ? "Active now" : "Closed"}
    </Button>
  );
};

export { SellingStatusButton };

// Styles

const styles = {
  button: {
    width: "fit-content",
    minWidth: "9em",
  },
};
