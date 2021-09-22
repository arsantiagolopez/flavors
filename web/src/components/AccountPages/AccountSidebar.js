import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AccountSidebar = () => {
  const [accordionIndex, setAccordionIndex] = useState(null);
  const router = useRouter();
  const { path } = router?.query;

  // Keep synced with AccountPages's categories
  const categories = [
    {
      name: "Personal",
      links: [
        { name: "Profile", path: "profile" },
        // { name: "Billing & plans", path: "billing" },
      ],
    },
    {
      name: "Security",
      links: [
        // { name: "Phone & email", path: "email" },
        { name: "Change your password", path: "password" },
        // { name: "Social media accounts", path: "socials" },
      ],
    },
    {
      name: "Referrals",
      links: [
        // { name: "Referrals", path: "referrals" },
      ],
    },
    {
      name: "Documents",
      links: [
        // { name: "Account Statements", path: "statements" },
        // { name: "Tax Documents", path: "taxes" },
        { name: "Privacy Policy", path: "../policy" },
        { name: "Terms and services", path: "../terms" },
      ],
    },
    {
      name: "Preferences",
      links: [
        // { name: "Notifications", path: "notifications" },
        // { name: "Privacy", path: "privacy" },
        { name: "Delete your account", path: "delete" },
      ],
    },
  ];

  useEffect(() => {
    if (path) {
      const categoryIndex = categories.findIndex(({ links }) =>
        links.some((link) => link?.path === path)
      );
      setAccordionIndex([categoryIndex]);
    }
  }, [path]);

  return (
    <Flex {...styles.wrapper}>
      <Text {...styles.notice}>Account</Text>
      <Accordion
        index={accordionIndex}
        onChange={(index) => setAccordionIndex(index)}
        allowToggle
      >
        {categories?.map(({ name, links }, index) => {
          return (
            <AccordionItem key={index} {...styles.links}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    fontWeight={isExpanded && "bold"}
                    {...styles.button}
                  >
                    <AccordionIcon marginRight="2" />
                    <Text {...styles.name}>{name}</Text>
                  </AccordionButton>

                  <AccordionPanel {...styles.panel}>
                    <Flex direction="column">
                      {links.map(({ name: link, path: pathname }) => {
                        return (
                          <Link key={pathname} href={pathname}>
                            <Text
                              fontWeight={pathname === path && "bold"}
                              {...styles.link}
                            >
                              {link}
                            </Text>
                          </Link>
                        );
                      })}
                    </Flex>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>

      <Text {...styles.logout}>Log out</Text>
    </Flex>
  );
};

export { AccountSidebar };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    paddingX: "1em",
    paddingY: "7vh",
  },
  notice: {
    color: "gray.400",
    textTransform: "uppercase",
    fontSize: "10pt",
    letterSpacing: "widest",
    paddingY: "0.75em",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  button: {
    paddingY: "0.75em",
    paddingX: "0",
    marginLeft: "-2",
    width: "100%",
    _hover: {
      background: "none",
      fontWeight: "bold",
    },
  },
  name: {
    isTruncated: true,
  },
  panel: {
    borderLeft: "1px solid rgba(200,200,200,0.3)",
    marginLeft: "0.5",
    paddingY: "0",
  },
  link: {
    paddingY: "0.5em",
    cursor: "pointer",
    _hover: {
      fontWeight: "bold",
      letterSpacing: "tight",
    },
  },
  logout: {
    paddingY: "0.75em",
    paddingBottom: "2em",
    color: "red.800",
    cursor: "pointer",
    fontWeight: "bold",
    _hover: {
      fontWeight: "extrabold",
      letterSpacing: "tight",
    },
  },
};
