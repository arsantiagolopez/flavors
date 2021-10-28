import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoBookmark, IoEyeSharp, IoFileTray } from "react-icons/io5";

const Insights = () => {
  const views = "0";
  const saves = "5";
  const chats = "2";

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        <Menu {...styles.menu}>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                {...styles.button}
              >
                Last 7 days
              </MenuButton>

              <MenuList {...styles.list}>
                <MenuItem
                // onClick={() => handleClick("DATE")}
                // fontWeight={isActive("DATE") && "600"}
                >
                  Last month
                  {true && <CheckIcon {...styles.icon} />}
                </MenuItem>
                <MenuItem
                // onClick={() => handleClick("NAME")}
                // fontWeight={isActive("NAME") && "600"}
                >
                  Last year
                  {false && <CheckIcon {...styles.icon} />}
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>

      <Flex {...styles.stats}>
        <Flex {...styles.section}>
          <Icon as={IoEyeSharp} {...styles.icon} />
          <Text {...styles.views}>{views} plate views</Text>
        </Flex>

        <Flex {...styles.section}>
          <Icon as={IoBookmark} {...styles.icon} />
          <Text {...styles.views}>{saves} plate saves</Text>
        </Flex>

        <Flex {...styles.section} marginRight="none">
          <Icon as={IoFileTray} {...styles.icon} />
          <Text {...styles.views}>{chats} chats to answer</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Insights };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    marginY: "3vh",
    minHeight: { base: "35vh", md: "25vh" },
  },
  header: {
    direction: "row",
    justify: "flex-end",
    marginBottom: { base: "2vh", md: "3vh" },
    marginTop: "-3.2em",
  },
  menu: {
    width: "fit-content",
  },
  button: {
    width: "fit-content",
    variant: "link",
    fontSize: "xl",
    letterSpacing: "tighter",
    color: "gray.800",
  },
  stats: {
    direction: { base: "column", md: "row" },
    height: "100%",
  },
  section: {
    flex: "1 1 30%",
    direction: "row",
    align: "center",
    justify: { base: "flex-start", md: "center" },
    borderRadius: "0.5em",
    boxShadow: "md",
    marginRight: { base: "0", md: "1vw" },
    padding: { base: "3vh", md: "3vh" },
    marginY: { base: "1vh", md: "0" },
  },
  icon: {
    color: "gray.800",
    fontSize: "xl",
    marginX: { base: "5vw", md: "0.5em" },
    marginRight: { base: "10vw", md: "0.5em" },
  },
  views: {},
  label: {},
};
