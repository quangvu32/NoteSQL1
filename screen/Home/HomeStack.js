import React, { Component, useContext } from 'react';
import {View} from 'react-native';
import NoteListScreen from './NoteList';
import AddNote from './AddNote';
import EditNoteScreen from './EditNote';
import { createStackNavigator } from "@react-navigation/stack";
import { SettingContext } from '../Setting/SettingContext';
const Stack = createStackNavigator();

const Home = ({ navigation }) => {
    const {darkMode} = useContext(SettingContext);
    return (
        <Stack.Navigator>
            <Stack.Screen name="NoteList" component={NoteListScreen} 
                options={{ 
                        headerShown: false,
                    }} />
            <Stack.Screen name="AddNote" component={AddNote}
                options={{
                        headerStyle:{
                            backgroundColor: darkMode ? '#424242' : 'white',
                        },
                        headerTintColor: darkMode ? 'white' : 'black',
                }}
            />
            <Stack.Screen name="EditNote" component={EditNoteScreen}
                options={{
                        headerStyle:{
                            backgroundColor: darkMode ? '#424242' : 'white',
                        },
                        headerTintColor: darkMode ? 'white' : 'black',
                }}
            />
        </Stack.Navigator>
    );
};

export default Home;

