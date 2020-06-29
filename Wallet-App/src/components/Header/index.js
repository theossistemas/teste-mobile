import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  ButtonMenu,
  ProfileContainer,
  TextName,
  ImageProfile,
} from './styles';

import profileImg from '../../assets/profile.jpeg';

function Header() {
  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <>
      <Container>
        <ButtonMenu onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" color="#FFF" size={30} />
        </ButtonMenu>
        <ProfileContainer>
          <TextName>{`Olá, ${user.user.name}`} </TextName>
          <ImageProfile source={profileImg} />
        </ProfileContainer>
      </Container>
    </>
  );
}

export default Header;
