import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const App = createDrawerNavigator();

import CustomDrawer from '../components/CustomDrawer';

import { View, Text } from 'react-native';

import NewCard from '../pages/NewCard';
import AddCreditCard from '../pages/AddCreditCard';
import Logout from '../components/Logout';
import DetailsCard from '../pages/DetailsCard';

function AppRoutes() {
  return (
    <App.Navigator
      drawerStyle={{
        backgroundColor: '#fff',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      openByDefault={NewCard}
      children
    >
      <App.Screen
        options={{
          drawerIcon: () => (
            <Icon name="credit-card" size={20} color="#14b4ff" />
          ),

          title: 'Meus cartões',
        }}
        name="NewCard"
        component={NewCard}
        initialParams={NewCard}
      />

      <App.Screen
        options={{
          title: 'Adicionar um novo cartão',
          drawerIcon: () => (
            <Icon name="plus-square" size={20} color="#14b4ff" />
          ),
        }}
        title="Adicionar um novo cartão"
        name="AddCreditCard"
        component={AddCreditCard}
      />

      <App.Screen
        options={{
          drawerIcon: () => <Icon name="log-out" size={20} color="#14b4ff" />,
        }}
        name="Logout"
        component={Logout}
      />

      <App.Screen
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
        name="DetailsCard"
        component={DetailsCard}
      />
    </App.Navigator>
  );
}

export default AppRoutes;
