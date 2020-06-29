import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: flex-start;
  margin-left: 40px;
`;

export const ButtonBack = styled.TouchableOpacity``;

export const TextDescription = styled.Text`
  font-size: 18px;
  color: #231229;
  margin-left: 20px;
`;

export const AddCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20px;
`;

export const AddCardText = styled.Text`
  margin-left: 10px;
  color: #14b4ff;
  font-weight: bold;
  font-size: 16px;
`;

export const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;
export const AddCardButton = styled.TouchableOpacity`
  margin: 20px auto;
  background: #000;
  padding: 15px;
  width: 300px;
`;

export const AddCardTextButton = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
`;

export const DeleteCardTextContainer = styled.TouchableOpacity`
  align-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const DeleteCardTextButton = styled.Text`
  font-size: 20px;
  color: #dc143c;
`;
