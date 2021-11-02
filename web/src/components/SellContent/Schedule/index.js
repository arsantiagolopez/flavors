import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Heading, Select, Switch, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";

const Schedule = () => {
  const [isScheduleActive, setIsScheduleActive] = useState(true);

  const defaultStartTime = "8:00 AM";
  const defaultCloseTime = "8:00 PM";

  // Get an array of 30 minute intervals starting at midnight
  const getThirtyMinIntervals = () => {
    const intervals = [];
    new Array(24).fill().forEach((_, index) => {
      intervals.push(moment({ hour: index }).format("h:mm A"));
      intervals.push(moment({ hour: index, minute: 30 }).format("h:mm A"));
    });
    return intervals;
  };

  const days = [...moment.weekdays().slice(1), moment.weekdays()[0]];
  const intervals = getThirtyMinIntervals();

  // Toggle on/off between schedule status
  const toggleSchedule = () => setIsScheduleActive(!isScheduleActive);

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.header}>
        <Heading {...styles.title}>Schedule</Heading>
        <Switch onChange={toggleSchedule} {...styles.activeSwitch} />
      </Flex>

      <Flex {...styles.content}>
        <Text {...styles.subtitle}>
          Set your standard hours of operation. You can override these by
          clicking the button at the sidebar.
        </Text>
        {days.map((day) => (
          <Flex
            key={day}
            color={isScheduleActive ? "gray.700" : "gray.300"}
            {...styles.days}
          >
            <Text {...styles.day} {...styles.mobileOnly}>
              {day.substring(0, 3)}
            </Text>
            <Text
              // @todo: if open, dont show on mobile, if closed show everywhere
              // display={}
              {...styles.day}
              {...styles.desktopOnly}
            >
              {day}
            </Text>

            <Flex {...styles.open}>
              <Switch {...styles.switch} />
              <Text {...styles.text}>Open</Text>
            </Flex>

            <Flex {...styles.intervals}>
              <Select
                placeholder={defaultStartTime}
                icon={<ChevronDownIcon {...styles.selectIcon} />}
                isDisabled={isScheduleActive ? false : true}
                {...styles.select}
              >
                {intervals?.map((interval) => (
                  <option key={interval} value={interval}>
                    {interval}
                  </option>
                ))}
              </Select>
              <Text {...styles.to}>to</Text>
              <Select
                placeholder={defaultCloseTime}
                icon={<ChevronDownIcon {...styles.selectIcon} />}
                isDisabled={isScheduleActive ? false : true}
                {...styles.select}
              >
                {intervals?.map((interval) => (
                  <option key={interval} value={interval}>
                    {interval}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export { Schedule };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    paddingY: { base: "1em", md: "7vh" },
    paddingX: { base: "0.5em", md: "0" },
    minHeight: { base: "90vh", md: "80vh" },
    marginBottom: "2vh",
  },
  header: {
    direction: "row",
    justify: "space-between",
    align: "baseline",
    marginBottom: "2vh",
  },
  title: {
    fontSize: { base: "3xl", md: "5xl" },
    width: "100%",
  },
  activeSwitch: {
    colorScheme: "red",
    size: "lg",
    defaultChecked: true,
  },
  subtitle: {
    color: "gray.600",
    paddingY: { base: "2vh", md: "3vh" },
  },
  content: {
    direction: "column",
    paddingBottom: { base: "2vh", md: "3vh" },
    height: "100%",
  },
  days: {
    direction: "row",
    justify: "space-between",
    align: "center",
    width: "100%",
  },
  mobileOnly: {
    display: { base: "flex", md: "none" },
  },
  desktopOnly: {
    display: { base: "none", md: "flex" },
  },
  day: {
    fontWeight: "semibold",
    letterSpacing: "tight",
    paddingY: "2vh",
    width: { base: "15%", md: "12%" },
  },
  open: {
    direction: "row",
    align: "center",
  },
  text: {
    marginLeft: "3",
  },
  switch: {
    colorScheme: "green",
    size: "md",
  },
  intervals: {
    align: "center",
    width: { base: "65%", md: "65%" },
  },
  select: {
    iconSize: { base: "0", md: "12pt" },
    focusBorderColor: "gray.800",
  },
  selectIcon: {
    display: { base: "none", md: "block" },
  },
  to: {
    fontSize: "12pt",
    fontWeight: "normal",
    letterSpacing: "normal",
    paddingY: "2vh",
    textAlign: "center",
    width: "30%",
  },
  divider: {
    marginY: "3vh",
  },
};
