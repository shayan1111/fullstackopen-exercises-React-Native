import { View, StyleSheet, Image, Pressable, Linking } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.whiteColor,
  },

  authorInfoStyle: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginLeft: 15,
  },

  statsInfoStyle: {
    flexDirection: "row",
    marginTop: 15,
  },

  textInfo: {
    gap: 5,
    flex: 1,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  backgroundColorBlue: {
    backgroundColor: theme.color.primary,
    color: theme.color.whiteColor,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 4,
  },

  githubButtonStyle: {
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    marginBottom: 5,
  },

  githubPressableStyle: {
    width: "95%",
  },

  githubButtonTextStyle: {
    backgroundColor: theme.color.primary,
    color: theme.color.whiteColor,
    padding: 12,
    borderRadius: 4,
    textAlign: "center",
  },
});

// Author
const AuthorInfo = ({ item }) => {
  return (
    <View style={styles.authorInfoStyle}>
      {/* First the image */}
      <View>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </View>
      {/* Then the info about the other things */}
      <View style={styles.textInfo}>
        <Text fontWeight="bold">{item.fullName}</Text>
        <Text>{item.description}</Text>
        <View style={styles.backgroundColorBlue}>
          <Text color="white">{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

// Stats
const StatItem = ({ value, label }) => {
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold">{value}</Text>
      <Text>{label}</Text>
    </View>
  );
};

const OpenInGithubButton = ({ url }) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.githubButtonStyle}>
      <Pressable style={styles.githubPressableStyle} onPress={handlePress}>
        <Text style={styles.githubButtonTextStyle}>Open in Github</Text>
      </Pressable>
    </View>
  );
};

const StatsInfo = ({ item }) => {
  const convertNumber = (numberToCheck) => {
    if (numberToCheck < 1000) return `${numberToCheck}`;
    else if (numberToCheck >= 1000) {
      const newNumber = numberToCheck / 1000;
      return `${newNumber.toFixed(1)}k`;
    }
  };

  return (
    <View>
      <View style={styles.statsInfoStyle}>
        <StatItem value={convertNumber(item.stargazersCount)} label="Stars" />

        <StatItem value={convertNumber(item.forksCount)} label="Forks" />

        <StatItem value={convertNumber(item.reviewCount)} label="Reviews" />

        <StatItem value={convertNumber(item.ratingAverage)} label="Rating" />
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, showGithubButton = false }) => {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate(`/repositories/${item.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View testID="repositoryItem" style={styles.container}>
        <AuthorInfo item={item} />
        <StatsInfo item={item} />
        {showGithubButton && <OpenInGithubButton url={item.url} />}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
