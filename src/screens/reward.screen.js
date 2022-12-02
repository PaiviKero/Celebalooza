import { useContext, useState } from "react";
import { Text } from "react-native";

import { RewardListContext } from "../services/reward-list.context";

import {
  RewardView,
  RewardItem,
  RewardButton,
  SpecialRewardButton,
} from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";
import { strings } from "../services/strings";

export const RewardScreen = () => {
  const { getRandomReward, getRandomOrNoReward, getSpecialReward } =
    useContext(RewardListContext);
  const [reward, setReward] = useState("");

  return (
    <RewardView>
      <Spacer size="xxl">
        <RewardButton
          onPress={() => setReward(getRandomOrNoReward())}
          title={strings.IS_REWARD_BUTTON}
        />
      </Spacer>
      <Spacer size="large">
        <RewardButton
          onPress={() => setReward(getRandomReward())}
          title={strings.NICE_REWARD_BUTTON}
        />
      </Spacer>
      <Spacer size="large">
        <SpecialRewardButton
          onPress={() => setReward(getSpecialReward())}
          title={strings.SPECIAL_REWARD_BUTTON}
        />
      </Spacer>
      <Spacer size="xxl">
        <Text>{strings.REWARD_RESULT}:</Text>
      </Spacer>
      <RewardItem label>{reward}</RewardItem>
    </RewardView>
  );
};
