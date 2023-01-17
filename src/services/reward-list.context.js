import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "./authentication.context";
import { strings } from "./strings";
export const RewardListContext = createContext();

export const RewardListContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [rewardLists, setRewardLists] = useState(null);
  const rewardTypes = {
    NICE: "nice",
    GOOD: "good",
    GREAT: "great",
    SPECIAL: "special",
  };
  const niceCount = 15;
  const goodCount = 6;
  const greatCount = 2;
  const specialCount = 1;
  const rewardSlots = {
    NoReward: 25, // 25% chance (0-25)
    NiceReward: 75, // 50% change (25-75)
    GoodReward: 95, // 20% change (75-95)
    GreatReward: 100, // 5% change (95-100)
  };

  const createDefaultList = (count, type) => {
    return Array.apply(null, { length: count })
      .map(Number.call, Number)
      .map((number) => {
        return { key: "DEFAULT_" + type.toUpperCase() + "_" + (number + 1) };
      });
  };

  const setDefaultRewardLists = () => {
    setRewardLists(null);
    setRewardLists({
      [rewardTypes.NICE]: createDefaultList(niceCount, rewardTypes.NICE),
      [rewardTypes.GOOD]: createDefaultList(goodCount, rewardTypes.GOOD),
      [rewardTypes.GREAT]: createDefaultList(greatCount, rewardTypes.GREAT),
      [rewardTypes.SPECIAL]: createDefaultList(
        specialCount,
        rewardTypes.SPECIAL
      ),
    });
  };

  const clearRewardLists = () => {
    setRewardLists({
      [rewardTypes.NICE]: [],
      [rewardTypes.GOOD]: [],
      [rewardTypes.GREAT]: [],
      [rewardTypes.SPECIAL]: [],
    });
  };

  useEffect(() => {
    const saveRewardList = async (list) => {
      try {
        const saveKey = "@rewardlists-" + user;
        const saveValue = JSON.stringify(rewardLists);
        await AsyncStorage.setItem(saveKey, saveValue);
      } catch (e) {
        console.error("error storing reward list");
      }
    };

    if (user && rewardLists !== null) {
      saveRewardList(rewardLists);
    }
  }, [rewardLists, user]);

  useEffect(() => {
    const loadRewardList = async () => {
      try {
        const loadKey = "@rewardlists-" + user;
        const loadValue = await AsyncStorage.getItem(loadKey);
        if (loadValue !== "null") {
          setRewardLists(JSON.parse(loadValue));
        }
      } catch (e) {
        console.error("error loading reward list");
      }
    };

    if (user) {
      loadRewardList();
    }
  }, [user]);

  const add = (rewardType, reward) => {
    if (!rewardLists) {
      setRewardLists({ [rewardType]: [{ key: reward }] });
    } else if (!rewardLists[rewardType]) {
      setRewardLists({ ...rewardLists, [rewardType]: [{ key: reward }] });
    } else {
      setRewardLists({
        ...rewardLists,
        [rewardType]: [...rewardLists[rewardType], { key: reward }],
      });
    }
  };

  const remove = (rewardType, reward) => {
    const newRewardList = rewardLists[rewardType].filter(
      (x) => x.key !== reward
    );

    setRewardLists({ ...rewardLists, [rewardType]: newRewardList });
  };

  const getRandom = (rewardType) => {
    if (!rewardType) {
      rewardType = rewardTypes.NICE;
    }
    const randomIndex = Math.floor(
      Math.random() * rewardLists[rewardType].length
    );

    let rewardString = rewardLists[rewardType][randomIndex].key;
    if (rewardString.startsWith("DEFAULT_")) {
      rewardString = strings[rewardString];
    }
    return rewardString;
  };

  const getRandomOrNo = () => {
    const rewardSlot = Math.random();
    if (rewardSlot < rewardSlots.NoReward / 100) {
      return strings.JOY_REWARD;
    } else if (rewardSlot < rewardSlots.NiceReward / 100) {
      return getRandom(rewardTypes.NICE);
    } else if (rewardSlot < rewardSlots.GoodReward / 100) {
      return getRandom(rewardTypes.GOOD);
    } else {
      return getRandom(rewardTypes.GREAT);
    }
  };

  const getSpecial = () => {
    if (Math.random() > 0.75) {
      return getRandom(rewardTypes.GREAT);
    } else {
      return getRandom(rewardTypes.SPECIAL);
    }
  };

  return (
    <RewardListContext.Provider
      value={{
        rewardTypes,
        rewardLists,
        addToList: add,
        removeFromList: remove,
        getRandomReward: getRandom,
        getRandomOrNoReward: getRandomOrNo,
        resetToDefault: setDefaultRewardLists,
        clearLists: clearRewardLists,
        getSpecialReward: getSpecial,
      }}
    >
      {children}
    </RewardListContext.Provider>
  );
};
