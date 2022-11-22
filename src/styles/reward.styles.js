import styled from "styled-components/native";

import { View, Text, TextInput } from "react-native";

export const RewardView = styled(View)`
  flex: 1;
  margin-top: 8%;
  background-color: #fff;
  align-items: center;
  align-self: center;
`;

export const RewardItem = styled(Text)`
  margin-top: 5px;
  background-color: #ffe5b4;
`;

export const RewardInput = styled(TextInput)`
  padding-left: 5px;
  width: 150px;
  background-color: #ffe5b4;
`;

export const RowContainer = styled.View`
  flex-direction: row;
`;
