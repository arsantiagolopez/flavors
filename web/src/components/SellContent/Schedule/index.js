import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Select, Switch, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "../../../axios";
import { showToast } from "../../../utils/showToast";

const Schedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [isScheduleActive, setIsScheduleActive] = useState(true);
  const [isSaveVisible, setIsSaveVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data, mutate } = useSWR("/api/sell/schedule");

  const defaultOpenTime = "8:00 AM";
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

  // Days array, Monday to Sunday
  const days = [...moment.weekdays().slice(1), moment.weekdays()[0]];

  // Intervals array, 12:00 AM, 12:30 AM, 1:00 AM...
  const intervals = getThirtyMinIntervals();

  // Update on/off state & database document
  const toggleSchedule = async () => {
    const isActive = !isScheduleActive;
    setIsScheduleActive(isActive);

    const params = { isActive };
    const { status, data } = await axios.put("/api/sell/schedule", params);

    if (status !== 200) console.log("something went wrong");

    // Update UI
    mutate({ ...data?.schedule, isActive });

    // Show success toast
    showToast({
      status: "success",
      title: `Your schedule is ${isActive ? "active" : "now turned off"}.`,
    });
  };

  // Update day operation status
  const handleChange = (event) => {
    const { id, checked } = event?.target;

    // Get open & close time
    const { value: openTime } = document.getElementById(`${id}-open`);
    const { value: closeTime } = document.getElementById(`${id}-close`);

    const updatedDays = schedule.map((dayObj) => {
      const { day, ...otherProps } = dayObj;
      if (day !== id) return dayObj;
      return { ...otherProps, day, isOpen: checked, openTime, closeTime };
    });

    setSchedule(updatedDays);
  };

  // Update opening and closing times
  const handleSelectChange = (event) => {
    const { id, value } = event?.target;

    let openTime,
      closeTime = null;

    // If updating opening hours select, get closeTime
    if (id.includes("open")) {
      const day = id.split("-")[0];
      closeTime = document.getElementById(`${day}-close`).value;
      openTime = value;
    }
    // If updating closing hours select, get openTime
    if (id.includes("close")) {
      const day = id.split("-")[0];
      openTime = document.getElementById(`${day}-open`).value;
      closeTime = value;
    }

    const updatedDays = schedule.map((dayObj) => {
      const { day, ...otherProps } = dayObj;
      if (!id.includes(day)) return dayObj;
      return { ...otherProps, day, openTime, closeTime };
    });
    setSchedule(updatedDays);
  };

  // Save changes in database
  const handleSave = async () => {
    setIsSaving(true);

    const params = {
      isActive: true,
      days: schedule,
    };
    const { status, data } = await axios.put("/api/sell/schedule", params);

    // @todo: handle errors
    if (status !== 200) {
      console.log("something went wrong");
    }

    // Update UI
    mutate({ ...data?.schedule, days: schedule });

    // Show success toast
    showToast({
      status: "success",
      title: "Your schedule was updated.",
    });

    setIsSaving(false);
  };

  // Fetch initial schedule & store in state
  useEffect(() => {
    if (data?.schedule) setSchedule(data?.schedule?.days);
    // If no schedule, default to mock schedule
    else setSchedule(days.map((day) => ({ day })));
  }, [data]);

  // Show save changes button if state different from database
  useEffect(() => {
    // Schedule document hasn't been initiated
    if (typeof data?.schedule === "null") setIsSaveVisible(true);
    // Schedule exists, but different from current state
    if (schedule && data?.schedule && data?.schedule?.days !== schedule) {
      setIsSaveVisible(true);
    }
  }, [schedule]);

  console.log(schedule);

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

        {schedule?.map(({ day, isOpen, openTime, closeTime }) => (
          <Flex
            key={day}
            opacity={isScheduleActive ? "1" : "0.2"}
            {...styles.days}
          >
            <Text {...styles.day} {...styles.mobileOnly}>
              {day.substring(0, 3)}
            </Text>
            <Text {...styles.day} {...styles.desktopOnly}>
              {day}
            </Text>

            <Flex {...styles.status}>
              <Switch
                id={day}
                isChecked={isOpen}
                onChange={handleChange}
                isDisabled={isScheduleActive ? false : true}
                {...styles.switch}
              />
              <Text
                display={{ base: isOpen ? "none" : "black", md: "block" }}
                fontStyle={!isOpen && "italic"}
                {...styles.text}
              >
                {isOpen ? "Open" : "Closed"}
              </Text>
            </Flex>

            <Flex display={isOpen ? "flex" : "none"} {...styles.intervals}>
              <Select
                id={`${day}-open`}
                value={openTime}
                onChange={handleSelectChange}
                defaultValue={defaultOpenTime}
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
                id={`${day}-close`}
                value={closeTime}
                onChange={handleSelectChange}
                defaultValue={defaultCloseTime}
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

        <Button
          display={isSaveVisible ? "flex" : "none"}
          isLoading={isSaving}
          isDisabled={isSaving}
          onClick={handleSave}
          {...styles.button}
        >
          Save Changes
        </Button>
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
    paddingY: { base: "2vh", md: "2vh" },
  },
  content: {
    direction: "column",
    paddingBottom: { base: "2vh", md: "3vh" },
    height: "100%",
  },
  days: {
    direction: "row",
    justify: "flex-start",
    align: "center",
    width: "100%",
    transition: "0.3s opacity ease-out",
  },
  mobileOnly: {
    display: { base: "flex", md: "none" },
  },
  desktopOnly: {
    display: { base: "none", md: "flex" },
  },
  day: {
    fontSize: { base: "14pt", md: "12pt" },
    fontWeight: "semibold",
    letterSpacing: "tight",
    paddingY: { base: "1.5vh", md: "2vh" },
    width: { base: "20%", md: "20%" },
  },
  status: {
    direction: "row",
    align: "center",
  },
  text: {
    marginLeft: "5",
  },
  switch: {
    colorScheme: "green",
    size: "md",
  },
  intervals: {
    align: "center",
    width: { base: "65%", md: "60%" },
    marginLeft: "auto",
  },
  select: {
    iconSize: { base: "0", md: "12pt" },
    focusBorderColor: "gray.800",
    transition: "none",
  },
  selectIcon: {
    display: { base: "none", md: "block" },
  },
  to: {
    fontSize: "12pt",
    fontWeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    width: "30%",
  },
  button: {
    loadingText: "Saving...",
    spinnerPlacement: "end",
    variant: "solid",
    type: "submit",
    width: { base: "100%", md: "15%" },
    paddingY: { base: "1.6em", md: "1.75em" },
    paddingX: "6em",
    borderRadius: { base: "0.5em", md: "0.6em" },
    boxShadow: "2xl",
    marginTop: { base: "7vh", md: "5vh" },
  },
};
