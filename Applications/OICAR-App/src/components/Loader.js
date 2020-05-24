import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';

export default class Loader extends Component {
  render() {
    const { animationType, modalVisible } = this.props;
    return (
      <Modal
        animationType={animationType}
        transparent
        visible={modalVisible}
      >
        <View style={styles.wrapper}>
          <View style={styles.loaderContainer}>
            <Image
              style={styles.loaderImage}
              source={require('../assets/Vanilla-1s-280px.gif')}
            />
            <Image
              style={styles.loaderImage1}
              source={require('../assets/loader_org.gif')}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = {
  animationType: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  loaderContainer: {
    width: 250,
    height: 180,
    borderRadius:20,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -125,
    marginTop: -100,
  },
  loaderImage: {
    width: 170,
    height: 140,
    position: 'relative',
    left: '50%',
    marginLeft: -95,
    top: '50%',
    marginTop: -90,
  },
  loaderImage1: {
    width: 80,
    height: 70,
    position: 'relative',
    left: '50%',
    marginLeft: -50,
    top: '50%',
    marginTop: -40
  }
});
