import React, { memo } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { theme } from '../utils/theme';

const Header = props => {

  if(Platform.OS === "web")
  {
    return(
      <Text style={styles.header}>{props.children}</Text>
    );
  }
  else{
    return(
      <Text style={{...styles.header, ...props.style}}>{props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    fontSize: 32,
    color: Platform.OS === "web" ? '#6f122c' : theme.colors.tertiary,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: Platform.OS === "web" ? "center" : null
  },
});

export default memo(Header);
