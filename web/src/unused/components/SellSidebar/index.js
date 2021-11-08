import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoRemove } from "react-icons/io5";
import { SellingStatusButton } from "../../SellingStatusButton";

const SellSidebar = () => {
  const [accordionIndex, setAccordionIndex] = useState(null);
  const router = useRouter();
  const { asPath, query } = router;

  const categories = [
    {
      name: "Seller profile",
      href: "profile",
      links: [
        { name: "My profile", path: "" },
        { name: "Insights", path: "insights" },
        { name: "Reactions", path: "reactions" },
        { name: "Most searched foods", path: "suggestions" },
      ],
    },
    {
      name: "Menus",
      href: "menus",
    },
    {
      name: "Listings",
      href: "listings",
    },
    // {
    //   name: "Subscriptions",
    //   href: "subscriptions",
    // },
    {
      name: "Promotions",
      href: "promotions",
    },
  ];

  // Scroll to top of page
  const scrollToTop = () => window.scrollTo(0, 0);

  // Scroll to last item & exclude footer
  const scrollToBottom = () => {
    const bottom = document.body.scrollHeight;
    window.scrollTo({ top: bottom, behavior: "smooth" });
  };

  // Keep right accordion panel open
  useEffect(() => {
    if (query?.path) {
      const category = categories.find(({ href }) =>
        query?.path.includes(href)
      );
      setAccordionIndex([categories.indexOf(category)]);
    } else {
      setAccordionIndex([0]);
    }
  }, [query]);

  // Scroll to top or bottom based on active link
  useEffect(() => {
    // Get active category
    let category = categories.find(({ href }) => query?.path?.includes(href));
    if (typeof category === "undefined") category = categories[0];

    const { links } = category;

    // Scroll to top on first item of links
    if (!asPath.includes("#")) return scrollToTop();

    // Scroll to bottom on last item of links
    const lastItem = links[links?.length - 1];
    if (asPath.includes(lastItem?.path)) return scrollToBottom();
  }, [router]);

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
                  {links ? (
                    <AccordionIcon marginRight="2" />
                  ) : (
                    <Icon as={IoRemove} marginRight="2" />
                  )}

                  <Link href={`/sell/${href}`} shallow>
                    <Text {...styles.name}>{name}</Text>
                  </Link>
                </AccordionButton>

                <AccordionPanel {...styles.panel}>
                  {links?.map(({ name: link, path: pathname }) => {
                    const path = href === "" ? "/sell" : `/sell/${href}`;
                    const param = pathname === "" ? "" : `#${pathname}`;
                    const linkHref = path + param;

                    return (
                      <Link key={pathname} href={linkHref} shallow>
                        <Text
                          fontWeight={
                            pathname === "" && asPath === href
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
                    );
                  })}
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
