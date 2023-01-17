import { useContext, useState } from "react";
import { FlatList } from "react-native";

import {
  RewardListView,
  RewardItem,
  RewardInput,
  RowContainer,
  AddButton,
  RemoveButton,
  TextItem,
} from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";

import { RewardListContext } from "../services/reward-list.context";
import { strings } from "../services/strings";

export const RewardListScreen = ({ route }) => {
  const { rewardType } = route.params;
  const { rewardTypes, rewardLists, addToList, removeFromList } =
    useContext(RewardListContext);
  const [reward, setReward] = useState("");

  return (
    <RewardListView>
      <Spacer variant="small">
        <TextItem>
          {strings[rewardType]} {strings.REWARDS}:
        </TextItem>
      </Spacer>
      <RowContainer>
        <RewardInput
          label={strings.NEW_REWARD}
          value={reward}
          onChangeText={(t) => {
            setReward(t);
          }}
        />
        <AddButton
          onPress={() => addToList(rewardTypes[rewardType], reward)}
          title={strings.ADD}
        />
      </RowContainer>
      {
        <FlatList
          data={
            rewardLists !== null ? rewardLists[rewardTypes[rewardType]] : []
          }
          renderItem={({ item }) => (
            <RowContainer>
              <RewardItem>
                {strings[item.key] !== undefined ? strings[item.key] : item.key}
              </RewardItem>
              <RemoveButton
                onPress={() =>
                  removeFromList(rewardTypes[rewardType], item.key)
                }
              />
            </RowContainer>
          )}
        />
      }
    </RewardListView>
  );
};
