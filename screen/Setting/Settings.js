import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { SettingContext } from './SettingContext';
const Settings = () => {
    const navigation = useNavigation();
    const {darkMode, updateDarkMode, fontSize, updateFontSize} = useContext(SettingContext);
    const  handleDarkMode = () => {
        const newDarkMode = !darkMode;
        updateDarkMode(newDarkMode);
    }
    const handleFontSize = (value) => {
        updateFontSize(value);
    }

    const [sliderValue, setSliderValue] = useState(16);
    return (
        <View style={[styles.container,{backgroundColor: darkMode ? '#212121' : '#f5f5f5'}]}>
           
           <View style={styles.contentContainer}>
                <View>
                    <Text style={[styles.text_footer,{color:darkMode ? 'white' : 'black', fontSize:fontSize+5}]}>Dark Mode</Text>
                </View>
                    <Switch
                        value={darkMode}
                        onValueChange={handleDarkMode}
                        style={styles.switch}
                    />
            </View>    
            <View style={styles.contentContainer}> 
                <Text style={[styles.text_footer,{color:darkMode ? 'white' : 'black', fontSize:fontSize+5}]}>Font Size</Text> 
                <Text style={[styles.metric,{color:darkMode ? 'white' : 'black', fontSize:fontSize+5}]}>{fontSize}</Text>
                <Slider 
                    style={styles.slider}
                    value={fontSize}
                    onValueChange={(value) => {handleFontSize(value);}}
                    minimumValue={12}
                    maximumValue={36}
                    step={2}
                    minimumTrackTintColor="#33691E"
                    maximumTrackTintColor="#757575"
                    thumbTintColor="#009387"
                />
            </View>
        </View>

    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 20,
        fontWeight: 'bold',
    },
    slider: {
        width: '90%',
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
    },
    metric: {
        fontSize: 20,
        color: '#05375a',
        fontWeight: 'bold',
        marginHorizontal: 15
        
    }
});