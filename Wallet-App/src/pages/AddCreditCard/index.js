import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';

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
} from './styles';
import { Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import api from '../../services/api';

function AddCreditCard() {
  const [loading, setLoading] = useState(false);

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
        setLoading(true);

        const schema = Yup.object().shape({
          card_name: Yup.string().required(),
          card_number: Yup.number().required(),
          cvc: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/wallet', data);
        console.log(data);

        Alert.alert('Cartão cadastrado com sucesso!');

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
        }

        Alert.alert(
          'Erro ao fazer cadastro',
          'Ocorreu um erro ao fazer cadastro! Tente novamente',
        );
      }
      setLoading(false);
    },
    [navigation],
  );

  return (
    <>
      <Header />
      <ScrollView>
        <Container>
          <ButtonContainer>
            <ButtonBack onPress={navigateToCard}>
              <Icon name="arrow-left" color="#232129" size={20} />
            </ButtonBack>
            <TextDescription>Adicionar cartão de crédito</TextDescription>
          </ButtonContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
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

            {loading ? (
              <ActivityIndicator
                size={35}
                color="#000"
                style={{ alignContent: 'center', marginTop: 40 }}
              />
            ) : (
              <AddCardButton
                onPress={() => {
                  formRef.current.submitForm();
                }}
              >
                <AddCardTextButton>Adicionar cartão</AddCardTextButton>
              </AddCardButton>
            )}
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}

export default AddCreditCard;
