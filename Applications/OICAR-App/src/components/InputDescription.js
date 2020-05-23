import React from 'react';
import { StyleSheet, } from 'react-native';
import { TextInput } from 'react-native-paper';
import { theme } from '../utils/theme';


const InputDescription = props => {

  return (
    <TextInput
      {...props}
      editable
      style={{...styles.input, ...props.style}}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    width:"95%",
  },
});

export default InputDescription;