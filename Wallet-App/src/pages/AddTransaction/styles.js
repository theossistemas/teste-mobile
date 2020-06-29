import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const TextTitle = styled.Text`
  margin: 10px;
  margin-right: auto;
`;

export const Separator = styled.View`
  width: 280px;
  margin: 10px;
  height: 1px;
  background: #a8a5ab;
`;

export const InputContainer = styled.View`
  flex-direction: row;
`;

export const ButtonSubmit = styled.TouchableOpacity`
  padding: 12px 0;
  background: #000;
  margin: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  text-align: center;
`;
