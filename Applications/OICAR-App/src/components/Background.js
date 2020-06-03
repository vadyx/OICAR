import React, { memo } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  ImageBackground,
  StyleSheet,
  Platform
} from 'react-native';

const Background = props => (
  <ImageBackground
    source={require('../assets/splash_2.png')}
    style={styles.background}
  >
    <KeyboardAwareScrollView  resetScrollToCoords={{ x: 0, y:0 }}
    contentContainerStyle={{...styles.container, ...props.style}}
    scrollEnabled={true}>
      {props.children}
    </KeyboardAwareScrollView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex:1,
    width: '100%',
    alignItems: Platform.OS === "web" ? "center" : null,
    paddingTop:Platform.OS === "web" ? 100 : null
  },
  container: {
    paddingTop:130,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});

export default memo(Background);
