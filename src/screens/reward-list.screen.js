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
  const {
    rewardTypes,
    rewardLists,
    addToList,
    removeFromList,
    resetToDefault,
  } = useContext(RewardListContext);
  const [reward, setReward] = useState("");

  return (
    <RewardListView>
      <RewardButton
        onPress={() => resetToDefault()}
        title="Reset to Defaults"
      />
      {Object.keys(rewardTypes).map((rewardType) => {
        return (
          <>
            <Spacer variant="small">
              <TextItem>List of {rewardType} Rewards:</TextItem>
            </Spacer>
            <RowContainer>
              <RewardInput
                label="New Reward"
                value={reward}
                onChangeText={(t) => {
                  setReward(t);
                }}
              />
              <AddButton
                onPress={() => addToList(rewardTypes[rewardType], reward)}
                title="Add"
              />
            </RowContainer>
            {
              <FlatList
                data={rewardLists[rewardTypes[rewardType]]}
                renderItem={({ item }) => (
                  <RowContainer>
                    <RewardItem>{item.key}</RewardItem>
                    <RemoveButton
                      onPress={() =>
                        removeFromList(rewardTypes[rewardType], item.key)
                      }
                    />
                  </RowContainer>
                )}
              />
            }
          </>
        );
      })}
    </RewardListView>
  );
};
