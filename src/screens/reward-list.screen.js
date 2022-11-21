import { useContext } from "react";
import { Text, FlatList } from "react-native";

import { RewardView, RewardItem } from "../styles/reward.styles";

import { RewardListContext } from "../services/reward-list.context";

export const RewardListScreen = () => {
  const { rewardList } = useContext(RewardListContext);

  return (
    <RewardView>
      <Text>List of Rewards:</Text>
      <FlatList
        data={rewardList}
        renderItem={({ item }) => <RewardItem>{item.key}</RewardItem>}
      />
    </RewardView>
  );
};
