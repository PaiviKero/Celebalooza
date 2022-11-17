import { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { RewardListContext } from "../services/reward-list.context";

export const RewardListScreen = () => {
  const { rewardList } = useContext(RewardListContext);

  return (
    <View style={styles.container}>
      <Text>List of Rewards:</Text>
      <FlatList
        data={rewardList}
        renderItem={({ item }) => <Text style={styles.item}> {item.key}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "8%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#FFE5B4",
    padding: 3,
    marginVertical: 3,
    marginHorizontal: 16,
  },
});
