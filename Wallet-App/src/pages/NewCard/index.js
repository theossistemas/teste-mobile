import React, { useState, useCallback, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';

import { useNavigation } from '@react-navigation/native';

import AddTransaction from '../AddTransaction';

import cardImg from '../../assets/card-image.png';

import {
  Container,
  CardImage,
  TextDescription,
  AddCardContainer,
  AddCardText,
  CardStyleContainer,
  CardStyleContainer2,
  CardStyleTextContainer,
  CardText,
  CardStyle,
  ButtonsContainer,
  ButtonContainerCard,
  AddNewCardButton,
  Separator,
  TransactionContainer,
  TransactionText,
  TransactionList,
  Transactions,
  TransactionTitle,
  TransactionValue,
  TransactionDate,
} from './styles';
import api from '../../services/api';
import { FlatList } from 'react-native-gesture-handler';

function NewCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();

  function handleNavigateAddCreditCard() {
    navigation.navigate('AddCreditCard');
  }

  function handleNavigateToDetailsCard(wallet) {
    navigation.navigate('DetailsCard', { wallet });
  }

  useEffect(() => {
    async function loadWallets() {
      const response = await api.get('/wallet');
      setWallets(response.data);
    }
    loadWallets();
  }, []);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  useEffect(() => {
    async function loadTransactions() {
      const response = await api.get(`transaction/${walletId}`);
      setTransactions(response.data);
    }
    loadTransactions();
  }, [walletId, wallets]);

  const walletId = wallets.map(item => item.id).toString();

  return (
    <>
      <Header />
      <Container>
        {wallets.length > 0 ? (
          <>
            <CardStyleContainer
              onPress={handleNavigateToDetailsCard}
              activeOpacity={0.9}
            >
              <FlatList
                data={wallets}
                keyExtractor={item => String(item.id)}
                renderItem={({ item: wallet }) => (
                  <CardStyleContainer
                    onPress={() => handleNavigateToDetailsCard(wallet)}
                  >
                    <AddTransaction
                      isVisible={modalVisible}
                      closeModal={closeModal}
                      wallet={wallet}
                    />
                    <CardStyleTextContainer>
                      <CardStyleContainer2 />
                      <CardText>Visa</CardText>
                      <CardStyle>{wallet.card_number}</CardStyle>
                    </CardStyleTextContainer>
                  </CardStyleContainer>
                )}
              />
            </CardStyleContainer>
            <ButtonsContainer>
              <ButtonContainerCard onPress={handleNavigateAddCreditCard}>
                <Icon name="plus-square" size={20} color="#6293cb" />
                <AddNewCardButton>Adicionar novo Cartão</AddNewCardButton>
              </ButtonContainerCard>
            </ButtonsContainer>
            <ButtonContainerCard
              onPress={openModal}
              style={{ marginLeft: 50, marginBottom: 20 }}
            >
              <Icon name="plus-square" size={20} color="#232129" />
              <AddNewCardButton style={{ color: '#232129' }}>
                Adicionar nova Transação
              </AddNewCardButton>
            </ButtonContainerCard>
            <Separator />
            <TransactionContainer>
              <TransactionText>Transações recentes: </TransactionText>
              <FlatList
                data={transactions}
                keyExtractor={item => String(item.id)}
                renderItem={({ item: transaction }) => (
                  <TransactionList>
                    <Transactions>
                      <TransactionTitle>
                        {transaction.description}
                      </TransactionTitle>
                      <TransactionValue>
                        R$ {transaction.value_transaction}
                      </TransactionValue>
                    </Transactions>
                    <TransactionDate>{transaction.date}</TransactionDate>
                  </TransactionList>
                )}
              />

              {/* <TransactionList>
                <Transactions>
                  <TransactionTitle>Uber</TransactionTitle>
                  <TransactionValue>R$ 14,56</TransactionValue>
                </Transactions>
                <TransactionDate>12/06</TransactionDate>
              </TransactionList> */}

              <Separator />

              <TransactionList>
                <Transactions>
                  <TransactionTitle>Compra no supermecado</TransactionTitle>
                  <TransactionValue>R$ 14,56</TransactionValue>
                </Transactions>
                <TransactionDate>12/06</TransactionDate>
              </TransactionList>
            </TransactionContainer>
          </>
        ) : (
          <>
            <CardImage source={cardImg} />
            <TextDescription>Nenhum cartão cadastrado</TextDescription>
            <AddCardContainer onPress={handleNavigateAddCreditCard}>
              <Icon name="plus-square" color="#000" size={20} />
              <AddCardText>Adicionar novo cartão</AddCardText>
            </AddCardContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default NewCard;
