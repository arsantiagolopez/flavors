import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { CategorySelect } from "../../CategorySelect";
import { MenuSelectCreatable } from "../../MenuSelectCreatable";
import { TagSelect } from "../../TagSelect";

const DetailsScreen = ({
  listing,
  setListing,
  handleChange,
  setFormCompleteIndex,
}) => {
  // @todo: Get menu options from BACKEND
  let menuOptions = ["My Plates", "Keto", "Breakfast"];

  const DEFAULT_MENU_NAME = "My plates";

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  // Submit form
  const handleNext = () => handleSubmit(onSubmit)();

  // Handle submit
  const onSubmit = async (values) => {
    // Unlock & swipe to next screen
    setFormCompleteIndex(3);
    handleChange(1);

    // Update root form state
    setListing({ ...listing, ...values });
  };

  const categoryRegister = { name: "category", control, errors };
  const descriptionRegister = register("description", {
    required: "A description for your plate is required.",
  });
  const menuRegister = {
    name: "menu",
    control,
    menuOptions,
    defaultValue: DEFAULT_MENU_NAME,
  };
  const tagsRegister = { name: "tags", control };

  // @todo: ADD TYPE: breakfast, brunch, lunch, dinner ?
  return (
    <Flex {...styles.wrapper}>
      <form style={styles.form}>
        <Flex {...styles.field} marginTop="0">
          <CategorySelect {...categoryRegister} />
          {errors?.category && (
            <Text {...styles.error}>{errors?.category?.message}</Text>
          )}
        </Flex>

        <Flex
          {...styles.field}
          marginTop={errors?.category ? "1vh" : { base: "3vh", md: "2vh" }}
        >
          <Textarea
            spellCheck="true"
            placeholder="Your plate description. The more details, the more your plate will be seen!"
            isInvalid={errors?.description}
            focusBorderColor={errors?.description && "red.500"}
            {...descriptionRegister}
          />
          {errors?.description && (
            <Text {...styles.error}>{errors?.description?.message}</Text>
          )}
        </Flex>

        <Flex
          {...styles.field}
          marginTop={errors?.description ? "1vh" : { base: "3vh", md: "2vh" }}
        >
          <MenuSelectCreatable {...menuRegister} />
          {errors?.menu && (
            <Text {...styles.error}>{errors?.menu?.message}</Text>
          )}
        </Flex>

        <Flex {...styles.field} {...styles.lastField}>
          <TagSelect {...tagsRegister} />
          {errors?.tags && (
            <Text {...styles.error}>{errors?.tags?.message}</Text>
          )}
        </Flex>
      </form>

      <Button onClick={handleNext} {...styles.next}>
        Next
      </Button>
    </Flex>
  );
};

export { DetailsScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "8vh", md: "10vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "1em", md: "calc(35vw - 2em)" },
  },
  form: {
    height: "100%",
    maxHeight: "55vh",
    overflow: "scroll",
    paddingLeft: "1em",
    paddingRight: "1em",
  },
  field: {
    direction: "column",
    marginTop: { base: "3vh", md: "2vh" },
    width: "100%",
  },
  error: {
    color: "red.500",
    marginY: "2",
    textAlign: "left",
  },
  lastField: {
    paddingBottom: { base: "3vh", md: "none" },
  },
  next: {
    position: "absolute",
    bottom: "10vh",
    width: { base: "calc(100% - 4em)", md: "calc(100% - 35vw - 35vw + 2em)" },
    padding: "1.75em",
    borderRadius: "0.5em",
    marginX: "1em",
  },
};
