import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import ImagePickerModal from '../components/ImagePickerModal';
import MultiImageModal from '../components/MultiImageModal';
import { theme } from '../utils/theme';

const ImgPicker = props => {

    const [optionModalVisible, setOptionModalVisible] = useState(false);  
    const [multiPickerVisible, setMultiPickerVisible] = useState(false);  

    const _onAddImagePress = () => {
        setOptionModalVisible(true);
    }

    const _onOptionModalClose = () => {
        setOptionModalVisible(false);
    }

    const _imageConverter = async (image) => {
        const base64Image = await FileSystem.readAsStringAsync(image.uri, { encoding: FileSystem.EncodingType.Base64 });
        return base64Image;
    };

    const _multiPickerAction = (callback) => {
        callback.then(async (images) => {
            const base64Images = [];
            let convertedImage;

            for (const index in images) {
                convertedImage = await _imageConverter(images[index]);
                base64Images.push(convertedImage);
            }

            props.multiImageAction(base64Images);
            setMultiPickerVisible(false);
        }).catch((e) => {/* error handling */})
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
                if (props.multiImage) {
                    setMultiPickerVisible(true);
                } else {
                    picture = await ImagePicker.launchImageLibraryAsync(props.imageOptions);
                }              
                break;
        }

        if (picture !== undefined && picture.cancelled !== "true") {
            props.onPictureSelected(props.id, picture.base64);
        }
    };

    return (
        <View>
            
            <TouchableOpacity
                style={{...styles.containerphoto, ...props.style}}
                onPress={_onAddImagePress}>
                {props.children}
            </TouchableOpacity>
            

            <ImagePickerModal 
                visible={optionModalVisible} 
                onModalClose={_onOptionModalClose} 
                onSelectedOption={_onSelectedOption}
            />

            <MultiImageModal
                visible={multiPickerVisible}
                maxImages={props.maxImages}
                onSelectedImages={_multiPickerAction}  />

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