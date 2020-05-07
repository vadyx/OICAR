import React from 'react';
import { StyleSheet, View,Text} from 'react-native';
import { theme } from '../utils/theme';
import { MaterialCommunityIcons} from '@expo/vector-icons';

const ImagePickerSuccess = props => {

    return (
        <View>
            <View  style={styles.containerphoto}>
                <MaterialCommunityIcons name="check-decagram" size={45} color={theme.colors.success} style={styles.photoicon}/>
                <Text style={styles.imagepickertextsuccess}>Dokument je uspjesno dodan!</Text>
                <View style={styles.rowstyle}>
                    <Text style={styles.imagepickertextsuccess}>Dokument je aktivan do: </Text>
                    {props.children}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerphoto:{
        width:"100%",
        height:100,
        padding:0,
        margin:0,
        backgroundColor:theme.colors.white
    },
    imagepickertextsuccess:{
        color:theme.colors.success,
        fontSize:12,
        alignSelf:"flex-start"
    },
    photoicon:{
        alignSelf:"center",
        paddingTop:8,
        paddingBottom:8
    },
    rowstyle:{
        flexDirection:"row"
    }
});

export default ImagePickerSuccess;