import { CheckIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoDuplicate } from "react-icons/io5";
import { ListingDropzone } from "../../Dropzone";

// Screen index: 1

const PhotoScreen = ({
  listing,
  setListing,
  handleChange,
  setFormCompleteIndex,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setError,
    clearErrors,
  } = useForm();

  // Submit form
  const handleNext = () => handleSubmit(onSubmit)();

  // Handle submit
  const onSubmit = async (values) => {
    setIsLoading(false);
    // Unlock & swipe to next screen
    setFormCompleteIndex(2);
    handleChange(1);

    // Update root form state
    setListing({ ...listing, ...values, photoPreview });
  };

  // Form field registration
  const titleRegister = register("title", {
    required: "Your plate needs a title.",
  });
  const photoRegister = { name: "photo", control, setError };

  const listingDropzoneProps = {
    setPhotoPreview,
    setError,
    clearErrors,
  };

  return (
    <Flex
      marginTop={photoPreview ? { base: "-10vh", md: "-9vh" } : "none"}
      {...styles.wrapper}
    >
      <form>
        <ListingDropzone {...listingDropzoneProps} {...photoRegister}>
          {photoPreview && !errors.photo ? (
            <AspectRatio {...styles.aspect}>
              <Image src={photoPreview} />
            </AspectRatio>
          ) : (
            <Button
              rightIcon={
                errors?.photo ? (
                  <Spinner {...styles.spinner} />
                ) : (
                  <IoDuplicate />
                )
              }
              {...styles.button}
              border={errors?.photo ? "2px solid" : "1px solid"}
              borderColor={errors?.photo ? "red.500" : "gray.200"}
              color={errors.photo ? "red.500" : "gray.400"}
            >
              {errors?.photo ? errors?.photo?.message : "Add a photo"}
            </Button>
          )}
        </ListingDropzone>

        <Flex {...styles.field}>
          <Input
            placeholder="Title"
            isInvalid={errors?.title}
            focusBorderColor={errors?.title && "red.500"}
            {...titleRegister}
            {...styles.input}
          />

          {errors?.title && (
            <Text {...styles.error}>{errors?.title?.message}</Text>
          )}
        </Flex>
      </form>

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

export { PhotoScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "7vh", md: "12vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  aspect: {
    ratio: 1,
    width: { base: "100%", md: "70%" },
    borderRadius: "0.5em",
    overflow: "hidden",
    maxHeight: { base: "none", md: "40vh" },
    cursor: "pointer",
    marginTop: { base: "5vh", md: "2vh" },
  },
  spinner: {
    color: "red.500",
    size: "sm",
    speed: "1s",
  },
  button: {
    width: "100%",
    paddingY: "10vh",
    background: "none",
    fontWeight: "normal",
    whiteSpace: "wrap",
    _hover: {
      background: "none",
    },
    _active: {
      background: "none",
      border: "2px solid",
      borderColor: "gray.800",
      color: "gray.800",
    },
  },
  field: {
    direction: "column",
    marginY: { base: "3vh", md: "2vh" },
    width: "100%",
  },
  input: {
    paddingY: "1.75em",
    errorBorderColor: "red.500",
  },
  inputRight: {
    height: "100%",
    right: "1",
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
