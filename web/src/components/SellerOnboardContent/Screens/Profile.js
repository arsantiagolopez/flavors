import { CheckIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Avatar,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ListingDropzone } from "../../Dropzone";
import { SelectLocation } from "../../SelectLocation";
import { UsernameCheck } from "../../UsernameCheck";

// Screen index: possible 1 or 2

const ProfileScreen = ({
  form,
  setForm,
  handleChange,
  setFormCompleteIndex,
  user,
  lastIndex,
}) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const { username, name, image, address } = user || {};

  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    setError,
    clearErrors,
    control,
    watch,
    reset,
  } = useForm();

  // Loading is false when user is missing required fields
  const isLoading =
    (!dirtyFields?.username && !username) ||
    (!dirtyFields?.name && !name) ||
    (!dirtyFields?.photo && !image);

  // Submit form
  const handleNext = () => handleSubmit(onSubmit)();

  // Handle submit
  const onSubmit = async (values) => {
    const nextScreen = lastIndex === 4 ? 3 : 2;

    // Unlock & swipe to next screen
    setFormCompleteIndex(nextScreen);
    handleChange(1);

    // Update root form state
    setForm({ ...form, ...values });
  };

  // Reset form's default values when user values loaded
  useEffect(() => {
    if (user) {
      reset({
        photo: image,
        name,
        username,
        address,
      });
    }
  }, [user]);

  // Form field registration
  const photoRegister = { name: "photo", control, setError };
  const nameRegister = register("name", {
    required: "What's your legal name?",
  });
  const usernameRegister = {
    name: "username",
    control,
    rules: {
      required: "Please choose a unique username.",
      // @todo: min ? max ? no @ ?
    },
    errors,
  };
  const addressRegister = { name: "address", control };

  const listingDropzoneProps = {
    setPhotoPreview,
    setError,
    clearErrors,
  };

  return (
    <Flex {...styles.wrapper}>
      <form style={styles.form}>
        <ListingDropzone
          defaultValue={image}
          {...listingDropzoneProps}
          {...photoRegister}
          {...styles.aspect}
        >
          {image || (photoPreview && !errors.photo) ? (
            <AspectRatio {...styles.aspect}>
              <Avatar src={photoPreview || image} {...styles.image} />
            </AspectRatio>
          ) : (
            <Avatar
              border={errors?.photo ? "2px solid" : "none"}
              borderColor={errors?.photo ? "red.500" : "gray.200"}
              color={errors.photo ? "red.500" : "gray.400"}
              {...styles.image}
            />
          )}
        </ListingDropzone>
        {errors?.photo && (
          <Text {...styles.error} textAlign="center">
            {errors?.photo.message}
          </Text>
        )}

        <Flex marginTop={errors?.photo ? "1vh" : "4vh"} {...styles.field}>
          <InputGroup>
            <Input
              defaultValue={name}
              placeholder="Your full name"
              isInvalid={errors?.name}
              _focus={{
                borderColor: errors?.name ? "red.500" : "gray.800",
                borderWidth: errors?.name ? "1.5px" : "2px",
              }}
              {...nameRegister}
              {...styles.input}
            />
            {watch("name") && (
              <InputRightElement
                children={<CheckIcon {...styles.icon} />}
                {...styles.inputRight}
              />
            )}
          </InputGroup>
          {errors?.name && (
            <Text {...styles.error}>{errors?.name.message}</Text>
          )}
        </Flex>

        <Flex marginTop={errors?.name ? "0" : "2vh"} {...styles.field}>
          <InputGroup>
            <UsernameCheck
              defaultValue={username}
              placeholder="Your username"
              {...usernameRegister}
            />
            {watch("username") === username && (
              <InputRightElement
                children={<CheckIcon {...styles.icon} />}
                {...styles.inputRight}
              />
            )}
          </InputGroup>
          {errors?.username && (
            <Text {...styles.error}>{errors?.username?.message}</Text>
          )}
        </Flex>

        <Flex
          marginTop={errors?.username ? "0" : "2vh"}
          {...styles.field}
          {...styles.lastField}
        >
          <InputGroup>
            <SelectLocation
              defaultValue={address}
              placeholder="Your address"
              {...addressRegister}
            />
            {watch("address") && (
              <InputRightElement
                children={<CheckIcon {...styles.icon} />}
                {...styles.inputRight}
              />
            )}
          </InputGroup>
          {errors?.address && (
            <Text {...styles.error}>{errors?.address.message}</Text>
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

export { ProfileScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "5vh", md: "9vh" },
    width: "100%",
    maxWidth: {
      base: "calc(100% - 2em)",
      md: "calc(100% - 35vw - 35vw + 2em + 2em)",
    },
    textAlign: "center",
    marginX: { base: "1em", md: "calc(35vw - 2em)" },
  },
  form: {
    height: "100%",
    maxHeight: "55vh",
    overflow: "scroll",
    paddingLeft: "1em",
    paddingRight: "1em",
  },
  aspect: {
    ratio: 1,
    width: { base: "40vw", md: "8vw" },
    marginX: "auto",
    cursor: "pointer",
  },
  image: {
    background: "gray.100",
    cursor: "pointer",
    boxSize: { base: "40vw", md: "8vw" },
  },
  field: {
    direction: "column",
    width: "100%",
  },
  error: {
    color: "red.500",
    marginY: "2",
    textAlign: "left",
  },
  input: {
    paddingY: "1.5em",
    errorBorderColor: "red.500",
  },
  inputRight: {
    height: "100%",
  },
  icon: {
    pointerEvents: "none",
    color: "green.400",
  },
  lastField: {
    paddingBottom: { base: "10vh", md: "13vh" },
  },
  spinner: {
    size: "sm",
    speed: "2s",
    color: "white",
  },
  next: {
    position: "absolute",
    bottom: "10vh",
    width: { base: "calc(100% - 4em)", md: "calc(100% - 35vw - 35vw + 2em)" },
    padding: "1.75em",
    borderRadius: "0.5em",
    marginX: "1em",
    iconSpacing: "3",
  },
};
