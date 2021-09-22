import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { ReturnHeading } from "../../../components/ReturnHeading";
import { HasPassword } from "./HasPassword";
import { NoPassword } from "./NoPassword";

const Password = ({ user, mutate }) => {
  const { hasPassword } = user || {};

  const passwordProps = { user, mutate };

  return (
    <Flex {...styles.wrapper}>
      <ReturnHeading heading="Change Your Password" />

      {user ? (
        <>
          {hasPassword ? (
            <HasPassword {...passwordProps} />
          ) : (
            <NoPassword {...passwordProps} />
          )}
        </>
      ) : (
        <Spinner {...styles.spinner} />
      )}
    </Flex>
  );
};

export { Password };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    minHeight: { base: "90vh", md: "80vh" },
    marginBottom: "1em",
    width: "100%",
  },
  spinner: {
    alignSelf: "center",
    marginTop: "15vh",
    color: "gray.800",
    size: "xl",
    thickness: "5px",
  },
};
