import {
  AspectRatio,
  Avatar,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import { DropzoneField } from "../../../components/DropzoneField";
import { showToast } from "../../../utils/showToast";
import { LoadingScreen } from "../../LoadingScreen";
import { SelectLocation } from "../../SelectLocation";
import { UsernameCheck } from "../../UsernameCheck";

const Profile = ({ user, mutate }) => {
  const [userMounted, setUserMounted] = useState(false);
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { name, image, username, bio, address } = user || {};

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isDirty },
    control,
  } = useForm();

  // Handle update response
  const hasErrors = ({ data, status }) => {
    if (status === 200) {
      const { success, error } = data;
      if (!success) {
        const { field, message } = error;
        setError(field, { type: "manual", message });
        return true;
      }
    }
    return false;
  };

  // Handle submit
  const onSubmit = async ({ address, username, ...values }) => {
    setIsLoading(true);

    const { longitude, latitude } = address || {};

    const fields = {
      ...values,
      ...(longitude &&
        latitude && {
          address: address?.name,
          geolocation: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        }),
    };

    // Update user model (username)
    const userResponse = await axios.put("/api/user", { username });

    // Handle errors
    if (hasErrors(userResponse)) {
      return setIsLoading(false);
    }

    mutate({ ...user, username });

    // Update profile model (all other fields)
    const profileResponse = await axios.put("/api/user/profile", fields);

    // Handle errors
    if (hasErrors(profileResponse)) {
      return setIsLoading(false);
    }

    // Instantly update mutated fields for better UX
    const { profile } = profileResponse?.data;

    // update the local data immediately, but disable the revalidation
    mutate({ ...user, ...profile });

    showToast({
      status: "success",
      title: "Your profile was succesfully updated!",
    });

    return setIsLoading(false);
  };

  // Ref passed down to child Dropzone component,
  // open file dialog on parent link node click
  const dropzoneRef = useRef();

  // Open dropzone image upload dialog on ref click
  const openDropzoneFileDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.click();
    }
  };

  // Update image on mount
  useEffect(() => {
    if (user) {
      // Set flag on initial mount
      setUserMounted(true);
      // Store picture in state
      setPicture(image);
    }
  }, [user]);

  // Form field registration
  const nameRegister = register(
    "name",
    isDirty && {
      required: "Your name can't be empty.",
    }
  );

  const usernameRegister = { name: "username", control };

  const bioRegister = register("bio");

  const addressRegister = { name: "address", control };

  const dropzoneFieldProps = { user, mutate, setPicture };

  if (userMounted) {
    return (
      <Flex {...styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex {...styles.field} marginTop={{ base: "3em", md: "0" }}>
            <DropzoneField
              ref={dropzoneRef}
              {...dropzoneFieldProps}
              {...styles.label}
              {...styles.dropzone}
            >
              <AspectRatio {...styles.aspect}>
                <Avatar src={picture} name={name} {...styles.image} />
              </AspectRatio>
            </DropzoneField>

            <Flex {...styles.avatarHeading}>
              <Heading {...styles.name}>{name}</Heading>
              <Link onClick={openDropzoneFileDialog} {...styles.link}>
                <Text color="gray.400">Change your profile picture</Text>
              </Link>
            </Flex>
          </Flex>

          <Flex {...styles.field} marginTop={{ base: "3em", md: "1em" }}>
            <Text {...styles.label}>Name</Text>
            <Flex {...styles.value}>
              <Input
                defaultValue={name}
                placeholder={name ? name : "Your name"}
                {...nameRegister}
                {...styles.input}
              />
              {errors?.name ? (
                <Text {...styles.error}>{errors?.name?.message}</Text>
              ) : (
                <Text {...styles.helper}>
                  You can only change your name twice a month.
                </Text>
              )}
            </Flex>
          </Flex>

          <Flex {...styles.field}>
            <Text {...styles.label}>Username</Text>
            <Flex {...styles.value}>
              <UsernameCheck
                defaultValue={username}
                placeholder={username ? username : "Your username"}
                {...usernameRegister}
              />
              {errors?.username && (
                <Text {...styles.error}>{errors?.username?.message}</Text>
              )}
            </Flex>
          </Flex>

          <Flex {...styles.field}>
            <Text {...styles.label}>Bio</Text>
            <Flex {...styles.value}>
              <Textarea
                spellCheck="true"
                defaultValue={bio}
                placeholder={
                  bio
                    ? bio
                    : "What do you want your customers to know about you?"
                }
                {...bioRegister}
                {...styles.input}
              />
              {errors?.bio && (
                <Text {...styles.error}>{errors?.bio?.message}</Text>
              )}
            </Flex>
          </Flex>

          <Flex {...styles.field}>
            <Text {...styles.label}>Address</Text>
            <Flex {...styles.value}>
              <SelectLocation
                defaultValue={address}
                placeholder={address ? address : "Your address"}
                {...addressRegister}
              />
              {errors?.address ? (
                <Text {...styles.error}>{errors?.address?.message}</Text>
              ) : (
                <Text {...styles.helper}>
                  Select your address to show sellers near you.
                </Text>
              )}
            </Flex>
          </Flex>

          <Button
            display={isDirty ? "flex" : "none"}
            isLoading={isLoading}
            {...styles.button}
          >
            Save Changes
          </Button>
        </form>
      </Flex>
    );
  }

  // Default to loading screen
  return <LoadingScreen />;
};

export { Profile };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
  field: {
    direction: { base: "column", md: "row" },
    align: "center",
    marginTop: { base: "1vh", md: "3vh" },
  },
  label: {
    flexBasis: { base: "100%", md: "15%" },
    marginRight: { base: "0", md: "2em" },
    marginY: "0.5em",
    textAlign: { base: "left", md: "right" },
    color: "gray.400",
    alignSelf: "flex-start",
    marginTop: "0.5em",
  },
  dropzone: {
    boxSize: { base: "40vw", md: "100%" },
    alignSelf: "center",
    marginLeft: { base: "none", md: "auto" },
  },
  aspect: {
    ratio: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    background: "gray.100",
    cursor: "pointer",
  },
  value: {
    direction: "column",
    width: "100%",
  },
  input: {
    spellCheck: "false",
    _invalid: {
      borderBottom: `2px solid red`,
    },
  },
  error: {
    color: "red.500",
    marginY: "2",
  },
  avatar: {
    width: { base: "150px", md: "75px" },
    height: { base: "150px", md: "75px" },
    borderRadius: "100px",
    marginLeft: "auto",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  avatarHeading: {
    direction: "column",
    width: "100%",
    textAlign: { base: "center", md: "left" },
    marginTop: { base: "1em", md: "0" },
  },
  name: {
    textTransform: "capitalize",
    letterSpacing: "tight",
    noOfLines: 2,
  },
  link: {
    display: { base: "none", md: "block" },
  },
  helper: {
    display: { base: "none", md: "block" },
    color: "gray.400",
    fontSize: "10pt",
    marginTop: "2",
  },
  button: {
    loadingText: "Saving...",
    spinnerPlacement: "end",
    variant: "solid",
    type: "submit",
    width: { base: "100%", md: "15%" },
    paddingY: { base: "1.6em", md: "1.75em" },
    paddingX: "6em",
    borderRadius: { base: "0.5em", md: "0.6em" },
    boxShadow: "2xl",
    marginTop: { base: "7vh", md: "5vh" },
  },
};
