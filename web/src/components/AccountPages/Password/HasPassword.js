import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import { showToast } from "../../../utils/showToast";

const HasPassword = ({ user, mutate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors, isDirty },
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

  const onSubmit = async ({ oldPassword, newPassword }) => {
    setIsLoading(true);
    const response = await axios.put("/api/user/change-password", {
      oldPassword,
      newPassword,
    });

    // Handle errors
    if (hasErrors(response)) {
      return setIsLoading(false);
    }

    const { success } = response?.data;

    if (success) {
      // Update UI
      mutate({ ...user, hasPassword: true });
      showToast({
        status: "success",
        title: "Your password was updated.",
      });
    } else {
      showToast({
        status: "error",
        title: "Something went wrong. Please try again later.",
      });
    }
    setIsLoading(false);
  };

  const oldPasswordRegister = register("oldPassword", {
    required: "Please enter your current password.",
  });

  const newPasswordRegister = register("newPassword", {
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

  const confirmNewPasswordRegister = register("confirmNewPassword", {
    required: "Please re-enter your password.",
    validate: (value) =>
      // Password matching validation
      value === watch("newPassword") || "Passwords must match.",
  });

  return (
    <Flex {...styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} styles={styles.form}>
        <Flex {...styles.field}>
          <Input
            type="password"
            placeholder="Current password"
            {...styles.input}
            {...oldPasswordRegister}
          />
          {errors.oldPassword && (
            <Text {...styles.error}>{errors.oldPassword.message}</Text>
          )}
        </Flex>
        <Flex {...styles.field}>
          <Input
            type="password"
            placeholder="New password"
            {...styles.input}
            {...newPasswordRegister}
          />
          {errors.newPassword && (
            <Text {...styles.error}>{errors.newPassword.message}</Text>
          )}
        </Flex>
        <Flex {...styles.field}>
          <Input
            type="password"
            placeholder="Confirm new password"
            {...styles.input}
            {...confirmNewPasswordRegister}
          />
          {errors.confirmNewPassword && (
            <Text {...styles.error}>{errors.confirmNewPassword.message}</Text>
          )}
        </Flex>
        <Button
          display={isDirty ? "flex" : "none"}
          isLoading={isLoading}
          {...styles.button}
        >
          Update password
        </Button>
      </form>
    </Flex>
  );
};

export { HasPassword };

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
    width: "100%",
  },
  text: {
    spacing: "1rem",
    colorScheme: "gray",
    display: "inline-block",
    color: "gray.500",
    paddingTop: "1vh",
  },
  input: {
    paddingY: "1.5em",
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
    position: "fixed",
    width: { base: "calc(100% - 4em)", md: "15%" },
    bottom: { base: "10%", md: "20%" },
    paddingY: { base: "1.5em", md: "1.75em" },
    paddingX: "5em",
    borderRadius: { base: "0.5em", md: "0.75em" },
    boxShadow: "2xl",
    left: "50%",
    transform: "translateX(-50%)",
  },
};
