import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { CompleteSignup } from "./CompleteSignup";
import { SendSignupEmail } from "./SendSignupEmail";

const Form = ({ providers, setIsSignupSuccessful }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendSignupEmailProps = {
    providers,
    setIsEmailSent,
  };

  const completeSignupProps = {
    isEmailSent,
    setIsEmailSent,
    setIsSignupSuccessful,
  };

  return (
    <Flex {...styles.wrapper}>
      {!isEmailSent ? (
        <SendSignupEmail {...sendSignupEmailProps} />
      ) : (
        <CompleteSignup {...completeSignupProps} />
      )}
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
};
