import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { ProgressLine } from "./ProgressLine";
import {
  AddressScreen,
  EmailScreen,
  ProfileScreen,
  StartScreen,
  SuccessScreen,
} from "./Screens";

const SellerOnboardContent = ({ user }) => {
  const [form, setForm] = useState(null);
  const [index, setIndex] = useState(0);
  // formCompleteIndex holds the number of unlocked screens
  const [formCompleteIndex, setFormCompleteIndex] = useState(0);
  const [title, setTitle] = useState(null);

  const { emailVerified } = user || {};

  const lastIndex = emailVerified ? 3 : 4;

  const handleChange = (value) => {
    if (value === -1 && index < 1) setIndex(0);
    if (value === 1 && index === lastIndex) return setIndex(lastIndex);
    setIndex(index + value);
  };

  const handleChangeIndex = (index) => setIndex(index);

  const preventUnauthorizedSwipe = () => {
    // Prevent forward swipe if current index form hasn't been filled
    if (index + 1 > formCompleteIndex) {
      setIndex(formCompleteIndex);
    }
  };

  const screenProps = {
    user,
    handleChange,
    setFormCompleteIndex,
    lastIndex,
  };
  const formProps = { form, setForm };
  const successProps = { index, formCompleteIndex };

  // Screens to be displayed
  const screens = [
    {
      id: "start",
      screen: <StartScreen {...screenProps} />,
      title: "Make money with us 💰",
    },
    // Spread email confirmation screen if email not confirmed
    ...(!emailVerified
      ? [
          {
            id: "email",
            screen: <EmailScreen {...screenProps} />,
            title: "Confirm your email",
          },
        ]
      : []),
    {
      id: "profile",
      screen: <ProfileScreen {...screenProps} {...formProps} />,
      title: "About you",
    },
    {
      id: "address",
      screen: <AddressScreen {...screenProps} {...formProps} />,
      title: "Does this looks right?📍",
    },
    {
      id: "success",
      screen: (
        <SuccessScreen {...screenProps} {...formProps} {...successProps} />
      ),
      title: "You. Are. A. Seller. 🙌🏼",
    },
  ];

  // Update page's tite based on current screen
  useEffect(() => {
    if (screens[index]) setTitle(screens[index].title);
  }, [index]);

  const progressLineProps = { title, screens, index };

  return (
    <Flex {...styles.wrapper}>
      <ProgressLine {...progressLineProps} />
      <SwipeableViews
        enableMouseEvents={true}
        onTransitionEnd={preventUnauthorizedSwipe}
        index={index}
        onChangeIndex={handleChangeIndex}
        style={styles.views}
        resistance
      >
        {screens.map(({ id, screen }) => (
          <Flex {...styles.screen} key={id}>
            {screen}
          </Flex>
        ))}
      </SwipeableViews>
    </Flex>
  );
};

export { SellerOnboardContent };

// Styles

const styles = {
  wrapper: {
    position: "relative",
    direction: "column",
    align: "center",
    width: "100%",
  },
  views: {
    width: "100vw",
    marginTop: "16vh",
  },
  screen: {
    position: "relative",
    minHeight: "calc(100vh - 6em - 15vh)",
    height: "100%",
    width: "100%",
  },
};
