import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { SiMinutemailer } from "react-icons/si";

const EmailSent = ({ setIsEmailSent, email }) => (
  <Flex {...styles.wrapper}>
    <Icon as={SiMinutemailer} {...styles.icon} />
    {/**
     * @todo: Check on backend if email exists, if it doesnt, redirect or ask user to register.
     * DONT send email as its expensive.
     */}

    <Heading>Check your inbox!</Heading>

    <Flex {...styles.text}>
      <Text>We've sent a sign in link to {email} </Text>
      <Text>
        Can't find it? Try your <b>spam folder.</b>
      </Text>
    </Flex>

    <Flex {...styles.links}>
      <Button onClick={() => setIsEmailSent(false)} {...styles.link}>
        It's not there. Send me another one.
      </Button>
      <Button onClick={() => setIsEmailSent(false)} {...styles.link}>
        Go back
      </Button>
    </Flex>
  </Flex>
);

export { EmailSent };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    justify: "center",
    align: "center",
    width: "100%",
    textAlign: "center",
    lineHeight: "1.5em",
    marginBottom: "5em",
  },
  icon: {
    fontSize: "5em",
    color: "gray.200",
    marginY: "3",
  },
  text: {
    direction: "column",
    paddingY: "1vh",
  },
  links: {
    direction: "column",
    paddingY: "1vh",
  },
  link: {
    variant: "link",
    paddingY: "1",
  },
};
