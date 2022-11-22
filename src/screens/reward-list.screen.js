import { useContext, useState } from "react";
import { Text, FlatList, Button } from "react-native";

import {
  RewardListView,
  RewardItem,
  RewardInput,
  RowContainer,
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
        <Button onPress={() => addToList(reward)} title="Add" />
      </RowContainer>
      <Text>List of Rewards:</Text>
      <FlatList
        data={rewardList}
        renderItem={({ item }) => (
          <RowContainer>
            <RewardItem>{item.key}</RewardItem>
            <Button onPress={() => removeFromList(item.key)} title="X" />
          </RowContainer>
        )}
      />
    </RewardListView>
  );
};
