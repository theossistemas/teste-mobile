import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';
import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';

import {
  Container,
  ButtonContainer,
  ButtonBack,
  TextDescription,
  InputContainer,
  AddCardButton,
  AddCardTextButton,
  DeleteCardTextContainer,
  DeleteCardTextButton,
} from './styles';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function DetailsCard(props) {
  const cardItem = props.route.params.wallet;

  const navigation = useNavigation();

  const formRef = useRef(null);
  const numberCardInputRef = useRef(null);
  const accountNameInputRef = useRef(null);
  const cvcInputRef = useRef(null);
  const validateInputRef = useRef(null);

  function navigateToCard() {
    navigation.navigate('NewCard');
  }

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          card_number: Yup.number(),
          card_name: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/wallet/${cardItem.id}`, data);
        console.log(data);

        Alert.alert('Cartão atualizado com sucesso!');
        formRef.current.reset();

        navigation.navigate('NewCard');
      } catch (err) {
        const validationErrors = {};

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });

          formRef.current.setErrors(validationErrors);

          console.log(err);

          return;
        }

        console.log(err);
        Alert.alert(
          'Erro ao fazer atualização',
          'Ocorreu um erro ao atualização do cartão! Tente novamente',
        );
      }
    },
    [cardItem.id, navigation],
  );

  const deleteCard = useCallback(() => {
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir o cartão ?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await api.delete(`wallet/${cardItem.id}`);
            Alert.alert('Cartão excluido com sucesso!');
            navigation.navigate('NewCard');
          },
        },
      ],
      { cancelable: false },
    );
  }, [cardItem.id, navigation]);

  return (
    <>
      <Header />
      <ScrollView>
        <Container>
          <ButtonContainer>
            <ButtonBack onPress={navigateToCard}>
              <Icon name="arrow-left" color="#232129" size={20} />
            </ButtonBack>
            <TextDescription>Detalhes do cartão</TextDescription>
          </ButtonContainer>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              card_name: cardItem.card_name,
            }}
          >
            <Input
              ref={numberCardInputRef}
              name="card_number"
              placeholder="Número do cartão"
              icon="credit-card"
              keyboardType="numeric"
            />

            <Input
              ref={accountNameInputRef}
              name="card_name"
              placeholder="Nome Impresso no cartão"
              icon="user"
              autoCorrect={false}
            />

            <InputContainer>
              <Input
                ref={validateInputRef}
                name="due_date"
                placeholder="Validade"
                icon="calendar"
                keyboardType="numeric"
                containerStyle={{ width: 160 }}
                autoCorrect={false}
              />

              <Input
                ref={cvcInputRef}
                name="cvc"
                placeholder="CVC"
                icon="lock"
                keyboardType="numeric"
                containerStyle={{ width: 160 }}
                autoCorrect={false}
              />
            </InputContainer>

            <AddCardButton
              onPress={() => {
                formRef.current.submitForm();
              }}
            >
              <AddCardTextButton>Atualizar cartão</AddCardTextButton>
            </AddCardButton>
            <DeleteCardTextContainer onPress={deleteCard}>
              <DeleteCardTextButton>Exluir cartão</DeleteCardTextButton>
            </DeleteCardTextContainer>
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}

export default DetailsCard;
