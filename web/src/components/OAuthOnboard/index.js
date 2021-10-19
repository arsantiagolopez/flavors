import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { useDimensions } from "../../utils/useDimensions";
import { LoadingScreen } from "../LoadingScreen";

const OAuthOnboard = ({ user }) => {
  const [screenHeight, setScreenHeight] = useState(null);

  const { email, name, firstName, lastName, hasPassword } = user || {};

  const router = useRouter();

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const { height } = useDimensions();

  const firstOrLastNameMissing = !firstName || !lastName;
  const someFieldNeeded =
    (user && !email) || firstOrLastNameMissing || !hasPassword;

  // Predict first or last name
  const predictName = (type) => {
    if (!name) return null;

    let [first, ...last] = name.split(" ");
    last = last.join(" ");

    if (type === "first") return first;
    else return last;
  };

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

  const onSubmit = async ({ email, firstName, lastName, password }) => {
    // Update user
    if (email || password) {
      const response = await axios.put("/api/user", { email, password });
      console.log(response);
      if (hasErrors(response)) return;
    }
    // Update profile
    if (firstName || lastName) {
      const name = `${firstName} ${lastName}`;
      const response = await axios.put("/api/user/profile", {
        name,
        firstName,
        lastName,
      });

      if (hasErrors(response)) return;
    }
    // Redirect on success
    router.push("/");
  };

  // Update height post SSR fetch to allow
  // height CSS to work on mount
  useEffect(() => setScreenHeight(height), [height]);

  const emailRegister =
    user &&
    !email &&
    register("email", {
      required: "What's a good email?",
    });

  const firstNameRegister =
    user &&
    firstOrLastNameMissing &&
    register("firstName", {
      required: "This field's required.",
    });

  const lastNameRegister =
    user &&
    firstOrLastNameMissing &&
    register("lastName", {
      required: "This field's required.",
    });

  const passwordRegister =
    user &&
    !hasPassword &&
    register("password", {
      required: "What's a good password?",
    });

  // Redirect if
  useEffect(() => {
    if (!someFieldNeeded) {
      router.push("/");
    }
  }, [user]);

  if (someFieldNeeded) {
    return (
      <Flex {...styles.wrapper} minHeight={screenHeight}>
        <Flex {...styles.content}>
          <Heading {...styles.heading}>Almost there...</Heading>
          <Text {...styles.description}>One last thing.</Text>

          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            {!email && (
              <Flex {...styles.field}>
                <Input
                  placeholder="Email"
                  {...styles.input}
                  {...emailRegister}
                />
                {errors.email && (
                  <Text {...styles.error}>{errors.email.message}</Text>
                )}
                <Text {...styles.text}>
                  We need a way for you to recover your account.
                </Text>
              </Flex>
            )}

            {firstOrLastNameMissing && (
              <Flex {...styles.names}>
                <Flex {...styles.field} marginY="0">
                  <Input
                    placeholder="First name"
                    defaultValue={firstName || predictName("first")}
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
                    defaultValue={lastName || predictName("last")}
                    {...styles.input}
                    {...lastNameRegister}
                  />
                  {errors.lastName && (
                    <Text {...styles.error}>{errors.lastName.message}</Text>
                  )}
                </Flex>
              </Flex>
            )}

            {!hasPassword && (
              <Flex {...styles.field}>
                <Input
                  type="password"
                  placeholder="Password"
                  {...styles.input}
                  {...passwordRegister}
                />
                {errors.password ? (
                  <Text {...styles.error}>{errors.password.message}</Text>
                ) : (
                  <Text {...styles.text}>
                    You'll need this to authenticate at times.
                  </Text>
                )}
              </Flex>
            )}

            <Button type="submit" {...styles.button}>
              Alright, I'm good
            </Button>
          </form>
        </Flex>
      </Flex>
    );
  }

  // Default to loading screen
  return <LoadingScreen />;
};

export { OAuthOnboard };

// Styles

const styles = {
  wrapper: {
    width: "100%",
    justify: "center",
    align: "center",
  },
  content: {
    direction: "column",
    width: { base: "100%", md: "32em" },
    paddingX: { base: "2em", md: "0" },
  },
  heading: {
    paddingY: "0.5vh",
  },
  description: {
    color: "gray.500",
    paddingY: "1vh",
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
  names: {
    direction: "row",
    marginY: "2vh",
  },
  input: {
    paddingY: "1.5em",
  },
  error: {
    color: "red.600",
    paddingTop: "1vh",
  },
  text: {
    spacing: "1rem",
    colorScheme: "gray",
    display: "inline-block",
    color: "gray.500",
    paddingTop: "1vh",
  },
  button: {
    variant: "solid",
    marginY: "2vh",
  },
};
