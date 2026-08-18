import { useParams } from "react-router-native";
import { View } from "react-native-web";
import Reviews from "./Reviews";
import useRepository from "../hooks/useRepository";
import Text from "./Text";

const Repository = () => {
  const { id } = useParams();

  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading repository</Text>;
  }

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  return (
    <View>
      <Reviews id={id} repository={repository} />
    </View>
  );
};

export default Repository;
