import React, { useRef, useCallback, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Image, Alert } from 'react-native';

import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import {
  Container,
  ImageContainer,
  TextContainer,
  TextTitle,
  Separator,
  CreateAccountContainer,
  CreateAccountText,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

function SignIn() {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        console.log(data);

        Alert.alert('Usuario cadastrado com sucesso!');

        navigation.navigate('SignIn');
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
    },
    [navigation],
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <ImageContainer>
          <Image source={logo} />
        </ImageContainer>
        <TextContainer>
          <TextTitle>Crie sua conta</TextTitle>
        </TextContainer>
        <Separator />

        <Form ref={formRef} onSubmit={handleSignUp}>
          <Input
            autoCorrect={false}
            autoCapitalize="words"
            name="name"
            icon="user"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current.focus();
            }}
          />
          <Input
            ref={emailInputRef}
            name="email"
            icon="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current.focus();
            }}
          />

          <Input
            ref={passwordInputRef}
            name="password"
            secureTextEntry
            returnKeyType="send"
            icon="lock"
            placeholder="Senha"
          />
        </Form>
        <Button
          onPress={() => {
            formRef.current.submitForm();
          }}
        >
          Entrar
        </Button>

        <CreateAccountContainer>
          <CreateAccountText onPress={() => navigation.navigate('SignIn')}>
            Voltar para login
          </CreateAccountText>
        </CreateAccountContainer>
      </Container>
    </ScrollView>
  );
}

export default SignIn;
