import React from 'react';
import { Button, ThemeProvider, Image } from 'react-native-elements';
import {View} from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <ThemeProvider>
      <View style={{flex: 1, flexDirection: "column", alignItems: "center", backgroundColor: "white"}}>
        <Image style={{width: 200, height: 100, marginTop: "10%", marginBottom: "20%"}} resizeMode="contain" source={require('../assets/logo.png')}/>
        <Button style={{width: 200, padding: "30px"}} title="Handicap" onPress={() => navigation.navigate('Handicap')}/>
        <Button style={{width: 200, padding: "30px"}} title="Tutelle" onPress={() => navigation.navigate('Tutelle')}/>
        <Button style={{width: 200, padding: "30px"}} title="Account" onPress={() => navigation.navigate('Account')}/>
      </View>
    </ThemeProvider>
  )
}

export default HomeScreen;