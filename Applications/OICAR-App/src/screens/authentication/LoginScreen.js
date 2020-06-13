import React, { memo, useState, useReducer, useEffect, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
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

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      errorMsg: action.error,
      formIsValid: updatedFormIsValid
    };
  }

  return state;
};

const LoginScreen = props => {
  
  const [showErrors, setShowErrors] = useState(false);
  const [loadVisible,setLoadVisible] = useState(false);
  const [updateInputState, setUpdateInputState] = useState(false);

  const notOnBrowser = Platform.OS === "web" ? false : true;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      password: ''
    },

    inputValidities: {
      username: false,
      password: false
    },

    errorMsg: '',
    formIsValid: false
  });

  const _onInputChange = useCallback((inputId, inputValue, inputValidity) => {

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputId,
      value: inputValue,
      isValid: inputValidity,
      error: 'Pogrešno korisničko ime ili lozinka!'
    });

  }, [dispatchFormState]);

  const _loginHandler = async () => {
    try {
      if (formState.formIsValid) {
        await dispatch(authActions.login(
          formState.inputValues.username,
          formState.inputValues.password
        ));

        return;
      } else {
        setShowErrors(true);
      }
    } catch (error) {
      setShowErrors(true);
    }

    setUpdateInputState(false);
    setLoadVisible(false);
  };

  const _onLoginPressed = () => {

    setShowErrors(false);
    setLoadVisible(true);
    setUpdateInputState(true);

  }

  useEffect(() => {
    _loginHandler(); 
  }, [formState]);

  useEffect(() => {
    if (isLoggedIn) {
      setLoadVisible(false);
      props.navigation.navigate('Home');
    }
  }, [isLoggedIn]);

  return (
    <Background style={styles.container}>
      <BackButton goBack={() => props.navigation.goBack()} />

      <View style={{alignItems: Platform.OS === "web" ? "center" : null}}>
        <Logo />
      </View>
      <Header>Dobrodošli natrag.</Header>

      <Input style={styles.input}
        id="username"
        label="Korisničko ime"
        returnKeyType="next"
        onInputChange={_onInputChange}
        updateState={!!updateInputState}
        login
      />

      <Input style={styles.input}
        id="password"
        label="Lozinka"
        returnKeyType="done"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.errorMsg}
        secureTextEntry
        login
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.label}>Zaboravili ste lozinku?</Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: Platform.OS === "web" ? "center" : null}}>
        <Button mode="contained" onPress={_onLoginPressed} style={styles.button}>
          Prijava
        </Button>
      </View>

      { 
        loadVisible && notOnBrowser &&
        <Loader
          modalVisible={loadVisible}
          animationType="fade"
        />
      }

      <View style={styles.row}>
        <Text style={styles.label}>Još nemate račun? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Registration')}>
          <Text style={styles.link}> Registriraj se!</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent:"center"
  },
  button:{
    width:"40%"
  },

  forgotPassword: {
    width: Platform.OS === "web" ? "100%" : '80%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },

  row: {
    flexDirection: 'row',
    marginTop: 4
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
