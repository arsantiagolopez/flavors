import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef } from "react";
import { IoMdMenu } from "react-icons/io";
import { useDelay } from "../../utils/useDelay";
import { Logo } from "../Logo";

const LandingNavigation = ({ user, isPortrait }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // onClose stops scroll, so await
  const closeDrawer = async () => {
    await useDelay(800);
    onClose();
  };

  const links = [
    {
      href: "/#howitworks",
      text: "How it works",
    },
    {
      href: "/#lastmonths",
      text: "Last months",
    },
    {
      href: "/#gettheapp",
      text: "Get the app",
    },
    {
      href: "/#tellafriend",
      text: "Tell a friend",
    },
    {
      href: "/help",
      text: "Help",
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.bar}>
        <Flex {...styles.left}>
          <Logo {...styles.logo} />
          {!isPortrait &&
            links.map(({ href, text }, index) => (
              <Link key={index} href={href}>
                <Text {...styles.link}>{text}</Text>
              </Link>
            ))}
        </Flex>

        <Flex {...styles.right}>
          {!user ? (
            <>
              <Link href="/signin">
                <Button {...styles.button} {...styles.signin}>
                  Sign in
                </Button>
              </Link>
              <Link href="/joinus">
                <Button {...styles.button} {...styles.solid}>
                  Join us
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button {...styles.button} {...styles.solid}>
                Dashboard
              </Button>
            </Link>
          )}
          {isPortrait && (
            <>
              <Button ref={btnRef} onClick={onOpen} {...styles.hamburger}>
                <Icon as={IoMdMenu} {...styles.icon} />
              </Button>
              <Drawer
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={btnRef}
                {...styles.drawer}
              >
                <DrawerContent {...styles.drawerContent}>
                  <DrawerCloseButton color="white" />
                  <DrawerHeader>
                    <Logo {...styles.logo} />
                  </DrawerHeader>

                  <DrawerBody {...styles.drawerBody}>
                    {links.map(({ href, text }, index) => (
                      <Link key={index} href={href}>
                        <Text {...styles.mobileLink} onClick={closeDrawer}>
                          {text}
                        </Text>
                      </Link>
                    ))}
                  </DrawerBody>

                  <DrawerFooter {...styles.drawerFooter}>
                    <Logo
                      {...styles.logo}
                      fontSize="18pt"
                      letterSpacing="tighter"
                    />
                    <Text {...styles.disclaimer}>All rights reserved 2021</Text>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export { LandingNavigation };

// Styles

const styles = {
  wrapper: {
    zIndex: "500",
    position: "sticky",
    top: "0",
    height: "3em",
    width: "100%",
    justify: "center",
    align: "center",
    paddingX: { base: "1em", md: "10vw" },
    background: "rgba(0,0,10, 0.8)",
    backdropFilter: "blur(10px)",
  },
  bar: {
    width: { base: "100%", md: "auto" },
    justify: "center",
    align: "center",
  },
  left: {
    align: "center",
    width: "100%",
  },
  logo: {
    marginLeft: { base: "0", md: "-1em" },
    marginRight: "1em",
    color: "white",
    fontSize: "18pt",
  },
  link: {
    isTruncated: true,
    color: "white",
    fontSize: "11pt",
    paddingX: "1vw",
    cursor: "pointer",
  },
  right: {
    align: "center",
    height: "100%",
    marginLeft: "1em",
  },
  button: {
    borderRadius: "2em",
    fontWeight: "normal",
    size: "sm",
    fontSize: "11pt",
  },
  signin: {
    variant: "link",
    color: "white",
    marginRight: "2",
    padding: "2",
  },
  solid: {
    background: "white",
    color: "gray.700",
    paddingY: 0,
    fontWeight: "500",
    fontSize: "10pt",
  },
  hamburger: {
    variant: "unstyled",
    padding: 0,
    width: "3em",
    marginRight: "-2",
    marginLeft: "2",
  },
  drawer: {
    placement: "top",
    size: "full",
  },
  icon: {
    color: "white",
    height: "100%",
    width: "1.5em",
  },
  drawerContent: {
    background: "rgba(0,0,10, 0.8)",
    backdropFilter: "blur(10px)",
  },
  drawerBody: {
    marginTop: "10vh",
  },
  mobileLink: {
    fontSize: "2rem",
    fontWeight: "bold",
    letterSpacing: "tighter",
    color: "white",
    paddingY: "2",
  },
  drawerFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    width: "100%",
    marginY: "3vh",
  },
  disclaimer: {
    fontSize: "10pt",
    color: "gray.400",
  },
};
