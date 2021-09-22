import React from "react";
import { LandingNavigation } from "./LandingNavigation";
import { UserNavigation } from "./UserNavigation";

const Navigation = ({ user, isLanding, isPortrait }) => {
  const navigationProps = { user, isPortrait };
  return isLanding ? (
    <LandingNavigation {...navigationProps} />
  ) : (
    <UserNavigation {...navigationProps} />
  );
};

export { Navigation };
