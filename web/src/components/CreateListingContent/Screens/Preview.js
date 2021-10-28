import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoCreate } from "react-icons/io5";

// Screen index: 4

const PreviewScreen = ({
  listing,
  handleChange,
  setFormCompleteIndex,
  index,
  lastIndex,
}) => {
  const isScreenActive = index === lastIndex - 1;

  const { photoPreview, category, title, description, price, menu, tags } =
    listing || {};

  // Redirect to screen number passed: Current index is 4
  const redirectToScreen = (screen) => {
    window.scrollTo(0, 0);
    handleChange(screen - 4);
  };

  const handleNext = () => {
    window.scrollTo(0, 0);

    // Unlock & swipe to next screen
    setFormCompleteIndex(5);
    handleChange(1);
  };

  return (
    <Flex height={isScreenActive && "100%"} {...styles.wrapper}>
      <Flex
        position={!isScreenActive ? "absolute" : "static"}
        maxWidth={
          isScreenActive
            ? {
                base: "calc(100vw - 2em - 2em)",
                md: "100%",
              }
            : {
                base: "calc(100vw - 2em - 2em)",
                md: "calc(100% - 35vw - 35vw)",
              }
        }
        {...styles.content}
      >
        {/* Photo */}
        <Flex
          onClick={() => redirectToScreen(1)}
          {...styles.field}
          {...styles.scaleOnHover}
        >
          <AspectRatio {...styles.aspect}>
            {photoPreview ? (
              <Image src={photoPreview} />
            ) : (
              <Skeleton {...styles.photoSkeleton} />
            )}
          </AspectRatio>
          {photoPreview && (
            <Icon as={IoCreate} {...styles.editIcon} color="white" />
          )}
        </Flex>

        {/* Categories */}
        <Flex
          onClick={() => redirectToScreen(2)}
          {...styles.field}
          {...styles.scaleOnHover}
          marginBottom="2vh"
        >
          {category ? (
            <Heading {...styles.category}>
              {category?.category.label}
              <ChevronRightIcon />
              {category?.subCategory.label}
            </Heading>
          ) : (
            <Skeleton {...styles.categorySkeleton} />
          )}
          {category && <Icon as={IoCreate} {...styles.editIcon} />}
        </Flex>

        {/* Title */}
        <Flex
          onClick={() => redirectToScreen(1)}
          {...styles.field}
          {...styles.scaleOnHover}
          marginBottom="2vh"
        >
          {title ? (
            <Heading {...styles.title}>{title}</Heading>
          ) : (
            <Flex {...styles.titleSkeleton}>
              <Skeleton {...styles.titleSkeletonFirstLine} />
              <Skeleton
                {...styles.titleSkeleton}
                {...styles.titleSkeletonSecondLine}
              />
            </Flex>
          )}
          {title && <Icon as={IoCreate} {...styles.editIcon} />}
        </Flex>

        {/* Price */}
        <Flex
          onClick={() => redirectToScreen(3)}
          {...styles.field}
          {...styles.scaleOnHover}
        >
          {price ? (
            <Text {...styles.price}>${price}</Text>
          ) : (
            <Skeleton {...styles.priceSkeleton} />
          )}
          {price && <Icon as={IoCreate} {...styles.editIcon} />}
        </Flex>

        {/* Description */}
        <Flex
          onClick={() => redirectToScreen(2)}
          {...styles.field}
          {...styles.scaleOnHover}
        >
          <Heading
            color={description ? "gray.800" : "gray.400"}
            {...styles.heading}
          >
            Description
          </Heading>
          {description ? (
            <Text {...styles.description}>{description}</Text>
          ) : (
            <Flex {...styles.descriptionSkeleton}>
              <Skeleton {...styles.descriptionSkeletonLine} />
              <Skeleton {...styles.descriptionSkeletonLine} />
              <Skeleton {...styles.descriptionSkeletonLastLine} />
            </Flex>
          )}
          {description && <Icon as={IoCreate} {...styles.editIcon} />}
        </Flex>

        {/* Menu */}
        <Flex
          onClick={() => redirectToScreen(2)}
          {...styles.field}
          {...styles.scaleOnHover}
        >
          <Heading {...styles.heading}>Menu</Heading>
          {menu ? (
            <Text {...styles.menu}>{menu}</Text>
          ) : (
            <Text {...styles.menu} {...styles.empty}>
              You didn't add your plate to menu. Menus are like Spotify
              playlists. Add plates to them, and stay organized.
            </Text>
          )}
          {menu && <Icon as={IoCreate} {...styles.editIcon} />}
        </Flex>

        {/* Tags */}
        <Flex
          onClick={() => redirectToScreen(2)}
          {...styles.field}
          {...styles.scaleOnHover}
          overflow="hidden"
        >
          <Heading {...styles.heading}>Tags</Heading>
          {tags?.length ? (
            <Flex {...styles.tags}>
              {tags.map((tag) => (
                <Text key={tag} {...styles.tag}>
                  {tag}
                </Text>
              ))}
            </Flex>
          ) : (
            <Flex {...styles.tags} {...styles.empty}>
              No tags? Tags help your plate be seen by more people. Click here
              to add some.
            </Flex>
          )}
          {tags && <Icon as={IoCreate} {...styles.editIcon} />}
        </Flex>

        <Button onClick={handleNext} rightIcon={<CheckIcon />} {...styles.next}>
          Create plate
        </Button>
      </Flex>
    </Flex>
  );
};

export { PreviewScreen };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingTop: { base: "4vh", md: "10vh" },
    width: "100%",
    textAlign: "center",
    marginX: { base: "2em", md: "35vw" },
  },
  content: {
    direction: "column",
    width: "100%",
    // maxWidth: "100%",
  },
  field: {
    direction: "column",
    align: "flex-start",
    width: "100%",
    marginBottom: { base: "3vh", md: "5vh" },
  },
  aspect: {
    ratio: 1,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "0.5em",
    overflow: "hidden",
    cursor: "pointer",
  },
  scaleOnHover: {
    position: "relative",
    _hover: {
      cursor: "pointer",
      background: "rgba(240,240,240,0.5)",
      paddingX: "1em",
      paddingY: "1em",
      borderRadius: "0.5em",
      marginLeft: "-1em",
      marginTop: "-0.5em",
      width: "calc(100% + 2em)",
    },
  },
  editIcon: {
    zIndex: "1",
    position: "absolute",
    right: { base: "1", md: "3" },
    top: { base: "1", md: "3" },
    color: "gray.300",
    fontSize: "xl",
  },
  photoSkeleton: {
    width: { base: "100%", md: "70%" },
  },
  category: {
    color: "gray.400",
    size: "md",
    textAlign: "left",
    noOfLines: 2,
    maxWidth: { base: "90%", md: "93%" },
  },
  categorySkeleton: {
    width: "100%",
    height: { base: "4vh", md: "5vh" },
  },
  title: {
    noOfLines: 2,
    textAlign: "left",
    maxWidth: { base: "90%", md: "93%" },
  },
  titleSkeleton: {
    direction: "column",
    width: "100%",
  },
  titleSkeletonFirstLine: {
    width: "100%",
    height: { base: "4vh", md: "5vh" },
  },
  titleSkeletonSecondLine: {
    width: "33%",
    marginTop: "2vh",
    height: { base: "4vh", md: "5vh" },
  },
  price: {
    letterSpacing: "tighter",
    fontSize: { base: "xl", md: "3xl" },
    fontWeight: "bold",
    color: "gray.500",
  },
  priceSkeleton: {
    width: "25%",
    height: { base: "4vh", md: "5vh" },
  },
  heading: {
    size: "md",
    paddingBottom: { base: "1vh", md: "2vh" },
  },
  description: {
    textAlign: "left",
  },
  descriptionSkeleton: {
    direction: "column",
    width: "100%",
  },
  descriptionSkeletonLine: {
    width: "100%",
    height: { base: "4vh", md: "5vh" },
    marginTop: "2vh",
  },
  descriptionSkeletonLastLine: {
    width: "25%",
    height: { base: "4vh", md: "5vh" },
    marginTop: "2vh",
  },
  menu: {
    textAlign: "left",
  },
  empty: {
    color: "gray.400",
  },
  menuSkeleton: {
    width: "50%",
    height: { base: "4vh", md: "5vh" },
    marginTop: "2vh",
  },
  tags: {
    direction: "row",
    align: "center",
    width: "100%",
    wrap: "wrap",
    paddingTop: "1vh",
    paddingBottom: "3vh",
    overflow: "hidden",
    textAlign: "left",
  },
  tag: {
    borderRadius: "2em",
    marginBottom: { base: "1", md: "2" },
    marginRight: { base: "1", md: "2" },
    paddingX: { base: "1.5em", md: "2vw" },
    paddingY: { base: "2", md: "3" },
    background: "gray.800",
    color: "white",
    boxShadow: "lg",
  },
  tagsSkeleton: {
    direction: "row",
    width: "100%",
    marginTop: "2vh",
  },
  tagsSkeletonBadge: {
    width: "30%",
    borderRadius: "2em",
    height: { base: "5vh", md: "6vh" },
    marginRight: { base: "2vw", md: "1vw" },
  },
  next: {
    width: "100%",
    padding: "1.75em",
    borderRadius: "0.5em",
    marginTop: { base: "5vh", md: "5vh" },
    marginBottom: { base: "10vh", md: "10vh" },
    iconSpacing: "3",
  },
};
