import React, { memo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import { theme } from '../utils/theme';

const Button = ({ mode, style, children, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.surface },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    borderRadius:30,
    width: Platform.OS === "web" ? "100%" : '50%',
    justifyContent:Platform.Os === "web" ? "center" : null,
    marginVertical: 10,
  },
  text: {
    fontWeight: '900',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
