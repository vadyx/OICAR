import React, { memo } from 'react';
import {StyleSheet} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';

const AuthScreen = props => (
  <Background>
    <Logo />
    <Header>OICAR</Header>

    <Button mode="contained" onPress={() => props.navigation.navigate('Login')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => props.navigation.navigate('Registration')}
    >
      Sign Up
    </Button>
  </Background>
);

/*const styles = StyleSheet.create({
  background:{
    paddingTop:200
  }

});
*/

export default memo(AuthScreen);