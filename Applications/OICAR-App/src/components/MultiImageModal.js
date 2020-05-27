import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
import { theme } from '../utils/theme';

const MultiImageModal = props => {
    return (
        <Modal
            animationType='none'
            transparent={true}
            visible={props.visible}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <ImageBrowser 
                        max={props.maxImages} 
                        headerCloseText={'Zatvori'}
                        headerDoneText={'Potvrdi'}
                        headerButtonColor={theme.colors.primary}
                        headerSelectText={'Odabranih'}
                        badgeColor={theme.colors.primary}
                        callback={props.onSelectedImages}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    innerView: {
        height: '100%',
        backgroundColor: theme.colors.white,
        opacity: 1
    }
});

export default MultiImageModal;