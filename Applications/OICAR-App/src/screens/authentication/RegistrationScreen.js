import React, { memo, useReducer, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { useDispatch } from 'react-redux';

import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import Loader from '../../components/Loader';
import * as authActions from '../../store/actions/auth';
import { theme } from '../../utils/theme';

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
        passwordMatchingError = 'Lozinke se ne podudaraju';
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

  const [showErrors, setShowErrors] = useState(false);
  const [loadVisible,setLoadVisible] = useState(false);
  const [updateInputState, setUpdateInputState] = useState(false);

  const notOnBrowser = Platform.OS === "web" ? false : true;

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: ''
    },

    inputValidities: {
      username: false,
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      repassword: false
    },

    inputErrors: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: ''
    },

    passwordsAreMatching: false,
    formIsValid: false
  });

  const _regHandler = async () => {
    try {
      if (formState.formIsValid) {
        await dispatch(authActions.registration(
          formState.inputValues.username,
          formState.inputValues.firstName,
          formState.inputValues.lastName,
          formState.inputValues.email,
          formState.inputValues.password
        ));  
        
        // ubaci modal
        props.navigation.navigate('Auth');
      }

      //show Registration Successful modal

    } catch (error) {
      _onInputChange(error.id, formState.inputValues[error.id], false, error.message);
    }

    setUpdateInputState(false);
    setLoadVisible(false);
    setShowErrors(true);
  };

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

    setShowErrors(false);
    setLoadVisible(true);
    setUpdateInputState(true);

  };

  useEffect(() => {
    _regHandler();
  }, [formState]);

  return (
    
    <Background style={styles.background}>
      <BackButton goBack={() => props.navigation.goBack()} />
      <Header style={styles.header}>Registracija</Header>

      <Input style={styles.input}
        id="username"
        label="Korisničko ime"
        returnKeyType="next"
        autoCapitalize="none"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.username}
        required
        minLength={4}
        maxLength={32}
        username
        registration
      />

      <Input style={styles.input}
        id="firstName"
        label="Ime"
        returnKeyType="next"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.firstName}
        required
        registration
      />

      <Input style={styles.input}
        id="lastName"
        label="Prezime"
        returnKeyType="next"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.lastName}
        required
        registration
      />

      <Input style={styles.input}
        id="email"
        label="Adresa e-pošte"
        returnKeyType="next"
        onInputChange={_onInputChange}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.email}
        required
        registration
        email
      />

      <Input style={styles.input}
        id="password"
        label="Lozinka"
        returnKeyType="done"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.password}
        secureTextEntry
        minLength={8}
        maxLength={64}
        required
        password
        registration
      />

      <Input style={styles.input}
        id="repassword"
        label="Ponovljena lozinka"
        returnKeyType="done"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.repassword}
        secureTextEntry
        required
        registration
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Registriraj se
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Već imate račun? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.link}> Prijava</Text>
        </TouchableOpacity>
      </View>
      {
        loadVisible && notOnBrowser &&
        <Loader
            modalVisible={loadVisible}
            animationType="fade"
        />
      }
    </Background>
  );
};

const styles = StyleSheet.create({

  background:{
    paddingTop: 80
  },

  header:{
    paddingBottom:11
  },

  label: {
    color: theme.colors.secondary,
  },

  button: {
    marginTop: 24,
    width:"60%"
  },

  row: {
    flexDirection: 'row'
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
