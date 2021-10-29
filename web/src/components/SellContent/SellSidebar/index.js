import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoRemove } from "react-icons/io5";
import { SellingStatusButton } from "../../SellingStatusButton";

const SellSidebar = () => {
  const [listIndex, setListIndex] = useState(null);
  const router = useRouter();
  const { asPath, query } = router;

  const categories = [
    {
      name: "Orders",
      href: "/sell/orders",
    },
    {
      name: "Menus",
      href: "/sell/menus",
    },
    {
      name: "Listings",
      href: "/sell/listings",
    },
    {
      name: "Promotions",
      href: "/sell/promotions",
    },
    {
      name: "Seller profile",
      href: "/sell/profile",
    },
  ];

  // Scroll to top of page
  const scrollToTop = () => window.scrollTo(0, 0);

  // Keep right accordion panel open
  useEffect(() => {
    if (asPath) {
      const categoryIndex = categories.findIndex(({ href }) => asPath === href);
      console.log(categoryIndex);
      setListIndex(categoryIndex);
    }
  }, [asPath]);

  return (
    <Flex {...styles.wrapper}>
      <SellingStatusButton {...styles.status} />
      <Text {...styles.notice}>Sell</Text>

      <Flex {...styles.links}>
        {categories?.map(({ name, href }, index) => (
          <Flex
            key={href}
            fontWeight={listIndex === index && "bold"}
            {...styles.link}
          >
            <Icon as={IoRemove} {...styles.icon} />
            <Link href={href} shallow>
              <Text onClick={scrollToTop} {...styles.name}>
                {name}
              </Text>
            </Link>
          </Flex>
        ))}
      </Flex>
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
    direction: "column",
    border: "none",
  },
  link: {
    direction: "row",
    align: "center",
    paddingY: "0.75em",
    marginLeft: "-2",
    cursor: "pointer",
    _hover: {
      background: "none",
      fontWeight: "bold",
      letterSpacing: "tight",
    },
  },
  icon: {
    marginRight: "2",
  },
  name: {
    isTruncated: true,
  },
};
