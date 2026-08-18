import { useApolloClient } from "@apollo/client/react"
import { Pressable } from "react-native";
import Text from "./Text";
import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();

const SignOut = () => {
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Text color="white">Sign out</Text>
    </Pressable>
  );
}

export default SignOut