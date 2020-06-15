import React, { memo, Children } from 'react';
import  { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { theme } from '../utils/theme';

const NextScreenButton = ({children,...props}) => {

    let buttonStyle = styles.buttonContainer;
    if (props.disabled) {
        buttonStyle = {...buttonStyle, ...{backgroundColor: '#919191'}};
    }

    return (
        <TouchableOpacity
            style={{...buttonStyle,...props.style}}
            disabled={props.disabled}
            onPress={props.navigate}>
            {children}
            <MaterialIcons name="navigate-next" size={50} color={theme.colors.white} />
        
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: theme.colors.primary,
        position:"absolute",    
        bottom: 0,
        right: 0,
        margin:20,
        width: 54,
        height: 54,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
    }
});

export default memo(NextScreenButton);