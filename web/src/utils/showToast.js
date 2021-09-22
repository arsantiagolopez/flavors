import { CheckIcon } from "@chakra-ui/icons";
import { createStandaloneToast, Flex, Icon } from "@chakra-ui/react";
import { IoCloseSharp } from "react-icons/io5";

/**
 *  Shows a custom toast notification.
 *  Required props: status, title.
 */

const showToast = ({ position, status, title, duration }) => {
  const toast = createStandaloneToast();

  const SuccessToast = (
    <Flex {...styles.wrapper} {...styles.success}>
      {title}
      <CheckIcon {...styles.check} />
    </Flex>
  );

  const ErrorToast = (
    <Flex {...styles.wrapper} {...styles.error}>
      {title}
      <Icon as={IoCloseSharp} {...styles.close} />
    </Flex>
  );

  return toast({
    // Default props
    position: position || "top",
    duration: duration || 3000,
    render: () =>
      status === "success"
        ? SuccessToast
        : status === "error"
        ? ErrorToast
        : null,
  });
};

export { showToast };

// Styles

const styles = {
  wrapper: {
    direction: "row",
    justify: "center",
    align: "center",
    color: "white",
    height: "3em",
    width: "100%",
    boxShadow: "md",
    borderRadius: "0.25em",
    paddingX: "0.25em",
    fontSize: "0.85rem",
    marginY: "1em",
    backdropFilter: "blur(10px)",
  },
  success: {
    background: "rgba(0,0,10, 0.8)", // gray
  },
  error: {
    background: "rgb(255, 0, 50, 0.8)", // red
  },
  check: {
    marginLeft: "2",
    boxSize: "0.75em",
  },
  close: {
    marginLeft: "1",
    marginRight: "-2",
    boxSize: "1em",
  },
};
