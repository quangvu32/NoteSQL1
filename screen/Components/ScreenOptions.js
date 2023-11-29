//Họ tên: Nguyễn Quang Vũ
//MSSV: 21522801
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign  from 'react-native-vector-icons/AntDesign';
const TabIcon = (icon,color, size ) => {
    return <Ionicons name={icon} color={color} size={size} />
  }
  const AntDesignIcon = (icon, color, size ) => {
    return <AntDesign name={icon} size={size} color={color} />;
  }
  const ScreenOptions = (label, icon, src) => {
    return {
        tabBarLabel: label,
        tabBarIcon: ({color}) => (
          src === 'Ionicons' ? TabIcon(icon, color, 30) : AntDesignIcon(icon, color, 30)
        ),
      };
    }
export default ScreenOptions;