import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { LoadingScreen } from "../LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const isUser = !!session?.user;

  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, loading]);

  const loadingScreenProps = { isFullScreen: true };

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <LoadingScreen {...loadingScreenProps} />;
};

export { ProtectedRoute };
