import React, {useContext} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SearchContext} from '../contexts/SearchProvider.js';

const Item = Picker.Item;

export default function TypePicker() {
  const {type, setTypeF} = useContext(SearchContext);

  return (
      <View style={styles.container}>
        <Picker
            selectedValue={type}
            onValueChange={(v) => setTypeF(v)}
            prompt="Select type of search">
          <Item label='Normal search ' value='1'/>
          <Item label='Expiring this month' value='2'/>
          <Item label='Added this month' value='3'/>
        </Picker>
      </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold'
  },
    container:{
        height: Platform.OS === 'ios' ? 150 : 50,
        marginTop: 0
    }
});
