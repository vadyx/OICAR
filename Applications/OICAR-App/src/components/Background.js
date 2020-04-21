import React, { memo } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  ImageBackground,
  StyleSheet
} from 'react-native';

const Background = props => (
  <ImageBackground
    source={require('../assets/backg_3.png')}
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
  },
  container: {
    paddingTop:130,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});

export default memo(Background);
