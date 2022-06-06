import { Avatar, Button, Flex, Icon } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoBuildOutline, IoCartOutline } from "react-icons/io5";

const ProfileAvatar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { image } = user || {};

  const panelRef = useRef(null);

  const handleBlur = (event) => {
    const { relatedTarget: clickedNode } = event;

    // If clicked outside panel
    if (!panelRef.current.contains(clickedNode)) {
      setIsOpen(false);
    }
  };

  return (
    <Flex {...styles.popover}>
      <Flex
        {...styles.popoverTrigger}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
        tabIndex="1"
      >
        <Avatar src={image} {...styles.avatar} />
      </Flex>

      <Flex
        ref={panelRef}
        {...styles.content}
        display={isOpen ? "block" : "none"}
        onClick={() => setIsOpen(false)}
      >
        <Flex {...styles.navButtons}>
          {/* <Link href="/profile">
            <a>
              <Flex {...styles.link} >
                <Icon as={IoPersonCircleOutline} {...styles.icon} />
                Profile
              </Flex>
            </a>
          </Link> */}
          <Link href="/account">
            <a>
              <Flex {...styles.link}>
                <Icon as={IoBuildOutline} {...styles.icon} />
                Account
              </Flex>
            </a>
          </Link>
          <Link href="/cart">
            <a>
              <Flex {...styles.link}>
                <Icon as={IoCartOutline} {...styles.icon} />
                Cart
              </Flex>
            </a>
          </Link>
        </Flex>

        <Button onClick={() => signOut()} {...styles.logout}>
          Log out
        </Button>
      </Flex>
    </Flex>
  );
};

export { ProfileAvatar };

// Styles

const styles = {
  popover: {
    position: "relative",
    align: "center",
    justify: "center",
  },
  popoverTrigger: {
    cursor: "pointer",
    margin: "0",
  },
  content: {
    position: "absolute",
    right: "2",
    top: "2.5em",
    width: "10em",
    bg: "white",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    borderRadius: "0.5em",
    padding: "2",
  },
  avatar: {
    size: "sm",
    cursor: "pointer",
  },
  link: {
    width: "100%",
    align: "center",
    marginY: "1",
  },
  icon: {
    marginRight: "2",
  },
  navButtons: {
    direction: "column",
  },
  logout: {
    width: "100%",
    fontWeight: "normal",
    size: "sm",
    cursor: "pointer",
    variant: "link",
    marginTop: "1",
    padding: "2",
    borderTop: "1px solid rgba(200,200,200,0.3)",
    borderRadius: "0",
  },
};
