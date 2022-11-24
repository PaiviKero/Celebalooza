import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "./authentication.context";
export const RewardListContext = createContext();

export const RewardListContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [rewardList, setRewardList] = useState(null);

  const setDefaultRewardList = () => {
    setRewardList([
      { key: "Go eat out" },
      { key: "Buy something nice" },
      /*  { key: "Cook your favorite meal" },
      { key: "Eat a bit of ice-cream" },
      { key: "Eat a bit of chocolate" },
      { key: "Take a nap" },
      { key: "Take a bath" },
      { key: "Watch your favorite Netflix series" },
      { key: "Watch a movie" },
      { key: "Read a book" },
      { key: "Do a nonogram" },
      { key: "Go for a walk" },
      { key: "Go for a bike ride / swim" },
      { key: "Have a glass of smoothie" },
      { key: "Have a glass of juice" },
      { key: "Have a cup of yummy tea" },
      { key: "Eat a fruit" },
      { key: "Eat a protein bar" },
      { key: "Listen to a song" },
      { key: "Dance a bit" },
      { key: "Relax in the warmth of the sun" },
      { key: "Stretch a bit" },
      */
    ]);
  };

  useEffect(() => {
    const saveRewardList = async () => {
      try {
        const saveKey = "@rewardlist-" + user;
        const saveValue = JSON.stringify(rewardList);
        await AsyncStorage.setItem(saveKey, saveValue);
      } catch (e) {
        console.error("error storing reward list");
      }
    };

    if (user && rewardList !== null) {
      saveRewardList(rewardList);
    }
  }, [rewardList, user]);

  useEffect(() => {
    const loadRewardList = async () => {
      try {
        const loadKey = "@rewardlist-" + user;
        const loadValue = await AsyncStorage.getItem(loadKey);
        if (loadValue !== "null") {
          setRewardList(JSON.parse(loadValue));
        }
      } catch (e) {
        console.error("error loading reward list");
      }
    };

    if (user) {
      loadRewardList();
    }
  }, [user]);

  const add = (reward) => {
    if (rewardList === null) {
      setRewardList([{ key: reward }]);
    } else {
      setRewardList([...rewardList, { key: reward }]);
    }
  };

  const remove = (reward) => {
    const newRewardList = rewardList.filter((x) => x.key !== reward);

    setRewardList(newRewardList);
  };

  const getRandom = () => {
    const randomIndex = Math.floor(Math.random() * rewardList.length);
    return rewardList[randomIndex].key;
  };

  const getRandomOrNo = () => {
    if (Math.random() > 0.25) {
      return getRandom();
    } else {
      return "This time your reward is the joy of job well done!";
    }
  };

  return (
    <RewardListContext.Provider
      value={{
        rewardList,
        addToList: add,
        removeFromList: remove,
        getRandomReward: getRandom,
        getRandomOrNoReward: getRandomOrNo,
      }}
    >
      {children}
    </RewardListContext.Provider>
  );
};
