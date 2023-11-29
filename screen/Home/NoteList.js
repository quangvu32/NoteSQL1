import React, {useState,useCallback,useEffect,useContext} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CustomButtons from '../Components/CustomButtons';
import Note from '../Components/Note';
import { db } from '../Components/Data';
import { SettingContext } from '../Setting/SettingContext';

const NoteListScreen = ({navigation}) => {
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused();
    const {darkMode, fontSize} = useContext(SettingContext);
    const getData = useCallback(() => {
        try {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM notes', [], (tx, results) => {
                    if (results.rows) {
                        console.log('Query completed');
                        const notesArray = [];
                        const len = results.rows.length;
    
                        if (len > 0) {
                            for (let i = 0; i < len; i++) {
                                const row = results.rows.item(i);
                                notesArray.push(row);
                            }
                            setNotes(notesArray);
                        } else {
                            setNotes([]);
                        }
                    }
                });
            });
        } catch (error) {
            console.log('Error in getData:', error);
        }
    }, []);
    
    useEffect(() => {
        if(isFocused){
            getData();
            console.log('Notelist fetched');
        }
    }, [isFocused, getData]);
    const deleteNote = (id) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM notes WHERE id = ?;', [id], () => {
                getData();
                console.log('Note deleted');
            });
        });
    }
    const titleHeight = fontSize !== null ? fontSize + 10 : 16;
    return(
        <View style={[styles.container,{backgroundColor:darkMode? '#212121':'#f5f5f5'}]}>
            <View style={styles.header}>
                <Text style={[styles.text_header,{color:darkMode?'blue':'#009387',fontSize:fontSize+15}]}>Note App</Text>
            </View>
            <View style={[styles.footer,{backgroundColor:darkMode?'#757575': '#fff'}]}>
                <Text style={[styles.text_footer,{color:darkMode?'white':'#05375a', fontSize:fontSize+10}]}>All notes</Text>
                <CustomButtons 
                    style={styles.button} 
                    action={() => navigation.navigate('AddNote')} 
                    name="add-circle" size={fontSize + 40} color={darkMode?"blue":"#009387"} 
                />
                
            </View>
                <FlatList
                    data={notes}
                    renderItem={({item}) => (
                        <Note
                            title={item.title}
                            content={item.content}
                            onPress={() => navigation.navigate('EditNote', {note: item})}
                            delPress={() => deleteNote (item.id)}
                            darkMode={darkMode?'white':'black'}
                            fontSize={fontSize}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}

                />

        
        
        </View> 
    )
}

export default NoteListScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 50,
        paddingBottom: 10
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    text_header: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#009387'
    },
    text_footer: {
        color: '#05375a',
        fontWeight: 'bold',
        padding: 10,
    },
    button: {
        padding: 10,
    },
    listview:{
    
    }

});