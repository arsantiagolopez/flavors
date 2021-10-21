import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import { showToast } from "../../../utils/showToast";

const NoPassword = ({ user, mutate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmit = async ({ password }) => {
    setIsLoading(true);

    const { status, data } = await axios.put("/api/user", { password });

    if (status !== 200) return;
    const { success } = data;

    if (success) {
      // Update UI
      mutate({ ...user, hasPassword: true });
      showToast({
        status: "success",
        title: "Your new password was added.",
      });
    } else {
      showToast({
        status: "error",
        title: "Something went wrong. Please try again later.",
      });
    }

    setIsLoading(false);
  };

  const passwordRegister = register("password", {
    required: "What's a good password?",
    minLength: {
      value: 5,
      message: "Your password can't be shorter than 5 characters.",
    },
    maxLength: {
      value: 50,
      message: "Your password's too long. Try less than 50 characters.",
    },
    /**
     * @todo: Decide on password validation.
     */
  });

  const confirmPasswordRegister = register("confirmPassword", {
    required: "Please re-enter your password.",
    validate: (value) =>
      // Password matching validation
      value === watch("password") || "Passwords must match.",
  });

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.field}>
        <Heading {...styles.heading}>Add a password</Heading>
        <Text {...styles.text}>
          You haven't added a password yet. You'll need one to complete your
          account and make moves.
        </Text>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)} styles={styles.form}>
        <Flex {...styles.field}>
          <Input
            type="password"
            placeholder="New password"
            {...passwordRegister}
          />
          {errors.password && (
            <Text {...styles.error}>{errors.password.message}</Text>
          )}
        </Flex>
        <Flex {...styles.field}>
          <Input
            type="password"
            placeholder="Confirm your password"
            {...confirmPasswordRegister}
          />
          {errors.confirmPassword && (
            <Text {...styles.error}>{errors.confirmPassword.message}</Text>
          )}
        </Flex>
        <Button
          display={isDirty ? "flex" : "none"}
          isLoading={isLoading}
          {...styles.button}
        >
          Create password
        </Button>
      </form>
    </Flex>
  );
};

export { NoPassword };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
  form: {
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  field: {
    direction: "column",
    marginY: "2vh",
  },
  heading: {
    size: "lg",
  },
  text: {
    spacing: "1rem",
    colorScheme: "gray",
    display: "inline-block",
    color: "gray.500",
    paddingTop: "1vh",
  },
  error: {
    color: "red.600",
    paddingTop: "1vh",
  },
  button: {
    loadingText: "Saving...",
    spinnerPlacement: "end",
    variant: "solid",
    type: "submit",
    position: "absolute",
    bottom: { base: "10%", md: "20%" },
    width: { base: "calc(100% - 1em)", md: "15%" },
    paddingY: { base: "1.6em", md: "1.75em" },
    paddingX: "6em",
    borderRadius: { base: "0.5em", md: "0.6em" },
    boxShadow: "2xl",
  },
};
