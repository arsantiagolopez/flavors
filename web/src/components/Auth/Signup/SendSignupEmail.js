import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import axios from "../../../axios";

const SendSignupEmail = ({ providers, setIsEmailSent }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  // Set form error
  const handleError = ({ field, message }) =>
    setError(field, { type: "manual", message });

  // Send code mutation
  const onSubmit = async ({ email }) => {
    // Loading animation
    setIsLoading(true);

    const { error } = await signIn("emailCode", { email, redirect: false });

    if (error) {
      // NextAuth doesn't allow sending back custom errors.
      // Handle here: 2 possible errors.
      // Error 1: Email already in use.
      // Error 2: Reached the daily limit of emails.

      // Check if email available
      const { data } = await axios.get("/api/user/email", {
        params: { email },
      });

      // Is error 1
      if (!data?.success || !data?.available) {
        handleError({
          field: email,
          message: "Email is already in use. Try a different one.",
        });
      }

      // Is error 2
      else {
        handleError({
          field: "code",
          message: "You've sent too many emails. Please try again tomorrow.",
        });
      }
    } else {
      // Pre-registration passed
      setIsEmailSent(email);
    }
    setIsLoading(false);
  };

  // Form field registration
  const emailRegister = register("email", {
    required: "What's your email?",
    pattern: {
      // Minimal email validation
      value: /\S+@\S+\.\S+/,
      message: "Please input a valid email address",
    },
  });

  const socialProviders =
    providers &&
    Object.values(providers).filter(({ type }) => type === "oauth");

  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading}>Enter your email to join us.</Heading>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <Flex {...styles.field}>
          <InputGroup>
            <Input
              placeholder="Your email"
              {...styles.input}
              {...emailRegister}
            />
            <InputRightElement
              children={<Spinner {...styles.spinner} />}
              display={isLoading ? "flex" : "none"}
              {...styles.rightElement}
            />
          </InputGroup>

          {errors.email && (
            <Text {...styles.error}>{errors.email.message}</Text>
          )}
        </Flex>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Sending..."
          spinnerPlacement="end"
          {...styles.button}
        >
          Next
        </Button>
      </form>

      <Text {...styles.separator}>...or continue with</Text>

      <Flex {...styles.socials}>
        {providers &&
          Object.values(socialProviders).map(({ id, name }, index) => (
            <Button
              key={id}
              {...styles.social}
              onClick={() =>
                signIn(id, {
                  callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard`,
                })
              }
              marginBottom={
                Object.values(socialProviders).length - 1 !== index && "2vh"
              }
            >
              <Icon
                as={
                  id === "google"
                    ? FaGoogle
                    : id === "facebook"
                    ? FaFacebookF
                    : null
                }
                {...styles.icon}
              />{" "}
              {name}
            </Button>
          ))}
      </Flex>

      <Text {...styles.policy}>
        By continuing, I agree to Flavors' <u>Privacy Policy</u> and{" "}
        <u>Terms of Use.</u>
      </Text>
    </Flex>
  );
};

export { SendSignupEmail };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
  },
  heading: {
    paddingY: "0.5vh",
  },
  form: {
    width: "100%",
  },
  field: {
    direction: "column",
    marginY: "2vh",
  },
  input: {
    paddingY: "1.5em",
  },
  rightElement: {
    top: "1",
    right: "2",
  },
  spinner: {
    color: "gray.800",
    marginY: "auto",
  },
  error: {
    color: "red.500",
    paddingTop: "1vh",
    lineHeight: { base: "1.25em", md: "1.5em" },
  },
  button: {
    variant: "solid",
  },
  separator: {
    textAlign: "center",
    marginY: "3vh",
  },
  socials: {
    direction: "column",
    width: "100%",
  },
  social: {
    variant: "outline",
    marginBottom: "2vh",
    _hover: {
      background: "gray.100",
    },
  },
  icon: {
    color: "gray.600",
    marginRight: "3",
  },
  policy: {
    display: "inline-block",
    direction: "column",
    justify: "center",
    align: "flex-start",
    color: "gray.500",
    marginY: "3vh",
  },
};
