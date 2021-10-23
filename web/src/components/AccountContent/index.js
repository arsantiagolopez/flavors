import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoExitOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoPricetagOutline,
  IoRestaurantOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useDelay } from "../../utils/useDelay";
import { ReturnHeading } from "../ReturnHeading";
import { AccountSidebar } from "./AccountSidebar";
import { Addresses } from "./Addresses";
import { Balance } from "./Balance";
import { Coupons } from "./Coupons";
import { Delete } from "./Delete";
import { Email } from "./Email";
import { Listings } from "./Listings";
import { Notifications } from "./Notifications";
import { Orders } from "./Orders";
import { Password } from "./Password";
import { Payments } from "./Payments";
import { Privacy } from "./Privacy";
import { Profile } from "./Profile";
import { Referrals } from "./Referrals";
import { Reviews } from "./Reviews";
import { Schedule } from "./Schedule";
import { Socials } from "./Socials";
import { Subscriptions } from "./Subscriptions";
import { Terms } from "./Terms";

const AccountContent = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progressValue, setProgressValue] = useState(null);
  const { name, image } = user || {};

  const categories = [
    {
      name: "Personal",
      icon: IoPersonOutline,
      links: [
        { name: "Profile", path: "profile" },
        { name: "Payments", path: "payments" }, //
        { name: "Addresses", path: "addresses" }, //
        { name: "Reviews", path: "reviews" }, //
      ],
    },
    {
      name: "Security",
      icon: IoLockClosedOutline,
      links: [
        { name: "Change your password", path: "password" },
        { name: "Phone & email", path: "email" }, //
        { name: "Social media accounts", path: "socials" }, //
      ],
    },
    {
      name: "Buying",
      icon: IoRestaurantOutline,
      links: [
        { name: "Your orders", path: "orders" }, //
        { name: "Subscriptions", path: "subscriptions" }, //
        { name: "Coupons", path: "coupons" }, //
      ],
    },
    {
      name: "Selling",
      icon: IoPricetagOutline,
      links: [
        { name: "Your listings", path: "listings" }, //
        { name: "Schedule", path: "schedule" }, //
        { name: "Balance", path: "balance" }, //
      ],
    },
    {
      name: "Preferences",
      icon: IoSettingsOutline,
      links: [
        { name: "Notifications", path: "notifications" },
        { name: "Privacy Policy", path: "privacy" },
        { name: "Terms and services", path: "terms" },
        { name: "Delete your account", path: "delete" },
        // { name: "Referrals", path: "referrals" },
      ],
    },
  ];

  // Progress component to pass down to heading
  const withProgress = (
    <Button {...styles.completed}>
      {progressValue ? `${progressValue}%` : <Spinner {...styles.spinner} />}
    </Button>
  );

  // Control progress animation
  const endAnimation = async () => {
    await useDelay(3000);
    setIsLoading(false);
    await useDelay(10);
    setProgressValue(75);
  };

  // Stop animation when user data loaded
  useEffect(() => {
    /**
     * @todo add other data fetched from backend
     */
    if (user) endAnimation();
  }, [user]);

  return (
    <Flex {...styles.wrapper}>
      <ReturnHeading
        heading="My Account"
        onlyMobile
        withProgress={withProgress}
      />
      <Flex {...styles.profile}>
        <Avatar src={image} name={name} {...styles.image}>
          <CircularProgress
            value={progressValue === 100 ? 99 : progressValue}
            isIndeterminate={isLoading}
            {...styles.progress}
          />
        </Avatar>
        <Flex {...styles.meta}>
          <Heading {...styles.name}>{name}</Heading>
          <Flex {...styles.buttons}>
            <Link href="/account/profile">
              <Button {...styles.button}>Edit Profile</Button>
            </Link>
            <Button
              onClick={() => signOut()}
              {...styles.button}
              {...styles.logout}
            >
              <Icon as={IoExitOutline} fontSize="1.15em" />
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex {...styles.categories}>
        <Divider {...styles.divider} />
        {categories.map(({ name, icon, links }, index) => (
          <Flex key={index} {...styles.category}>
            <Flex {...styles.categoryTitle}>
              <Heading {...styles.title}>{name}</Heading>
              <Icon as={icon} {...styles.icon} />
            </Flex>

            <Divider {...styles.categoriesDivider} />

            {links.map(({ path, name: linkName }, index) => (
              <Link key={index} href={`/account/${path}`}>
                <Button {...styles.link}>{linkName}</Button>
              </Link>
            ))}
          </Flex>
        ))}
        <Button onClick={() => signOut()} {...styles.logoutEnd}>
          Log out
          <Icon as={IoExitOutline} marginLeft="3" />{" "}
        </Button>
      </Flex>
    </Flex>
  );
};

export {
  AccountContent,
  Delete,
  Email,
  Notifications,
  Password,
  Privacy,
  Profile,
  Referrals,
  Socials,
  Payments,
  Addresses,
  Reviews,
  Orders,
  Subscriptions,
  Coupons,
  Listings,
  Schedule,
  Balance,
  Terms,
  AccountSidebar,
};

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    marginX: { base: "1em", md: "0" },
  },
  completed: {
    position: "absolute",
    right: "-1em",
    marginRight: "1em",
    width: "auto",
    paddingY: "0",
    paddingX: "2",
    fontSize: "xs",
  },
  spinner: {
    color: "white",
    size: "sm",
    thickness: "2px",
    speed: "0.9s",
  },
  profile: {
    direction: { base: "column", md: "row" },
    justify: "center",
    align: "center",
    width: "100%",
    paddingTop: { base: "12vh", md: "15vh" },
  },
  image: {
    boxSize: { base: "27vw", md: "6vw" },
    background: "gray.100",
  },
  progress: {
    position: "absolute",
    size: { base: "40vw", md: "9vw" },
    thickness: "4px",
    transition: "value 2s",
    color: "gray.800",
  },
  meta: {
    direction: "column",
    justify: "center",
    align: { base: "center", md: "flex-start" },
    paddingX: { base: "1em", md: "3em" },
    marginY: { base: "7vh", md: "0" },
    maxWidth: { base: "90%", md: "25vw" },
    textAlign: { base: "center", md: "left" },
  },
  name: {
    textTransform: "capitalize",
    letterSpacing: "tight",
    noOfLines: 2,
  },
  buttons: {
    direction: "row",
  },
  button: {
    display: { base: "none", md: "flex" },
    variant: "outline",
    size: "sm",
    marginTop: "1em",
    width: "30%",
    minWidth: "8em",
    paddingY: "1.25em",
    fontWeight: "bold",
    color: "gray.800",
  },
  logout: {
    variant: "solid",
    background: "red.500",
    marginLeft: "2",
    minWidth: "2.5em",
    color: "white",
    _hover: {
      background: "red.800",
    },
  },
  categories: {
    position: "relative",
    justify: "center",
    direction: { base: "column", md: "row" },
    wrap: { base: "nowrap", md: "wrap" },
    marginY: { base: "0", md: "15vh" },
    marginTop: { base: "0", md: "10vh" },
    paddingX: { base: "0.5em", md: "5vw" },
    marginBottom: { base: "0", md: "20vh" },
    width: "100%",
  },
  divider: {
    display: { base: "none", md: "block" },
    position: "absolute",
    top: "4em",
  },
  category: {
    flex: "1 1 30%",
    direction: "column",
    justify: "flex-start",
    marginY: "3",
    marginX: { base: "0.5em", md: "1em" },
    maxWidth: { base: "100%", md: "15%" },
  },
  categoryTitle: {
    align: "center",
    justify: "space-between",
    color: "lightgray",
    marginBottom: { base: "0", md: "2em" },
  },
  title: {
    color: "gray.700",
    marginY: "2",
    fontSize: { base: "1.75em", md: "1.5em" },
    isTruncated: true,
  },
  icon: {
    boxSize: "5",
  },
  categoriesDivider: {
    display: { base: "block", md: "none" },
    marginBottom: { base: "2", md: "1" },
  },
  link: {
    isTruncated: true,
    size: { base: "md", md: "sm" },
    paddingY: { base: "2", md: "2" },
    color: "gray.500",
    variant: "ghost",
    width: "100%",
    justifyContent: "flex-start",
    fontWeight: "normal",
    borderRadius: "0",
    paddingX: "0",
    _active: {
      background: "none",
      fontWeight: "bold",
      color: "gray.800",
      letterSpacing: "tight",
    },
    _hover: {
      background: "none",
      fontWeight: "bold",
      color: "gray.800",
      letterSpacing: "tight",
    },
  },
  logoutEnd: {
    display: { base: "block", md: "none" },
    color: "red.500",
    backgroundColor: "transparent",
    width: { base: "100%", md: "50%" },
    borderRadius: { base: "0.5em", md: "1em" },
    marginX: { base: "0", md: "1em" },
    marginY: { base: "1em", md: "1em" },
    paddingBottom: "3em",
  },
};
