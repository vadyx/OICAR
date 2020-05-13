import React, { memo } from 'react';
import  { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { theme } from '../utils/theme';

const NextScreenButton = props => {
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={props.navigate}>

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
        width: 48,
        height: 48,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default memo(NextScreenButton);