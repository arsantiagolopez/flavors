import { Button, Flex, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDuplicate } from "react-icons/io5";
import { DropzoneField } from "../../DropzoneField";

const PhotoScreen = () => {
  const [picture, setPicture] = useState(null);

  const dropzoneFieldProps = { setPicture };

  return (
    <Flex {...styles.wrapper}>
      <InputGroup>
        <Input {...styles.input} />
      </InputGroup>

      <DropzoneField {...dropzoneFieldProps} width="100%">
        <Button rightIcon={<IoDuplicate />} {...styles.button}>
          Add a photo
        </Button>
      </DropzoneField>
    </Flex>
  );
};

export { PhotoScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: "10vh",
    paddingX: { base: "2em", md: "none" },
    align: "center",
    width: "100%",
  },
  input: {
    width: { base: "100%", md: "30%" },
    marginX: "auto",
    padding: "1.5em",
  },
  button: {
    width: { base: "100%", md: "auto" },
    padding: "1.75em",
    borderRadius: "0.5em",
    marginY: "3vh",
  },
};
