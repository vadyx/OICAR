import React, { memo } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import { theme } from "../utils/theme";

const Category = props => {

    return (
        <View style={styles.category_container}>
            <TouchableOpacity 
                style={styles.imagecontainer} 
                onPress={() => props.onCategoryPressed(props.categoryID)}>

                <Image source={{ uri: props.imageUri }}
                    style={styles.imagestyle}
                />
                
            </TouchableOpacity>
            <View style={styles.categoryname_container}>
                <Text style={styles.text_style}>{props.name}</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    
    category_container:{
        height:130,
        width:130, 
        marginLeft:20,
        marginHorizontal:5,
    },
    imagecontainer:{
        flex: 4,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:theme.colors.white,
        borderRadius:10
    },
    imagestyle:{
        flex: 1,
        width: null,
        height: null,
        resizeMode:'cover',
        borderRadius:10
    },
    categoryname_container:{
        flex:1,
        paddingLeft:5,
        paddingTop:5
    },
    text_style:{
        fontWeight:"bold"
    }
});

export default memo(Category);