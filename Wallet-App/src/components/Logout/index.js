import React from 'react';

import { useAuth } from '../../hooks/auth';

import { View, Button } from 'react-native';

import { StyleSheet } from 'react-native';

export default function Logout() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#232129',
  },
});
