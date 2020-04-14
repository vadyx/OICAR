import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../utils/theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>

const styles = StyleSheet.create({

  header: {
    fontSize: 32,
    color: theme.colors.tertiary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);
