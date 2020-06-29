import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-content: center;
  align-items: center;
  margin-top: 60px;

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export const CardImage = styled.Image``;

export const TextDescription = styled.Text`
  margin-top: 20px;
  color: #000;
`;

export const AddCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20px;
`;

export const AddCardText = styled.Text`
  margin-left: 10px;
  color: #000;
  font-weight: bold;
  font-size: 16px;
`;

export const CardStyleContainer = styled.TouchableOpacity`
  width: 280px;
  height: 170px;
  background: #456bfe;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid;
  border-color: #232129;
`;

export const CardStyleContainer2 = styled.View`
  position: absolute;
  height: 170px;
  width: 280px;
  background: #53cc86;
  border: 1px solid;
  border-color: #232129;
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-radius: 10px;
`;

export const CardStyleTextContainer = styled.View`
  align-content: flex-end;
  align-items: center;

  margin-top: auto;
`;

export const CardText = styled.Text`
  color: #fff;
  margin-bottom: 40px;
  font-size: 18px;
`;

export const CardStyle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  color: #fff;
  font-weight: bold;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

export const ButtonContainerCard = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const AddNewCardButton = styled.Text`
  margin-left: 10px;
  color: #6293cb;
  font-size: 16px;
`;

export const Separator = styled.View`
  width: 320px;
  height: 2px;
  background: #cebbbb;
`;

export const TransactionContainer = styled.View`
  margin-top: 20px;
`;

export const TransactionText = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const TransactionList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-top: 10px;
`;

export const Transactions = styled.View`
  align-content: flex-start;
  margin-bottom: 10px;
`;

export const TransactionTitle = styled.Text`
  margin-bottom: 2px;

  margin-right: 20px;
`;

export const TransactionValue = styled.Text`
  font-size: 12px;
`;

export const TransactionDate = styled.Text`
  color: #a8a5ab;
  font-size: 12px;
`;
