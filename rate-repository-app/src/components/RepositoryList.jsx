import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useNavigate } from "react-router-native";
import { Menu, Button, Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReached,
  order,
  setOrder,
  searchQuery,
  setSearchQuery,
}) => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  const navigate = useNavigate();
  const orderLabels = {
    latest: "Latest repositories",
    highest: "Highest rated repositories",
    lowest: "Lowest rated repositories",
  };

  const selectOrder = (newOrder) => {
    setOrder(newOrder);
    closeMenu();
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Button onPress={openMenu}>{orderLabels[order]}</Button>}
            >
              <Menu.Item
                onPress={() => selectOrder("latest")}
                title="Latest repositories"
              />
              <Menu.Item
                onPress={() => selectOrder("highest")}
                title="Highest rated repositories"
              />
              <Menu.Item
                onPress={() => selectOrder("lowest")}
                title="Lowest rated repositories"
              />
            </Menu>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`repositories/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [value] = useDebounce(searchQuery, 500);
  let orderBy;
  let orderDirection;

  if (order === "latest") {
    orderBy = "CREATED_AT";
    orderDirection = "DESC";
  }

  if (order === "highest") {
    orderBy = "RATING_AVERAGE";
    orderDirection = "DESC";
  }

  if (order === "lowest") {
    orderBy = "RATING_AVERAGE";
    orderDirection = "ASC";
  }

  const { repositories, fetchMore } = useRepositories({
    first: 2,
    orderBy,
    orderDirection,
    searchKeyword: value,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReached={fetchMore}
    />
  );
};

export default RepositoryList;
