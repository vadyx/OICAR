import React, { memo, useState, useReducer, useEffect, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import BackButton from '../components/BackButton';
import { theme } from '../utils/theme';
import { emailValidator, isEmptyValidator } from '../utils/validation';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }

  return state;
};

const LoginScreen = ({ navigation }) => {
  
  const [showErrors, setShowErrors] = useState(false);
  const [updateInputState, setUpdateInputState] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      password: ''
    },

    inputValidities: {
      username: false,
      password: false
    },

    formIsValid: false
  });

  useEffect(() => {
    setUpdateInputState(false);

    if(formState.formIsValid) {
      setShowErrors(false);
      props.navigation.navigate('Dashboard');
    }
  }, [formState]);

  const _onInputChange = useCallback((inputId, inputValue, inputValidity) => {

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputId,
      value: inputValue,
      isValid: inputValidity
    });

  }, [dispatchFormState]);

  const _onLoginPressed = () => {
    setShowErrors(true);
    setUpdateInputState(true);
  }

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Home')} />

      <Logo />

      <Header>Welcome back.</Header>

      <Input style={styles.input}
        id="username"
        label="Username"
        returnKeyType="next"
        onInputChange={_onInputChange}
        updateState={!!updateInputState}
        required
        login
      />

      <Input style={styles.input}
        id="password"
        label="Password"
        returnKeyType="done"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={'Wrong username or password!'}
        secureTextEntry
        required
        login
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  label: {
    color: theme.colors.secondary,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
  
});

export default memo(LoginScreen);
