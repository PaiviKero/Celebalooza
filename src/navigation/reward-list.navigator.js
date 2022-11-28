import { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { RewardListScreen } from "../screens/reward-list.screen";
import { RewardListContext } from "../services/reward-list.context";

const Tab = createMaterialTopTabNavigator();

export const RewardListNavigator = () => {
  const { rewardTypes } = useContext(RewardListContext);
  return (
    <Tab.Navigator>
      {Object.keys(rewardTypes).map((rewardType) => {
        return (
          <Tab.Screen
            name={rewardType}
            component={RewardListScreen}
            initialParams={{ rewardType: rewardType }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
