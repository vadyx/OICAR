import React, { memo } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';

const Logo = props => {

  if(Platform.OS === "web")
  {
    if(props.style == null)
    {
      return (
        <Image style={styles.image} 
        source={require("../assets/logo_oicar.png")}  />
        );
    }
    else{
      return (
        <Image style={styles.image, props.style} 
        source={require("../assets/logo_oicar.png")}  />
        );
    }
  }
  else{
    return (
    <Image style={{...styles.image, ...props.style}} 
    source={require("../assets/logo_oicar.png")}  />
    );
  }
}

const styles = StyleSheet.create({

  image: {
    width: 150,
    height: 150,
    marginBottom: 12,
    alignItems: Platform.OS === "web" ? "center" : null
  },

});

export default memo(Logo);
