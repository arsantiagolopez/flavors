import { Button, Flex } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "../axios";

const TestPage = () => {
  const [test, setTest] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    // create temp

    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_CLIENT_URL
      }/api/auth/callback/email?email=${encodeURIComponent(
        email
      )}&token=${code}`
    );

    return console.log("response", response);

    // let email = "test@test.com";

    // Sign user in & create account
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
        // handleError("email", "Email is already in use. Try a different one.");
        return console.log(
          "ERROR: ",
          "Email is already in use. Try a different one."
        );
      }

      // Is error 2
      else {
        // handleError(
        //   "code",
        //   "You've sent too many emails. Please try again tomorrow."
        // );
        return console.log(
          "ERROR: ",
          "You've sent too many emails. Please try again tomorrow."
        );
      }
    }

    return;

    // console.log("****TEST: ", test);

    // const params = {
    //   email,
    //   code,
    //   firstName: "Test",
    //   lastName: "Rodgers",
    //   password: "test",
    // };

    // // create account
    // await axios.post("/api/user/signup", { ...params });

    console.log("made it till the end?");

    // router.push(
    //   `${
    //     process.env.NEXT_PUBLIC_CLIENT_URL
    //   }/api/auth/callback/email?email=${encodeURIComponent(
    //     email
    //   )}&token=${code}`
    // );
  };

  return (
    <Flex {...styles.wrapper}>
      {test ?? null}

      <Button onClick={handleSignup}>Sign up</Button>
    </Flex>
  );
};

export default TestPage;

// Styles

const styles = {
  wrapper: {},
};
