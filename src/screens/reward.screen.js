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

export const RewardScreen = () => {
  const { getRandomReward, getRandomOrNoReward, getSpecialReward } =
    useContext(RewardListContext);
  const [reward, setReward] = useState("");

  return (
    <RewardView>
      <Spacer size="xxl">
        <RewardButton
          onPress={() => setReward(getRandomOrNoReward())}
          title="I'm done! Is there a Reward ???"
        />
      </Spacer>
      <Spacer size="large">
        <RewardButton
          onPress={() => setReward(getRandomReward())}
          title="I'm done! Give me a Nice Reward!"
        />
      </Spacer>
      <Spacer size="large">
        <SpecialRewardButton
          onPress={() => setReward(getSpecialReward())}
          title="I achieved something amazing today! I deserve a Special Reward!"
        />
      </Spacer>
      <Spacer size="xxl">
        <Text>And your reward today is: </Text>
      </Spacer>
      <RewardItem label>{reward}</RewardItem>
    </RewardView>
  );
};
