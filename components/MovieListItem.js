import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function MovieListItem({item, onPress}) {
  return (
    <Pressable style={styles.listItem} onPress={onPress}>
      <Text style={styles.title}>{item.title} </Text>
      <Text style={styles.subtitle}>
        {item.vtype} ({item.titledate})
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 22,
  },
  subtitle: {
    fontSize: 18,
    color: 'lightgrey',
  },
});
