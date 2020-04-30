import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { theme } from "../utils/theme";

class Category extends Component {
    render() {
        return (
            <View style={styles.category_container}>
                <View style={styles.imagecontainer}>

                    <Image source={this.props.imageUri}
                        style={styles.imagestyle}
                    />
                </View>
                <View style={styles.categoryname_container}>
                    <Text style={styles.text_style}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}
export default Category;

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