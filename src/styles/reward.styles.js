import styled from "styled-components/native";

import { Button } from "react-native";
import { Text, TextInput, IconButton } from "react-native-paper";

import { colors } from "./colors";

export const RewardListView = styled.View`
  flex: 1;
  margin-top: 8%;
  background-color: ${(props) => colors.bg};
  align-items: center;
  align-self: center;
  width: 100%;
`;

export const RewardView = styled.View`
  flex: 1;
  margin-top: 8%;
  background-color: ${(props) => colors.bg};
  align-items: center;
  align-self: center;
  width: 100%;
`;

export const RewardItem = styled(Text)`
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 5px;
  margin-left: 10px;
  background-color: ${(props) => colors.ui.primary};
  width: 85%;
`;

export const RewardInput = styled(TextInput)`
  padding-left: 5px;
  background-color: ${(props) => colors.ui.primary};
  width: 80%;
`;

export const RowContainer = styled.View`
  flex-direction: row;
`;

export const RewardButton = styled(Button).attrs({
  color: colors.ui.secondary,
})``;

export const AddButton = styled(Button).attrs({
  color: colors.ui.secondary,
})``;

export const RemoveButton = styled(IconButton).attrs({
  mode: "contained",
  color: colors.ui.tertiary,
  icon: "close-thick",
  size: 15,
})``;
