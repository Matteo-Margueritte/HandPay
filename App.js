import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./Components/HomeScreen";
import Tutelle from "./Components/Tutelle";
import Handicap from "./Components/Handicap";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator   screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tutelle" component={Tutelle} />
        <Stack.Screen name="Handicap" component={Handicap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
