import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
import * as Permissions from 'expo-permissions';

import ImagePickerModal from '../components/ImagePickerModal';
import { theme } from '../utils/theme';

const ImgPicker = props => {

    const [modalVisible, setModalVisible] = useState(false);  
    const [showMultiPicker, setShowMultiPicker] = useState(false);  

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
                if (props.multiImage) {
                    setShowMultiPicker(true);
                } else {
                    picture = await ImagePicker.launchImageLibraryAsync(props.imageOptions);
                }
                
                break;
        }

        if (!props.multiImage) {
            props.onPictureSelected(props.id, picture.base64);
        }
    };

    if (showMultiPicker) {
        return (
            <ImageBrowser 
                max={101} // Maximum number of pickable image. default is None
                headerCloseText={'キャンセル'} // Close button text on header. default is 'Close'.
                headerDoneText={'　　完了'} // Done button text on header. default is 'Done'.
                headerButtonColor={'#E31676'} // Button color on header.
                headerSelectText={'枚の画像を選択中'} // Word when picking.  default is 'n selected'.
                mediaSubtype={'screenshot'} // Only iOS, Filter by MediaSubtype. default is display all.
                badgeColor={'#E31676'} // Badge color when picking.
                emptyText={'選択できる画像がありません'} // Empty Text
                callback={() => {}} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise. />
            />
        );
    }

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