import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdRefresh } from "react-icons/io";
import axios from "../../../axios";
import { useDelay } from "../../../utils/useDelay";

const CompleteSignup = ({
  isEmailSent,
  setIsEmailSent,
  setIsSignupSuccessful,
}) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const email = isEmailSent;

  const onSubmit = async ({ terms, ...otherValues }) => {
    const { error } = await axios.post("/api/user/signup", {
      email,
      ...otherValues,
    });

    if (error) {
      // Set custom backend errors
      const { field, message } = error;
      setError(field, { type: "manual", message });
    } else {
      // Successful registration
      await useDelay(300);
      setIsSignupSuccessful(true);
    }
  };

  // Form field registration
  const codeRegister = register("code", {
    required: "Can't find it? Check your spam folder",
  });

  const firstNameRegister = register("firstName", {
    required: "This field's required.",
  });

  const lastNameRegister = register("lastName", {
    required: "This field's required.",
  });

  const passwordRegister = register("password", {
    required: "What's a good password?",
  });

  const termsRegister = register("terms", {
    required: true,
  });

  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.heading}>Let's confirm your email.</Heading>

      <Text {...styles.emailConfirmation}>
        We've sent a code to {email}.{" "}
        <u onClick={() => setIsEmailSent(false)} style={{ cursor: "pointer" }}>
          Edit
        </u>
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <Flex {...styles.field}>
          <InputGroup>
            <Input
              placeholder="What's the code?"
              {...styles.input}
              {...codeRegister}
            />
            <InputRightElement
              children={
                <Button {...styles.icon}>
                  <Icon as={IoMdRefresh} />
                </Button>
              }
            />
          </InputGroup>
          {errors.code && <Text {...styles.error}>{errors.code.message}</Text>}
        </Flex>

        <Flex {...styles.names}>
          <Flex {...styles.field} marginY="0">
            <Input
              placeholder="First name"
              {...styles.input}
              {...firstNameRegister}
            />
            {errors.firstName && (
              <Text {...styles.error}>{errors.firstName.message}</Text>
            )}
          </Flex>

          <Flex
            {...styles.field}
            marginLeft={{ base: "1em", md: "1vw" }}
            marginY="0"
          >
            <Input
              placeholder="Last name"
              {...styles.input}
              {...lastNameRegister}
            />
            {errors.lastName && (
              <Text {...styles.error}>{errors.lastName.message}</Text>
            )}
          </Flex>
        </Flex>

        <Flex {...styles.field} marginBottom="0">
          <Input
            type="password"
            placeholder="Password"
            {...styles.input}
            {...passwordRegister}
          />
          {errors.password && (
            <Text {...styles.error}>{errors.password.message}</Text>
          )}

          <Text {...styles.policy} paddingTop="1vh">
            You'll sign in with the email you entered, and sometimes, this
            password.
          </Text>
        </Flex>

        <Flex {...styles.checkboxes}>
          <Checkbox
            {...styles.policy}
            {...termsRegister}
            isInvalid={errors.terms}
            _invalid={{ color: "red.600" }}
          >
            By continuing, I agree to Flavors' <u>Privacy Policy</u> and{" "}
            <u>Terms of Use.</u>
          </Checkbox>
        </Flex>

        <Button type="submit" {...styles.button}>
          Create account
        </Button>
      </form>
    </Flex>
  );
};

export { CompleteSignup };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
  },
  heading: {
    paddingY: "0.5vh",
  },
  emailConfirmation: {
    color: "gray.500",
    paddingY: "1vh",
  },
  form: {},
  field: {
    direction: "column",
    marginY: "2vh",
    width: "100%",
  },
  input: {
    paddingY: "1.5em",
  },
  icon: {
    variant: "ghost",
    color: "gray.200",
    fontSize: "1.25em",
    marginTop: "2",
    marginRight: "2",
  },
  error: {
    color: "red.500",
  },
  names: {
    direction: "row",
    marginY: "2vh",
  },
  button: {
    variant: "solid",
  },
  checkboxes: {
    direction: "column",
    justify: "center",
    align: "flex-start",
    paddingY: "3vh",
  },
  policy: {
    spacing: "1rem",
    colorScheme: "gray",
    display: "inline-block",
    color: "gray.500",
  },
};
