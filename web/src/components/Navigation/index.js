import React from "react";
import { IconNavigation } from "./IconNavigation";
import { StickyNavigation } from "./StickyNavigation";

const Navigation = ({ user, isPortrait }) => {
  const iconNavigationProps = { user, isPortrait };
  const stickyNavigationProps = { user, isPortrait };
  return (
    <>
      <IconNavigation {...iconNavigationProps} />
      <StickyNavigation {...stickyNavigationProps} />
    </>
  );
};

export { Navigation };
