import { useContext, useState } from "react";
import { Button, Text } from "react-native";

import { RewardView, RewardItem } from "../styles/reward.styles";

import { RewardListContext } from "../services/reward-list.context";

export const RewardScreen = () => {
  const { getRandomReward, getRandomOrNoReward } =
    useContext(RewardListContext);
  const [reward, setReward] = useState("");

  return (
    <RewardView>
      <Button
        onPress={() => setReward(getRandomOrNoReward())}
        title="I'm done! Is there a Reward ???"
      />
      <Button
        onPress={() => setReward(getRandomReward())}
        title="I'm done! Give me a Reward!"
      />
      <Text>And your reward today is: </Text>
      <RewardItem label>{reward}</RewardItem>
    </RewardView>
  );
};
