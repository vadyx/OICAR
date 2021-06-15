import React, { memo } from 'react';
import {
  StyleSheet, View
} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { theme } from '../../utils/theme';

const AuthScreen = props => (
  <View style={styles.container}>
    <Logo style={styles.logo} />
    <Header style={styles.header}>OICAR</Header>

    <Button
      mode="contained"
      onPress={() => props.navigation.navigate('Login')}
      style={{ borderRadius: 10 }}
    >
      Prijava
    </Button>
    <Button
      mode="outlined"
      onPress={() => props.navigation.navigate('Registration')}
      style={{ borderRadius: 10 }}
    >
      Registracija
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',

  },
  header: {
    fontSize: 40,
    fontWeight: "500",
    marginBottom:16
  },
  logo: {
    marginLeft: 15,
    marginBottom: -30,
    width: 300,
    height: 300
  }
});

export default memo(AuthScreen);