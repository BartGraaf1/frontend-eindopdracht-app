import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MovieIndex from './screens/MovieIndex';
import MovieShow from './screens/MovieShow';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movies" component={MovieIndex} />
        <Stack.Screen name="MovieShow" component={MovieShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
