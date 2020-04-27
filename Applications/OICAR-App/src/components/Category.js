import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Category extends Component {
    render() {
        return (
            <View style={styles.container1}>
                <View style={{ flex: 4}}>
                    <Image source={this.props.imageUri}
                        style={styles.container2}
                    />
                </View>
                <View style={styles.container3}>
                    <Text style={styles.text_style}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}
export default Category;

const styles = StyleSheet.create({
    
    container1:{
        height:130,
        width:130, 
        marginLeft:20,
        marginHorizontal:5
    },
    container2:{
        flex: 1,
        width: null,
        height: null,
        resizeMode:'cover',
        borderRadius:10
    },
    container3:{
        flex:1,
        paddingLeft:5,
        paddingTop:5
    },
    text_style:{
        fontWeight:"bold"
    },
});