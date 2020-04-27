import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const InboxScreen = props => {
  return (
    <View style={styles.wrapper}>
      <Text>
        Inbox Container
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

export default InboxScreen;