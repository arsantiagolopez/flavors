import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import {
  AccountSidebar,
  Addresses,
  Balance,
  Coupons,
  Delete,
  Email,
  Listings,
  Notifications,
  Orders,
  Password,
  Payments,
  Privacy,
  Profile,
  // Referrals,
  Reviews,
  Schedule,
  Socials,
  Subscriptions,
  Terms,
} from "../../components/AccountContent";
import { Layout } from "../../components/Layout";
import { ReturnHeading } from "../../components/ReturnHeading";

const AccountPages = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data, mutate } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = data || {};

  const router = useRouter();
  const { path } = router?.query;

  let content, title;

  const layoutProps = { user, SidebarComponent: <AccountSidebar /> };
  const commonProps = { user, mutate };

  switch (path) {
    // Personal
    case "profile":
      title = "My Profile";
      content = <Profile {...commonProps} />;
      break;
    case "payments":
      title = "My Payments";
      content = <Payments />;
      break;
    case "addresses":
      title = "My Addresses";
      content = <Addresses />;
      break;
    case "reviews":
      title = "My Reviews";
      content = <Reviews />;
      break;
    // Security
    case "email":
      title = "Phone & Email";
      content = <Email />;
      break;
    case "password":
      title = "Change Your Password";
      content = <Password {...commonProps} />;
      break;
    case "socials":
      title = "Social Media Accounts";
      content = <Socials />;
      break;
    // Buying
    case "orders":
      title = "Your Orders";
      content = <Orders />;
      break;
    case "subscriptions":
      title = "Your Subscriptions";
      content = <Subscriptions />;
      break;
    case "coupons":
      title = "Your Coupons";
      content = <Coupons />;
      break;
    // Selling
    case "listings":
      title = "Your Listings";
      content = <Listings />;
      break;
    case "schedule":
      title = "Your Schedule";
      content = <Schedule />;
      break;
    case "balance":
      title = "Your Balance";
      content = <Balance />;
      break;
    // Preferences
    case "notifications":
      title = "Notifications";
      content = <Notifications />;
      break;
    case "privacy":
      title = "Privacy Policy";
      content = <Privacy />;
      break;
    case "terms":
      title = "Terms And Services";
      content = <Terms />;
      break;
    case "delete":
      title = "Delete Your Account";
      content = <Delete />;
      break;
    // case "referrals":
    //   title = "Referrals"
    //   content = <Referrals />;
    //   break;
  }

  return (
    <>
      <Head>
        <title>Flavors - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Flex {...styles.wrapper}>
          <ReturnHeading heading={title} />
          {content}
        </Flex>
      </Layout>
    </>
  );
};

AccountPages.isProtected = true;

export default AccountPages;

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    minHeight: { base: "90vh", md: "80vh" },
    marginBottom: "2vh",
    width: "100%",
  },
};
