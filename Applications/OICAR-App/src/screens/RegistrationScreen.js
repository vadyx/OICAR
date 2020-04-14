import React, { memo, useReducer, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Background from '../components/Background';

import Header from '../components/Header2';
import Button from '../components/Button';
import Input from '../components/Input';
import BackButton from '../components/BackButton';
import { theme } from '../utils/theme';
import {
  emailValidator,
  isEmptyValidator
} from '../utils/validation';

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

    let passwordMatchingError = action.input === 'repassword' ? action.error : '';
    let updatedPasswordsAreMatching = false;
    if (updatedValidities["password"] && updatedValidities["repassword"]) {
      updatedPasswordsAreMatching = updatedValues["password"] === updatedValues["repassword"];

      if (!updatedPasswordsAreMatching) {
        passwordMatchingError = 'Passwords are not matching';
      }
    }

    const updatedErrors = {
      ...state.inputErrors,
      [action.input]: action.input === 'repassword' ? passwordMatchingError : action.error
    };

    let updatedFormIsValid = updatedPasswordsAreMatching;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      inputErrors: updatedErrors,
      passwordsAreMatching: updatedPasswordsAreMatching,
      formIsValid: updatedFormIsValid
    };
  }

  return state;
};

const RegisterScreen = props => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      repassword: ''
    },

    inputValidities: {
      username: false,
      fullName: false,
      email: false,
      password: false,
      repassword: false
    },

    inputErrors: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      repassword: ''
    },

    passwordsAreMatching: false,
    formIsValid: false
  });

  const _onInputChange = useCallback((inputId, inputValue, inputValidity, inputError) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputId,
      value: inputValue,
      isValid: inputValidity,
      error: inputError
    });
  }, [dispatchFormState]);

  const _onSignUpPressed = () => {

    console.log(formState)
    if (formState.formIsValid) {
      props.navigation.navigate('Dashboard');
    }

  };

  return (
    <Background>
      <BackButton goBack={() => props.navigation.goBack()} />

      <Header>Create Account</Header>

      <Input style={styles.input}
        id="username"
        label="Username"
        returnKeyType="next"
        onInputChange={_onInputChange}
        errorText={formState.inputErrors.username}
        required
      />

      <Input style={styles.input}
        id="fullName"
        label="Name"
        returnKeyType="next"
        onInputChange={_onInputChange}
        errorText={formState.inputErrors.fullName}
        required
      />

      <Input style={styles.input}
        id="email"
        label="Email"
        returnKeyType="next"
        onInputChange={_onInputChange}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        errorText={formState.inputErrors.email}
        required
        email
      />

      <Input style={styles.input}
        id="password"
        label="Password"
        returnKeyType="done"
        onInputChange={_onInputChange}
        errorText={formState.inputErrors.password}
        secureTextEntry
        required
      />

      <Input style={styles.input}
        id="repassword"
        label="Confirm Password"
        returnKeyType="done"
        onInputChange={_onInputChange}
        errorText={formState.inputErrors.repassword}
        secureTextEntry
        required
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },

  logo: {
    width: 60,
    height: 60
  },

  button: {
    marginTop: 24,
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

  input:{
    height:32
  }
});

export default memo(RegisterScreen);