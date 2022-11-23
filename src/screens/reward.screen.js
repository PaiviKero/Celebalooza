import { useContext, useState } from "react";
import { Button, Text } from "react-native";

import { RewardListContext } from "../services/reward-list.context";

import { RewardView, RewardItem } from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";

export const RewardScreen = () => {
  const { getRandomReward, getRandomOrNoReward } =
    useContext(RewardListContext);
  const [reward, setReward] = useState("");

  return (
    <RewardView>
      <Spacer size="xxl">
        <Button
          onPress={() => setReward(getRandomOrNoReward())}
          title="I'm done! Is there a Reward ???"
        />
      </Spacer>
      <Spacer size="large">
        <Button
          onPress={() => setReward(getRandomReward())}
          title="I'm done! Give me a Reward!"
        />
      </Spacer>
      <Spacer size="xxl">
        <Text>And your reward today is: </Text>
      </Spacer>
      <RewardItem label>{reward}</RewardItem>
    </RewardView>
  );
};
