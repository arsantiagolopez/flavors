import {
  Flex,
  Heading,
  Icon,
  ScaleFade,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import axios from "../../../axios";
import { useDelay } from "../../../utils/useDelay";

// Screen index: 5

const SuccessScreen = ({ index, lastIndex, formCompleteIndex, listing }) => {
  const [isCreating, setIsCreating] = useState(true);

  const isCurrentScreen = index === lastIndex;
  const isFormCompleted = formCompleteIndex === lastIndex;
  const allFieldsCompleted =
    listing?.photo && listing?.category && listing?.title && listing?.price;
  listing?.description && listing?.tags && listing?.menu;

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
    const {
      menu,
      photo,
      photoPreview,
      category: {
        category: { label: category },
        subCategory: { label: subCategory },
      },
      ...values
    } = listing;

    // Upload & store image URL
    const image = await uploadImageToS3(photo);

    const params = { ...values, category, subCategory, image, menu: [menu] };
    const { status, data } = await axios.post("/api/plates", params);

    // Return false if something went wrong
    if (status !== 200) return false;

    return data?.plate;
  };

  // Handle form completion
  useEffect(async () => {
    if (createPlateOnce) {
      setIsCreating(false);

      const plate = await createPlate();

      if (!plate) return console.log("Something went wrong.");

      // Redirect on complete
      await useDelay(500);

      router.push(`/plates/${plate?._id}`);
    }
  }, [isCurrentScreen, isFormCompleted]);

  return (
    <Flex {...styles.wrapper}>
      <ScaleFade initialScale={0.2} in={isCurrentScreen}>
        <Flex {...styles.content}>
          {isCreating ? (
            <Spinner {...styles.spinner} />
          ) : (
            <Icon as={RiCheckboxCircleFill} {...styles.icon} />
          )}
          <Heading {...styles.heading}>Everything looks right!</Heading>
          <Text {...styles.text}>
            {isCreating
              ? "We're creating your plate..."
              : "Done! Let's see your live post."}
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
    paddingTop: { base: "7vh", md: "15vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  content: {
    direction: "column",
    justify: "center",
    align: "center",
  },
  spinner: {
    color: "brand",
    speed: "1s",
    marginLeft: "2",
    boxSize: "5em",
    thickness: "4px",
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
  },
};
