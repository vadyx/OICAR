import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;
const Header_2 = ({children})=> <Text style={styles.header2}>{children}</Text>

const styles = StyleSheet.create({

  header2:{
    fontSize: 22,
    color: theme.colors.tertiary,
    fontWeight: 'bold',
    paddingVertical: 0,

  },

  header: {
    fontSize: 32,
    color: theme.colors.tertiary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);
