import { Spinner } from "@chakra-ui/react";
import React from "react";
import { HasPassword } from "./HasPassword";
import { NoPassword } from "./NoPassword";

const Password = ({ user, mutate }) => {
  const { hasPassword } = user || {};

  const passwordProps = { user, mutate };

  if (!user) {
    return <Spinner {...styles.spinner} />;
  }

  return (
    <>
      {hasPassword ? (
        <HasPassword {...passwordProps} />
      ) : (
        <NoPassword {...passwordProps} />
      )}
    </>
  );
};

export { Password };

// Styles

const styles = {
  spinner: {
    alignSelf: "center",
    marginTop: "15vh",
    color: "gray.800",
    size: "xl",
    thickness: "5px",
  },
};
