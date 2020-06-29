import React, { useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { 
  isEmptyValidator,
  minLengthValidator,
  maxLengthValidator, 
  emailValidator,
  usernameValidator,
  passwordValidator,
  numberValidator,
  minNumberValidator,
  maxNumberValidator
} from '../utils/validation';
import { theme } from '../utils/theme';

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch (action.type) {
      case INPUT_CHANGE:
        return {
          ...state,
          value: action.value,
          isValid: action.isValid,
          error: action.error
        };
    }

    return state;
};

const Input = props => {

  const [updateState, setUpdateState] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValue ? true : false,
    error: `Polje ne smije biti prazno!`
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (props.updateState) {
      setUpdateState(true);
    }
  }, [props.updateState]);

  useEffect(() => {

    if (updateState) {
      if (props.registration || props.basicInfo) {
        onInputChange(id, inputState.value, inputState.isValid, inputState.error);
      }

      if (props.login) { 
        onInputChange(id, inputState.value, inputState.isValid);
      }

      if (props.price) {
        onInputChange(inputState.value, inputState.isValid);
      }

      if (props.cardNum) {
        onInputChange(inputState.value);
      }
   }

    setUpdateState(false);
  }, [updateState]);

  const _onChangeText = text => {
    
    let isValid = true;
    let errorMsg = '';

    if (props.registration) {
      if (props.username && !usernameValidator(text)) {
        isValid = false;
        errorMsg = 'Korisničko ime nije u ispravnom obliku!';
      }
  
      if (props.password && !passwordValidator(text)) {
        isValid = false;
        errorMsg = 'Lozinka mora sadržavati barem jedno malo, jedno veliko slovo te jedan broj!';
      }
    }

    if (props.email && !emailValidator(text)) {
      isValid = false;
      errorMsg = 'Ups! Potrebna je ispravna adresa e-pošte.'
    }

    if (props.minLength && !minLengthValidator(text, props.minLength)) {
      isValid = false;
      errorMsg = `${props.label} mora sadržavati minimalno ${props.minLength} znakova!`;
    }

    if (props.maxLength && !maxLengthValidator(text, props.maxLength)) {
      isValid = false;
      errorMsg = `${props.label} može sadržavati maksimalno  ${props.maxLength} znakova!`;
    }

    if (props.number) {
      if (props.minNumber && !minNumberValidator(text, props.minNumber)) {
        isValid = false;
        errorMsg = `${props.label} ne smije biti manji od ${props.minNumber}!`;
      }

      if (props.maxNumber && !maxNumberValidator(text, props.maxNumber)) {
        isValid = false;
        errorMsg = `${props.label} ne smije biti veći od ${props.maxNumber}!`;
      }

      if (!numberValidator(text)) {
        isValid = false;
        errorMsg = `${props.label} nije važeći broj!`;
      }
    }

    if (props.required) {
      if (!isEmptyValidator(text)) {
        isValid = false;
        errorMsg = `${props.label} ne smije biti prazno!`;
      }
    }

    if (props.autoUpdate) {
      setUpdateState(true);
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
      error: errorMsg
    });

  };

  let container_style = {...styles.container};
  if(props.errorText){
    container_style = {...container_style,...styles.container_error}
  };

  return (
    <View style={{...container_style , ...props.style}}>
      <TextInput
        {...props}
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        onChangeText={_onChangeText}
      />
      {props.errorText && props.displayError ? <Text style={styles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 5
  },

  container_error:{
    marginVertical:0
  },
  
  input: {
    backgroundColor: theme.colors.surface
  },

  error: {
    fontSize: 14,
    color: theme.colors.primary,
    paddingHorizontal: 2
  }

});

export default Input;