import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { theme } from '../utils/theme';

const ImgPicker = ({children,...props}) => {

    const _verifyPermissions = async () => {

        const permission = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

        if (permission.status !== 'granted') {
            // logika ako user ne dopusti
            return false;
        }

        return true;
    };

    const _onTakeImagePress = async () => {
        const permissionGranted = await _verifyPermissions();

        if (!permissionGranted) {
            return;
        }

        const image = await ImagePicker.launchCameraAsync();
    };

    return (
        <View  style={{...styles.containerphoto, ...props.style}}>
        <TouchableOpacity onPress={_onTakeImagePress}>
            {children}
        </TouchableOpacity>
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
    },

    photoicon:{
        alignSelf:"center",
        paddingTop:8
    }
});

export default ImgPicker;