import React, { useRef, useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import * as Yup from 'yup';

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import { Form } from '@unform/mobile';
import Input from '../../components/Input';

import {
  Container,
  TextTitle,
  Separator,
  InputContainer,
  ButtonText,
  ButtonSubmit,
} from './styles';

function AddTransaction({ isVisible, closeModal, wallet }) {
  console.log(wallet);
  const formRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const value_transactionInputRef = useRef(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required(),
          date: Yup.number().required(),
          value_transaction: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`transaction/${wallet.id}`, data);
        console.log(data);

        closeModal();

        Alert.alert('Transação cadastrada com sucesso!');

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
          'Erro ao fazer cadastro de transação',
          'Ocorreu um erro ao fazer cadastro de transação! Tente novamente',
        );
        console.log(err);
      }
    },
    [closeModal, navigation, wallet.id],
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={closeModal}>
      <Container>
        <TextTitle>Informe os dados da transação: </TextTitle>
        <Separator />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            ref={descriptionInputRef}
            containerStyle={{ width: 300, height: 50 }}
            placeholder="Descrição"
            name="description"
          />
          <InputContainer>
            <Input
              ref={dateInputRef}
              containerStyle={{ width: 140, height: 50 }}
              name="date"
              placeholder="Data"
            />
            <Input
              ref={value_transactionInputRef}
              containerStyle={{ width: 120, height: 50 }}
              name="value_transaction"
              keyboardType="numeric"
              placeholder="Valor"
            />
          </InputContainer>

          <ButtonSubmit
            onPress={() => {
              formRef.current.submitForm();
            }}
          >
            <ButtonText>Adicionar Transação</ButtonText>
          </ButtonSubmit>
        </Form>
      </Container>
    </Modal>
  );
}

export default AddTransaction;
