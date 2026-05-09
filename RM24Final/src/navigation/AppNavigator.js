// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

// Pantallas placeholder para rutas futuras
function PlaceholderScreen({ route }) {
  const { View, Text, StyleSheet } = require('react-native');
  const { Colors } = require('../theme/colors');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.darkBlue }}>
      <Text style={{ color: Colors.yellow, fontSize: 24, fontWeight: '900' }}>{route.name}</Text>
      <Text style={{ color: Colors.white, marginTop: 10, opacity: 0.6 }}>Próximamente</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={PlaceholderScreen} />
        <Stack.Screen name="Register" component={PlaceholderScreen} />
        <Stack.Screen name="Services" component={PlaceholderScreen} />
        <Stack.Screen name="Contact" component={PlaceholderScreen} />
        <Stack.Screen name="Taximeter" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
