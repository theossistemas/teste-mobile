import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Alert, ActivityIndicator } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Image } from 'react-native';

import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  ImageContainer,
  TextContainer,
  TextTitle,
  TextDescription,
  Separator,
  ForgotPassword,
  NotMemberText,
  CreateAccountContainer,
  CreateAccountText,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

function SignIn() {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const passwordInputRef = useRef(null);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);
      } catch (err) {
        const validationErrors = {};

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });

          formRef.current.setErrors(validationErrors);

          return;
        }

        Alert.alert(
          'Erro ao fazer cadastro',
          'Ocorreu um erro ao fazer cadastro! Tente novamente',
        );
      }
      setLoading(false);
    },
    [signIn],
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <ImageContainer>
          <Image source={logo} />
        </ImageContainer>
        <TextContainer>
          <TextTitle>Bem vindo,</TextTitle>
          <TextDescription>faça login para continuar</TextDescription>
        </TextContainer>
        <Separator />

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                secureTextEntry
                returnKeyType="send"
                icon="lock"
                placeholder="Senha"
                onSubmitEditing={() => {
                  formRef.current.submitForm();
                }}
              />
              <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
            </Form>
          </>
        )}

        <Button
          onPress={() => {
            formRef.current.submitForm();
          }}
        >
          Entrar
        </Button>
        <NotMemberText>Ainda não é membro ? </NotMemberText>
        <CreateAccountContainer>
          <CreateAccountText onPress={() => navigation.navigate('SignUp')}>
            Criar uma conta
          </CreateAccountText>
        </CreateAccountContainer>
      </Container>
    </ScrollView>
  );
}

export default SignIn;
