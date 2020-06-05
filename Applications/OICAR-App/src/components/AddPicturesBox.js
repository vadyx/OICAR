import React from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";

import { theme } from "../utils/theme";

const PictureBox = props => {

    return (
        <View style={styles.imagecontainer}>
            <Image 
                source={{ uri: props.imageUri}}
                style={styles.imagestyle}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    
  
    imagecontainer:{
        
        width:50,
        height:50,
        marginBottom:10,
        marginHorizontal:5,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:theme.colors.white,
        borderRadius:10,
        borderWidth:1,
        borderColor:theme.colors.primary
    },
    imagestyle:{
        flex: 1,
        width: null,
        height: null,
        resizeMode:'cover',
        borderRadius:10
    },
    text_style:{
        fontWeight:"bold"
    }
});

export default PictureBox;