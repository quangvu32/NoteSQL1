import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import React from 'react';
import CustomButtons from './CustomButtons';

const Note = ({title, content, onPress, delPress, darkMode, fontSize}) => {
  return (
    <View style={styles.border}>
        <TouchableOpacity
            onPress={onPress}>
        <View style={styles.contentContainer}>
            <View style={styles.title}>
                <Text style={[styles.titleText, {color: darkMode, fontSize: fontSize+5}]}>
                    {title}
                </Text>
                <Text style={[styles.Text, {color: darkMode, fontSize: fontSize}]}>
                    {content}
                </Text>
            </View>
            <CustomButtons name={'trash-outline'} size={30} action={delPress} color={darkMode}/>
        </View>
        </TouchableOpacity>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  border: {
    marginHorizontal: 25,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    margin: 15
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
    Text: {
        fontSize: 15,
    },
});
