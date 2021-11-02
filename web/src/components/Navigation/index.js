import React from "react";
import { IconNavigation } from "./IconNavigation";
import { StickyNavigation } from "./StickyNavigation";

const Navigation = ({ user }) => {
  const iconNavigationProps = { user };
  const stickyNavigationProps = { user };
  return (
    <>
      <IconNavigation {...iconNavigationProps} />
      <StickyNavigation {...stickyNavigationProps} />
    </>
  );
};

export { Navigation };
