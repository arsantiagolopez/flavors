import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import useSWR from "swr";
// import axios from "../../../axios";

const Socials = () => {
  const [accounts, setAccounts] = useState(null);
  const { data } = useSWR("/api/user/accounts");

  const router = useRouter();

  // Get user to authenticate & connect account
  const handleAuthentication = async (id) => {
    signIn(id, {
      callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/account/socials`,
    });

    // const { data } = await axios.post(`/api/auth/authenticate/${id}`);

    console.log(data);
  };

  // Fetch providers
  useEffect(async () => {
    if (data) {
      // Providers offered by Flavors
      const providers = await getProviders();

      // Reduce items into new object of only oauth providers
      const socialProviders = Object.keys(providers).reduce((newObj, key) => {
        if (providers[key].type === "oauth") {
          return { ...newObj, [key]: providers[key] };
        }
      }, {});

      // Accounts user has connected
      const { accounts } = data;

      // Update providers with connected accounts
      Object.keys(socialProviders).map((key) =>
        accounts.includes(key)
          ? (providers[key].isConnected = true)
          : (providers[key].isConnected = false)
      );

      setAccounts(socialProviders);
    }
  }, [data]);

  return (
    <Flex {...styles.wrapper}>
      <Text {...styles.subHeader}>
        Connected social media accounts allow you to one-click sign in from
        them.
      </Text>

      <Flex {...styles.socials}>
        {accounts &&
          Object.values(accounts).map(({ id, name, isConnected }) => (
            <Button
              key={id}
              onClick={!isConnected ? () => handleAuthentication(id) : null}
              // onClick={() => handleAuthentication(id)}
              {...styles.social}
            >
              <Flex
                color={isConnected ? "gray.800" : "gray.300"}
                {...styles.left}
              >
                <Icon
                  as={
                    id === "google"
                      ? FaGoogle
                      : id === "facebook"
                      ? FaFacebookF
                      : null
                  }
                  color={isConnected ? "gray.800" : "gray.300"}
                  {...styles.icon}
                />
                {name}
              </Flex>

              <Flex
                color={isConnected ? "gray.800" : "gray.300"}
                {...styles.actions}
              >
                {isConnected ? (
                  <Text {...styles.connected}>Connected</Text>
                ) : (
                  <Text {...styles.connect}>Connect</Text>
                )}
              </Flex>
            </Button>
          ))}
      </Flex>
    </Flex>
  );
};

export { Socials };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "2em", md: "5vh" },
  },
  subHeader: {
    paddingX: { base: "0.5em", md: "0" },
  },
  socials: {
    direction: "column",
    width: "100%",
    overflowY: "scroll",
    maxHeight: "60vh",
    paddingY: "2vh",
  },
  social: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    variant: "ghost",
    fontWeight: "normal",
    borderBottom: "0.5px solid rgba(150,150,150,0.1)",
    paddingY: { base: "2.5em", md: "5vh" },
    paddingX: { base: "1em", md: "2vw" },
    _hover: {
      background: "gray.100",
    },
  },
  icon: {
    marginRight: { base: "3", md: "1vw" },
    boxSize: "1.5em",
  },
  left: {
    direction: "row",
    align: "center",
    textAlign: "left",
  },
  actions: {
    direction: "row",
    align: "center",
  },
  connected: {
    letterSpacing: "tight",
    fontWeight: "semibold",
  },
  connect: {},
};
