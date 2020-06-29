import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 350px;
  height: 50px;
  background: #2367eb;

  justify-content: center;
  align-items: center;

  margin: 20px auto;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;
