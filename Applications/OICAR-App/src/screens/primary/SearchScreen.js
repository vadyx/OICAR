import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const SearchContainer = props => {
  return (
    <View style={styles.wrapper}>
      <Text>
          Profile Container
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems:"center",
    justifyContent:"center",
    padding: 50,
  },
});

export default SearchContainer;