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
import { useDelay } from "../../../utils/useDelay";

const SendSignupEmail = ({ providers, setIsEmailSent }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  // Send code mutation
  const onSubmit = async ({ email }) => {
    // Loading animation
    setIsLoading(true);

    const { error } = await axios.post("/api/user/send-code", {
      email,
    });

    if (error) {
      // Set custom backend errors
      const { field, message } = error;
      setError(field, { type: "manual", message });
      setIsLoading(false);
    } else {
      // Preregistration passed
      await useDelay(300);
      setIsEmailSent(email);
    }
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
    Object.values(providers).filter(({ type }) => type !== "email");

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
              top="1"
              right="2"
            />
          </InputGroup>

          {errors.email && (
            <Text {...styles.error}>{errors.email.message}</Text>
          )}
        </Flex>

        <Button type="submit" {...styles.button}>
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
  spinner: {
    color: "gray.800",
    marginY: "auto",
  },
  error: {
    color: "red.600",
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
