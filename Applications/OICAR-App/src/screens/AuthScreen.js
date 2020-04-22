import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';

const AuthScreen = props => (
  <Background>
    <Logo />
    <Header>OICAR</Header>

    <Button mode="contained" onPress={() => props.navigation.navigate('Login')}>
      Prijava
    </Button>
    <Button
      mode="outlined"
      onPress={() => props.navigation.navigate('Registration')}
    >
      Registracija
    </Button>
  </Background>
);

export default memo(AuthScreen);