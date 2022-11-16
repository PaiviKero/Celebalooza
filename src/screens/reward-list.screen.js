import { StyleSheet, Text, View, FlatList } from "react-native";

export const RewardListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>List of Rewards:</Text>
      <FlatList
        data={[
          { key: "Go eat out" },
          { key: "Buy something nice" },
          { key: "Cook your favorite meal" },
          { key: "Eat a bit of ice-cream" },
          { key: "Eat a bit of chocolate" },
          { key: "Take a nap" },
          { key: "Take a bath" },
          { key: "Watch your favorite Netflix series" },
          { key: "Watch a movie" },
          { key: "Read a book" },
          { key: "Do a nonogram" },
          { key: "Go for a walk" },
          { key: "Go for a bike ride / swim" },
        ]}
        renderItem={({ item }) => <Text style={styles.titem}> {item.key}</Text>}
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
});
