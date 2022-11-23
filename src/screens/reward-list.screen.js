import { useContext, useState } from "react";
import { Text, FlatList, Button } from "react-native";

import {
  RewardListView,
  RewardItem,
  RewardInput,
  RowContainer,
  AddButton,
  RemoveButton,
} from "../styles/reward.styles";

import { RewardListContext } from "../services/reward-list.context";

export const RewardListScreen = () => {
  const { rewardList, addToList, removeFromList } =
    useContext(RewardListContext);
  const [reward, setReward] = useState("");

  return (
    <RewardListView>
      <RowContainer>
        <RewardInput
          label="New Reward"
          value={reward}
          onChangeText={(t) => {
            setReward(t);
          }}
        />
        <AddButton onPress={() => addToList(reward)} title="Add" />
      </RowContainer>
      <Text>List of Rewards:</Text>
      <FlatList
        data={rewardList}
        renderItem={({ item }) => (
          <RowContainer>
            <RewardItem>{item.key}</RewardItem>
            <RemoveButton onPress={() => removeFromList(item.key)} />
          </RowContainer>
        )}
      />
    </RewardListView>
  );
};
