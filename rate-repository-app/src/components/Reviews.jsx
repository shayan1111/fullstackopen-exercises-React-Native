import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";
import useReviews from "../hooks/useReviews";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const numberForCircle = 48;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.whiteColor,
    flexDirection: "row",
  },

  ratingDisplayStyle: {
    width: numberForCircle,
    height: numberForCircle,
    borderRadius: numberForCircle / 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.color.primary,
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },

  usernameAndDateStyle: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },

  // Rep style details
  viewRepStyle: {
    backgroundColor: theme.color.primary,
    padding: 10,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
    borderRadius: 4,
    textAlign: "center",
  },

  textStyleForButtons: {
    color: theme.color.whiteColor,
    paddingRight: 10,
    paddingLeft: 10,
  },

  // Delete Review details
  deleteReviewStyle: {
    backgroundColor: theme.color.redColor,
    padding: 10,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
    borderRadius: 4,
    textAlign: "center",
  },
});

const showAlert = (handleDeleteReview) =>
  Alert.alert("Delete review", "Are you sure you want to delete this review?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Delete",
      onPress: handleDeleteReview,
    },
  ]);

export const ReviewItem = ({ review, myReviewsPage = false, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDeleteReview = async (idToDelete) => {
    await deleteReview(idToDelete);
    await refetch();
  };

  const repIdToGo = review.id.substring(review.id.indexOf(".") + 1);

  const handlePress = () => {
    navigate(`/repositories/${repIdToGo}`);
  };

  return (
    <View>
      {/* // First create a view in the form of a row */}
      <View style={styles.container}>
        {/* Then make a view to display the number of the rating */}
        <View style={styles.ratingDisplayStyle}>
          <Text fontWeight="bold" color="blue">
            {review.rating}
          </Text>
        </View>

        {/* Then finally the info */}
        <View style={styles.usernameAndDateStyle}>
          <Text fontWeight="bold">{review?.user.username}</Text>
          <Text>{format(new Date(review.createdAt), "dd MMM yyyy")}</Text>
          <Text style={{ marginTop: 10 }}>{review.text}</Text>
        </View>
      </View>
      {/* Now the buttons themselves if myReviewsPage is true */}
      {myReviewsPage && (
        <View
          style={{
            backgroundColor: theme.color.whiteColor,
            marginBottom: 5,
            flexDirection: "row",
          }}
        >
          <Pressable onPress={handlePress} style={styles.viewRepStyle}>
            <Text style={styles.textStyleForButtons} fontWeight="bold">
              View repository
            </Text>
          </Pressable>
          <Pressable
            onPress={() => showAlert(() => handleDeleteReview(review.id))}
            style={styles.deleteReviewStyle}
          >
            <Text style={styles.textStyleForButtons}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const Reviews = ({ id, repository }) => {
  const { reviews, loading, refetch, fetchMore } = useReviews({ id, first: 2 });

  if (loading) return <Text>Loading Text...</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <View style={{ marginTop: 10 }}>
          <ReviewItem review={item} refetch={refetch} />
        </View>
      )}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton={true} />
      )}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Reviews;
