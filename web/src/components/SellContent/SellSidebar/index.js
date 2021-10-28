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
import { SellingStatusButton } from "../../SellingStatusButton";

const SellSidebar = () => {
  const [accordionIndex, setAccordionIndex] = useState(null);
  const router = useRouter();
  const { asPath } = router;

  const categories = [
    {
      name: "Seller profile",
      href: "/sell",
      links: [
        { name: "My profile", path: "/" },
        { name: "Insights", path: "insights" },
        { name: "Reactions", path: "reactions" },
        { name: "Most searched foods", path: "suggestions" },
      ],
    },
    {
      name: "My Plates",
      href: "/sell/plates",
      links: [{ name: "All listings", path: "/" }],
    },
    {
      name: "My Menus",
      href: "/sell/menus",
      links: [{ name: "All menus", path: "/" }],
    },
    {
      name: "My Subscriptions",
      href: "/sell/subscriptions",
      links: [{ name: "All subscriptions", path: "/" }],
    },
  ];

  // Scroll to top of page
  const scrollToTop = () => window.scrollTo(0, 0);

  // Scroll to top on root element of dropdown
  useEffect(() => {
    if (asPath === "/sell") scrollToTop();
  }, [asPath]);

  // Keep right accordion panel open
  useEffect(() => {
    if (asPath) {
      const categoryIndex = categories.findIndex(({ links }) =>
        links.some(({ path }) => asPath.includes(path))
      );
      setAccordionIndex([categoryIndex]);
    }
  }, [asPath]);

  return (
    <Flex {...styles.wrapper}>
      <SellingStatusButton {...styles.status} />
      <Text {...styles.notice}>Sell</Text>
      <Accordion
        index={accordionIndex}
        onChange={(index) => setAccordionIndex(index)}
        allowToggle
      >
        {categories?.map(({ name, href, links }, index) => (
          <AccordionItem key={index} {...styles.links}>
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  fontWeight={isExpanded && "bold"}
                  {...styles.button}
                >
                  <Link href={href}>
                    <>
                      <AccordionIcon marginRight="2" />
                      <Text {...styles.name}>{name}</Text>
                    </>
                  </Link>
                </AccordionButton>

                <AccordionPanel {...styles.panel}>
                  {links?.map(({ name: link, path: pathname }) => (
                    <Link
                      key={pathname}
                      href={pathname === "/" ? href : `${href}#${pathname}`}
                      shallow
                    >
                      <Text
                        fontWeight={
                          pathname === "/" && asPath === href
                            ? "bold"
                            : asPath.replace("/", "").includes(pathname)
                            ? "bold"
                            : "normal"
                        }
                        {...styles.link}
                      >
                        {link}
                      </Text>
                    </Link>
                  ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export { SellSidebar };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    paddingX: "1em",
    paddingY: "7vh",
  },
  status: {
    marginLeft: "-2",
    marginBottom: "2vh",
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
};
