import { Flex, Heading, Icon, ScaleFade, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import axios from "../../../axios";

// Screen index: possible 3 or 4

const SuccessScreen = ({ index, form, formCompleteIndex, lastIndex }) => {
  const [isCreating, setIsCreating] = useState(true);

  const isCurrentScreen = index === lastIndex;
  const isFormCompleted = formCompleteIndex === lastIndex;
  const allFieldsCompleted =
    form?.photo && form?.name && form?.username && form?.address;

  const createPlateOnce =
    isCurrentScreen && isFormCompleted && allFieldsCompleted && isCreating;

  const router = useRouter();

  // Upload image securely to S3, get link & store link in DB
  const uploadImageToS3 = async (file) => {
    // Get secure URL from server
    const { status, data } = await axios.get("/api/s3/url");
    if (status !== 200) return;
    const { url } = data;
    // Post image to S3 Bucket
    await axios.put(url, file, {
      headers: { "Content-type": file.type },
    });
    const imageURL = url.split("?")[0];
    return imageURL;
  };

  // Create a plate document and save in DB
  const createPlate = async () => {
    let geolocation = null;

    let { photo: image, name, username, address } = form;

    // If new image, upload & store image URL
    if (typeof image === "object") {
      image = await uploadImageToS3(photo);
    }

    // If new address, destructure & store
    if (typeof address === "object") {
      const { name: street, latitude, longitude } = address;
      address = street;
      geolocation = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    }

    // Update userProfile model with image, name, address & geolocation
    const profileParams = { image, name, address, geolocation };
    const { status: profileStatus } = await axios.put(
      "/api/profile",
      profileParams
    );

    // Return false if something went wrong
    if (profileStatus !== 200) return false;

    // Update user model with username & new seller status
    const { status: userStatus, data: userData } = await axios.put(
      "/api/user",
      { username, isSeller: true }
    );

    // Return false if something went wrong
    if (userStatus !== 200) return false;

    return userData;
  };

  // Redirect to create plate
  const redirectToCreate = () => router.push("/sell/create");

  // Redirect to seller dashboard
  const redirectToDashboard = () => router.push("/sell/profile");

  // Handle form completion
  useEffect(async () => {
    if (createPlateOnce) {
      setIsCreating(false);
      const success = await createPlate();
      if (!success) return console.log("something went wrong");
    }
  }, [isCurrentScreen, isFormCompleted]);

  return (
    <Flex {...styles.wrapper}>
      <ScaleFade initialScale={0.2} in={isCurrentScreen}>
        <Flex {...styles.content}>
          <Icon as={RiCheckboxCircleFill} {...styles.icon} />
          <Heading {...styles.heading}>You can now sell with us.</Heading>

          <Text onClick={redirectToCreate} {...styles.text}>
            List your first plate or,
          </Text>

          <Text onClick={redirectToDashboard} {...styles.text} paddingTop="2vh">
            See your seller dashboard
          </Text>
        </Flex>
      </ScaleFade>
    </Flex>
  );
};

export { SuccessScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "7vh", md: "10vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  content: {
    direction: "column",
    justify: "center",
    align: "center",
  },
  icon: {
    color: "green.400",
    boxSize: "7em",
  },
  heading: {
    marginY: "2vh",
  },
  text: {
    color: "gray.500",
    cursor: "pointer",
    _hover: {
      textDecoration: "underline",
    },
  },
};
