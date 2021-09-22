import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import axios from "../../../axios";
import { DeleteAlert } from "../../DeleteAlert";
import { ReturnHeading } from "../../ReturnHeading";

const Delete = () => {
  const router = useRouter();

  // Handle account deletion
  const onDeleteConfirm = async () => {
    const { status, data } = await axios.delete("/api/user/delete");

    if (status === 200) {
      const { success } = data;
      if (success) {
        // Redirect on account deletion
        router.push("/");
        return true;
      }
    }
    return false;
  };

  const deleteAlertProps = { onDeleteConfirm };

  return (
    <Flex {...styles.wrapper}>
      <ReturnHeading heading="Delete Your Account" />
      <Flex {...styles.content}>
        <Flex {...styles.field}>
          <Heading {...styles.heading}>What this means</Heading>
          <Text {...styles.text}>
            Request deletion of some or all of your data. Data subject to
            regulatory retention or record keeping requirements will not be
            deleted until such requirements have been met.{" "}
            <i>(copied from Coinbase)</i>
          </Text>
        </Flex>
        <Flex {...styles.field}>
          <Heading {...styles.heading}>Something else here</Heading>
          <Text {...styles.text}>blabla bla</Text>
        </Flex>
        <Flex {...styles.field}>
          <Heading {...styles.heading}>...and here</Heading>
          <Text {...styles.text}>
            You might wanna withdraw ya cash, na mean?
          </Text>
        </Flex>
        <Flex {...styles.field}>
          <Text {...styles.text}>
            Once this action is taken, it cannot be undone. Is this what your
            really want?
          </Text>
        </Flex>
        <DeleteAlert {...deleteAlertProps} />
      </Flex>
    </Flex>
  );
};

export { Delete };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    minHeight: { base: "90vh", md: "80vh" },
    marginBottom: "1em",
    width: "100%",
  },
  content: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
    paddingX: { base: "0.5em", md: "0" },
  },
  field: {
    direction: "column",
    marginY: "2vh",
    width: "100%",
  },
  heading: {
    fontSize: "2xl",
  },
  text: {
    spacing: "1rem",
    colorScheme: "gray",
    display: "inline-block",
    color: "gray.500",
    paddingTop: "1vh",
  },
};
