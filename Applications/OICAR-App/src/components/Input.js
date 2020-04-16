import React, { useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { isEmptyValidator, emailValidator } from '../utils/validation';
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

  const [updateError, setUpdateError] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValue ? true : false,
    error: props.label + " must not be empty!"
  });

  const { onInputChange, id } = props;

 useEffect(() => {

  if (props.updateErrors) {
    setUpdateError(true);
  }
 }, [props.updateErrors]);

 useEffect(() => {
  if (updateError) {
    onInputChange(id, inputState.value, inputState.isValid, inputState.error);
    setUpdateError(false);
  }
 }, [updateError]);

  const _onChangeText = text => {
    
    let isValid = true;
    let errorMsg = '';

    if (props.email && !emailValidator(text)) {
      isValid = false;
      errorMsg = 'Ooops! We need a valid email address.'
    }

    if (props.required && !isEmptyValidator(text)) {
      isValid = false;
      errorMsg = props.label + ' must not be empty!';
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
      error: errorMsg
    });

  };

  return (
    <View style={styles.container}>
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
    width: '100%',
    marginVertical: 8,
    padding:0
  },
  
  input: {
    backgroundColor: theme.colors.surface,
    height: 45
  },

  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  }
});

export default Input;