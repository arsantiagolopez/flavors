import { useRouter } from "next/router";
import { OAuthAccountNotLinked } from "./OAuthAccountNotLinked";

const ErrorModal = () => {
  const { query } = useRouter();

  // Handle potential auth errors
  switch (query?.error) {
    case "OAuthAccountNotLinked":
      return <OAuthAccountNotLinked />;
    default:
      return null;
  }
};

export { ErrorModal };
