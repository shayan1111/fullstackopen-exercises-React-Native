import { View, Text, StyleSheet, FlatList } from "react-native";
import { ReviewItem } from "./Reviews";
import useCurrentUser from "../hooks/useCurrentUser";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { currentUser, loading, refetch } = useCurrentUser(true);
  const reviewNodes =
    currentUser?.reviews?.edges.map((edge) => edge.node) ?? [];

  if (loading)
    return (
      <View style={{ backgroundColor: theme.color.whiteColor }}>
        <Text>Loading reviews...</Text>
      </View>
    );

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} myReviewsPage={true} refetch={refetch} />}
    />
  );
};

export default MyReviews;
