import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ImageContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const TextContainer = styled.View`
  margin-left: 20px;
`;

export const TextTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

export const TextDescription = styled.Text`
  font-size: 12px;
`;

export const Separator = styled.View`
  width: 350px;
  height: 2px;
  background: #cebbbb;
  margin: 30px auto;
`;

export const ForgotPassword = styled.Text`
  color: #0474b2;
  margin-left: 30px;
  margin-top: 10px;
  font-size: 16px;
`;

export const NotMemberText = styled.Text`
  margin: 5px auto;
`;

export const CreateAccountContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;

  margin-top: 10px;
`;

export const CreateAccountText = styled.Text`
  font-size: 20px;
  color: #0474b2;
`;
