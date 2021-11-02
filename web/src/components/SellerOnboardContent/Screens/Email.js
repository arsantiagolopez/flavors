import { Button, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { SiMinutemailer } from "react-icons/si";

// Screen index: possible 1 or null

const EmailScreen = ({ handleChange, setFormCompleteIndex }) => {
  // Unlock & swipe to next screen
  const handleNext = () => {
    setFormCompleteIndex(2);
    handleChange(1);
  };

  return (
    <Flex {...styles.wrapper}>
      <Icon as={SiMinutemailer} {...styles.icon} />
      <Heading {...styles.heading}>
        We've sent you a confirmation e-mail.
      </Heading>
      <Text {...styles.text}>
        Click the link inside to verify your account.
      </Text>

      <Flex {...styles.actions}>
        <Button
          onClick={handleNext}
          {...styles.next}
          // isLoading={fetching}
          loadingText="Checking"
          // onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
        >
          Check confirmation status
        </Button>
        <Link {...styles.link}>Re-send email</Link>
      </Flex>
    </Flex>
  );
};

export { EmailScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    align: "center",
    paddingTop: { base: "7vh", md: "12vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  icon: {
    fontSize: "5em",
    color: "gray.200",
  },
  heading: {
    lineHeight: "1em",
    marginY: "2vh",
  },
  text: {},
  actions: {
    direction: "column",
    justify: "center",
    align: "center",
    position: "absolute",
    bottom: "8vh",
    width: { base: "calc(100% - 4em)", md: "calc(100% - 35vw - 35vw)" },
  },
  next: {
    padding: "1.75em",
    borderRadius: "0.5em",
    iconSpacing: "3",
    marginBottom: "2vh",
  },
  link: {
    color: "gray.600",
  },
};
