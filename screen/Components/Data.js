import SQLite from 'react-native-sqlite-storage';
//import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabase(
    {
        name: 'notes.db',
        location: 'default',

    },
    () => {
        console.log('Connected to database');
     },
    error => {
        console.log('Error: ', error);
    }
)