import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import BottomTabStack from './screen/Components/BottomTabStack';
import { db } from './screen/Components/Data';
import { SettingProvider } from './screen/Setting/SettingContext';

const App = () => {
    try{
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)'
          );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, theme INTEGER, fontsize INTEGER)'
          );
          console.log('Database created');
      });
    }
    catch(error){
      console.log(error);
    }
  return (
    
    <NavigationContainer>
        <StatusBar 
          backgroundColor='#9E9E9E'/>
        <BottomTabStack />
    </NavigationContainer>
  );
}

const Bai2 = () => {
  return (
    <SettingProvider>
      <App />
    </SettingProvider>
  );
}

export default Bai2
