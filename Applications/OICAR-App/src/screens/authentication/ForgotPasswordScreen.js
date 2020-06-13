import React, { memo, useState} from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

import { emailValidator } from '../../utils/validation';

import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';

import { theme } from '../../utils/theme';


const ForgotPasswordScreen = props => {
  const [email, setEmail] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    props.navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={() => props.navigation.goBack()} />

      <Logo style={styles.logo} />

      <Header>Oporavak računa</Header>

      {/* <Input
        id="email"
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      /> */}

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Pošalji instrukcije oporavka
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => props.navigation.navigate('Login')}
      >
        <Text style={styles.label}>← Povratak na prijavu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  back: {
    width: '90%',
    marginTop: 12,
  },

  button: {
    marginTop: 12,
    width:'85%',
  },

  label: {
    color: theme.colors.secondary
  },
  logo:{
    width:200,
    height:200
  }
  

});

export default memo(ForgotPasswordScreen);
