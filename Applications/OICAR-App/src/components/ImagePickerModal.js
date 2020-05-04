import React, {useState} from 'react';
import { Text, StyleSheet, TouchableOpacity,Modal,View } from 'react-native';
import { theme } from '../utils/theme';

const ImagePickerModal = props =>{

    const [modalVisible, setModalVisible] = useState(false);

    return(
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    setModalVisible(!modalVisible);
    }}>
        <View style={styles.modal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalBody}>

                    <View  style={styles.submit}>
                        <TouchableOpacity
                        style={styles.touchablestyle}>
                            <Text style={styles.textstylebutton}>Kamera</Text>
                        </TouchableOpacity>
                    </View>
                    <View  style={styles.submit}>
                        <TouchableOpacity
                        style={styles.touchablestyle}>
                            <Text style={styles.textstylebutton}>Galerija</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.cancel}>

                    <View style={styles.divider}></View>

                    <TouchableOpacity onPress={() => {
                    setModalVisible(!modalVisible);
                    }}>
                        <Text style={styles.textstylebutton1} >Odustani</Text>
                    </TouchableOpacity>

                </View>    
            </View>
        </View>
    </Modal>

    )
};

const styles = StyleSheet.create({
    modal:{
        backgroundColor:theme.colors.white,
        opacity:0.9,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalContainer:{
        backgroundColor:theme.colors.white,
        width:"60%",
        borderRadius:10,
        borderColor:theme.colors.primary,
        borderWidth:1,
        overflow:"hidden" 
    },

    modalBody:{
        backgroundColor:theme.colors.white,
        paddingBottom:10,
        paddingTop:20,
        paddingHorizontal:10
    },

    submit:{
        width:"80%",
        alignSelf:"center",
        marginHorizontal:20,
        marginVertical:5,
        height:50,
    },

    touchablestyle:{
        backgroundColor:theme.colors.primary,
        borderRadius:10,
        borderColor: theme.colors.primary
    },

    cancel:{
        backgroundColor:theme.colors.white,
        width:"100%",
        paddingVertical:10,
        alignSelf:"center"
    },

    textstylebutton:{
        fontSize:22,
        color:theme.colors.white,
        alignSelf:"center",
        paddingVertical:8,
        fontWeight:"900"
    },

    textstylebutton1:{
        fontSize:22,
        color:theme.colors.primary,
        alignSelf:"center",
        paddingVertical:8,
        fontWeight:"900"
    },
});

export default (ImagePickerModal);