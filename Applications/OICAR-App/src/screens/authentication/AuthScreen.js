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
    <Logo style={styles.logo}/>
    <Header style={styles.header}>OICAR</Header>

    <Button mode="contained" onPress={() => props.navigation.navigate('Login')}>
      Prijava
    </Button>
    <Button
      mode="outlined"
      onPress={() => props.navigation.navigate('Registration')}
    >
      Registracija
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  header:{
    fontSize:40,
    fontWeight:"500"
  },
  logo:{
    width:200,
    height:200
  }
});

export default memo(AuthScreen);