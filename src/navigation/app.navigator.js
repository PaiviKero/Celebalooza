import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { RewardListContextProvider } from "../services/reward-list.context";
import { RewardListNavigator } from "../navigation/reward-list.navigator";
import { RewardScreen } from "../screens/reward.screen";
import { SettingsScreen } from "../screens/settings.screen";

const TAB_ICON = {
  Rewards: "happy",
  RewardList: "list",
  Settings: "settings",
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ focused, size, color }) => {
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
  };
};

export const AppNavigator = () => {
  return (
    <RewardListContextProvider>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen
          name="Rewards"
          options={{ headerShown: false }}
          component={RewardScreen}
        />
        <Tab.Screen
          name="RewardList"
          options={{ headerShown: false }}
          component={RewardListNavigator}
        />
        <Tab.Screen
          name="Settings"
          options={{ headerShown: false }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </RewardListContextProvider>
  );
};
