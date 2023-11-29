import React, { useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButtons from '../Components/CustomButtons';
import { SettingContext } from '../Setting/SettingContext';
import { db } from '../../screen/Components/Data';



const AddNote = () => {
    const {darkMode, fontSize} = useContext(SettingContext);
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const updateNote = (title,content) => {
    try{
        if(title.trim() === ''){
            Alert.alert('Warning', 'Please enter a title!')
            return;
        }
        db.transaction((tx) => {    
            tx.executeSql(
            'INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], 
            navigation.navigate('NoteList')
            );
        });
    }
    catch(error){
        console.log(error);
    }
    };
    const titleHeight = fontSize !== null ? fontSize + 10 : 16;
    const contentHeight = titleHeight;
    const confirmIconSize = fontSize !== null ? fontSize + 40 : 56;
    return (
        <View style={[styles.container,{backgroundColor:darkMode?'#212121':'#f5f5f5'}]}>
        <View style={styles.contentContainer}>
            <TextInput
                value={title}
                placeholder=' Enter your title'
                numberOfLines={2}
                onChangeText={text => setTitle(text)}
                placeholderTextColor={darkMode?'white':'#9E9E9E'}
                color={darkMode?'white':'black'}
                style={[styles.input,{fontSize:titleHeight}]}
            />
            <TextInput
                value={content}
                multiline={true}
                numberOfLines={5}
                placeholder=' Enter your note'
                placeholderTextColor={darkMode?'white':'#9E9E9E'}
                color={darkMode?'white':'black'}
                onChangeText={text => setContent(text)}
                style={[styles.input,{fontSize:contentHeight}]}
            />
        </View>
        <View style={styles.Button}>
            <CustomButtons 
                name={'close-circle'} 
                action={() => navigation.goBack()}
                size={confirmIconSize} color="red" 
                style={[styles.closeIcon]}
            />
            <CustomButtons 
                name={'checkmark-circle'} 
                action={() => updateNote(title, content)}
                size={confirmIconSize} color="limegreen" 
                style={[styles.checkIcon]}
            />
        </View>      
    </View>
    );
};

export default AddNote;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    contentContainer:{
        margin: 20,
    },
    input: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        fontSize: 20,
        marginBottom: 20,
    },
    checkIcon:{
        marginTop: -20,
    },
    closeIcon:{
        marginTop: -20,
    },
    Button:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
});