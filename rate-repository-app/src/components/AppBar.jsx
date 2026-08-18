import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import useCurrentUser from "../hooks/useCurrentUser";
import Text from "./Text";
import theme from "../theme";
import SignOut from "./SignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.container.paddingTop,
    display: theme.container.display,
    backgroundColor: theme.container.backgroundColor,
  },

  scrollContent: {
    flexDirection: "row",
    gap: 10,
  },
});

const AppBar = () => {
  const { currentUser, loading } = useCurrentUser();

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <Link to="/">
          <Text color="white">Repositories</Text>
        </Link>
        {/* Create review button, should only be accessible to those who have signed in */}
        {currentUser ? (
          <Link to="/create-review">
            <Text color="white">Create a review</Text>
          </Link>
        ) : null}

        {currentUser ? (
          <Link to="/my-reviews">
            <Text color="white">My reviews</Text>
          </Link>
        ): null}

        {currentUser ? (
          <SignOut />
        ) : (
          <Link to="/signin">
            <Text color="white">Sign in</Text>
          </Link>
        )}

        {!currentUser ? (
          <Link to="/signup">
            <Text color="white">Sign up</Text>
          </Link>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default AppBar;
