import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import * as authActions from '../store/actions/auth';

const DashboardScreen = props => {

  const dispatch = useDispatch();

  const _logoutHandler = () => {
    dispatch(authActions.logout());
    props.navigation.navigate('Auth');
  };
  
  return (
    <Background>
      <Logo />
      <Header>Krenimo !</Header>
      <Paragraph>
        Dobrodošli u OICAR aplikaciju
      </Paragraph>
      <Button mode="outlined" onPress={_logoutHandler}>
        Odjavite se
      </Button>
    </Background>
  );
};

export default memo(DashboardScreen);