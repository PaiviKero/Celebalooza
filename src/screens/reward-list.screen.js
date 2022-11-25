import { useContext, useState } from "react";
import { FlatList } from "react-native";

import {
  RewardListView,
  RewardItem,
  RewardInput,
  RowContainer,
  AddButton,
  RemoveButton,
  RewardButton,
  TextItem,
} from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";

import { RewardListContext } from "../services/reward-list.context";

export const RewardListScreen = () => {
  const { rewardList, addToList, removeFromList, resetToDefault } =
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
      <Spacer variant="small">
        <RowContainer>
          <TextItem>List of Rewards:</TextItem>
          <RewardButton
            onPress={() => resetToDefault()}
            title="Reset to Defaults"
          />
        </RowContainer>
      </Spacer>
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
