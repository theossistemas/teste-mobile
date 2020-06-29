import React from 'react';

import { DrawerItemList } from '@react-navigation/drawer';

import { useAuth } from '../../hooks/auth';

import { Container, TextTitle, TextEmail, Separator } from './styles';

function CustomDrawer({ ...props }) {
  const user = useAuth();

  console.log(user);

  return (
    <>
      <Container>
        <TextTitle>{user.user.user.name}</TextTitle>
        <TextEmail>{user.user.user.email}</TextEmail>
        <Separator />
        <DrawerItemList {...props} />
      </Container>
    </>
  );
}

export default CustomDrawer;
