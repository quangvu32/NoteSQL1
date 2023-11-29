import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

const CustomButtons = ({style, action,name, size, color}) => {
    return(
        <TouchableOpacity style={style} onPress={action}>
            <Ionicon name={name} size={size} color={color} />
        </TouchableOpacity>
    )
}

export default CustomButtons;
