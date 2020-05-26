import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import ImagePickerModal from '../components/ImagePickerModal';
import { theme } from '../utils/theme';

const ImgPicker = props => {

    const [modalVisible, setModalVisible] = useState(false);  

    const _onAddImagePress = () => {
        setModalVisible(true);
    }

    const _onModalClose = () => {
        setModalVisible(false);
    } 

    const _verifyPermissions = async () => {

        const permission = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

        if (permission.status !== 'granted') {
            // logika ako user ne dopusti
            return false;
        }

        return true;
    };

    const _onSelectedOption = async (option) => {
        const permissionGranted = await _verifyPermissions();

        if (!permissionGranted) {
            return;
        }

        let picture;
        switch (option) {
            case 'camera':
                picture = await ImagePicker.launchCameraAsync(props.imageOptions);
                break;
            case 'gallery':
                picture = await ImagePicker.launchImageLibraryAsync(props.imageOptions);
                break;
        }

        props.onPictureSelected(props.id, picture.base64);
    };

    return (
        <View>
            
                <TouchableOpacity
                    style={{...styles.containerphoto, ...props.style}}
                    onPress={_onAddImagePress}>
                    {props.children}
                </TouchableOpacity>
            

            <ImagePickerModal 
                visible={modalVisible} 
                onModalClose={_onModalClose} 
                onSelectedOption={_onSelectedOption}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    containerphoto:{
        width:75,
        height:75,
        padding:0,
        margin:0,
        backgroundColor:theme.colors.primary,
        borderRadius:10,
        shadowColor: "#000",
        //iPhone 
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        //Android
        elevation: 5,
    }
});

export default ImgPicker;