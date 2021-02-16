import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SearchContext, SearchProvider} from '../contexts/SearchProvider.js';

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
          <Item label='Expiring ' value='2'/>
          <Item label='New ' value='3'/>
        </Picker>
      </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
