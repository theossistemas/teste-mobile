import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;

  width: 100%;
  height: 70px;
  background: #232129;
`;

export const ButtonMenu = styled(RectButton)`
  margin-left: 10px;
`;

export const TextName = styled.Text`
  color: #fff;
  margin-right: 10px;
  font-weight: bold;
  margin-left: 20px;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageProfile = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
  border: 2px;
  border-color: #ccc;
`;
