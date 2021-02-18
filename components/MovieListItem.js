import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function MovieListItem({type, item, onPress}) {
  let subtitle;
  if (type === "2") {
    subtitle = `Expiring on (${item.expiredate})`
  } else {
    subtitle = `${item.vtype} (${item.titledate})`
  }

  return (
    <Pressable style={styles.listItem} onPress={onPress}>
      <Text style={styles.title}>{unescape(item.title)} </Text>
      <Text style={styles.subtitle}>
        {subtitle}
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
