import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Switch,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Form = ({ providers, setIsEmailSent, setEmail }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const { email } = values;

    // Send email await signIn(email, {...})

    setIsEmailSent(true);
    setEmail(email);
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
      <Heading {...styles.heading}>Sign in.</Heading>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <Flex {...styles.field}>
          <Input
            placeholder="Your email"
            {...styles.input}
            {...emailRegister}
          />
          {errors.email && (
            <Text {...styles.error}>{errors.email.message}</Text>
          )}
        </Flex>

        <Button type="submit" {...styles.button}>
          Send me a link
        </Button>

        <Flex {...styles.remember}>
          <Text>Remember sign in details</Text>
          <Switch {...styles.switch} />
        </Flex>
      </form>

      <Text {...styles.separator}>...or continue with</Text>

      <Flex {...styles.instructions}>
        {/* Socials */}
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
    </Flex>
  );
};

export { Form };

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
  error: {
    color: "red",
  },
  button: {
    variant: "solid",
  },
  remember: {
    direction: "row",
    justify: "space-between",
    width: "100%",
    paddingY: "3",
  },
  switch: {
    colorScheme: "green",
    defaultChecked: "true",
    size: "lg",
  },
  instructions: {
    direction: "column",
    justify: "center",
    align: "flex-start",
    marginY: "3vh",
    color: "gray.500",
  },
  separator: {
    width: "100%",
    textAlign: "center",
  },
  socials: {
    direction: "column",
    width: "100%",
  },
  social: {
    variant: "outline",
    color: "gray.600",
    width: "100%",
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
