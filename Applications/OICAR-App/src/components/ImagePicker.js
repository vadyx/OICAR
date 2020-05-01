import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { theme } from '../utils/theme';

const ImagePicker = props => {

    return (
        <View style={styles.containerphoto}>
            <TouchableOpacity>
                <MaterialIcons name="photo-camera" size={36} color={theme.colors.white} style={styles.photoicon}></MaterialIcons>
                <Text style={styles.label}>Dodaj</Text>
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
    },

    label: {
        fontSize:16,
        alignSelf:"center",
        color:"#ffffff"
    }
});

export default ImagePicker;