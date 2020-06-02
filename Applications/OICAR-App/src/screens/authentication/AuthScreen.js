import React, { memo } from 'react';
import {
  StyleSheet
} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';

const AuthScreen = props => (
  <Background style={styles.container}>
    <Logo/>
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

const styles = StyleSheet.create({
  container: {
    paddingTop:130,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});

export default memo(AuthScreen);