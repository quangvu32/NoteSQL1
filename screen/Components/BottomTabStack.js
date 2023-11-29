import React, {useContext} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../Home/HomeStack';
import Settings from '../Setting/Settings';
import ScreenOptions from '../Components/ScreenOptions';
import { SettingContext } from "../Setting/SettingContext";

const Bottom = createBottomTabNavigator();
const BottomTabStack = () => {
    const {darkMode} = useContext(SettingContext);
    return(
    <Bottom.Navigator 
          screenOptions={{
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarStyle: {
            height: 65,
            paddingBottom: 10,
            backgroundColor: darkMode ? 'black' : 'white',
          },
          tabBarInactiveTintColor: darkMode ? 'white' : '#424242',
        }}
      >
          <Bottom.Screen 
              name="Home" 
              component={Home} 
              options={
                {...ScreenOptions('Home','home','Ionicons'), 
                headerShown: false,
                 }}
            />
          <Bottom.Screen 
              name="Settings" 
              component={Settings} 
              options={{
                ...ScreenOptions('Settings', 'settings','Ionicons'),
                headerStyle:{
                      backgroundColor: darkMode ? '#424242' : 'white',
                      },
                      headerTintColor: darkMode ? 'white' : 'black',
                }}
            />
      </Bottom.Navigator>
    );
}

export default BottomTabStack;
