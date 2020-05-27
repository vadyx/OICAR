import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';

import { theme } from '../utils/theme';

const DatePicker = props => {

    const [showDatePicker, setShowDatePicker] = useState(false);

    const _onDateChanged = (event, selectedDate) => {
        setShowDatePicker(false);
        props.onDateChanged(props.id, selectedDate);
    }

    return (
        <View>
            <View style={styles.boxstyle}>
                <Text style={styles.lblstyle}>{props.label}</Text>
                <TouchableOpacity style={styles.tostyle} onPress={() => setShowDatePicker(true)}>
                    <Fontisto name="date" size={24} color={theme.colors.primary}/>
                    <Text style={styles.labelstyle}>{moment(props.date).format('DD.MM.YYYY')}</Text>
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={props.date}
                    mode='date'
                    display="calendar"
                    onChange={_onDateChanged}
                    minimumDate={props.minimumDate}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    boxstyle:{
        flexDirection:"column",
        alignItems:"flex-start",
        paddingBottom:20
    },
    lblstyle:{
        fontSize:20,
        marginVertical:5,
    },
    tostyle:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:10,
        borderWidth:1,
        borderRadius:10,
        borderColor:theme.colors.lightplusgrey
    },
    labelstyle:{
        fontSize:23,
        fontWeight:"200",
        marginHorizontal:20,
        width:150
    },
});

export default DatePicker;