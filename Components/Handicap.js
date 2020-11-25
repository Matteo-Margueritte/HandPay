import React from "react";
import {Button, ThemeProvider} from "react-native-elements";
import {Image, View} from "react-native";
import Tesseract from 'tesseract.js';

const Handicap = () => {
  return (
    <ThemeProvider>
      <View style={{flex: 1, flexDirection: "column", alignItems: "center", backgroundColor: "white"}}>
        <Image style={{width: 200, height: 100, marginTop: "10%", marginBottom: "20%"}} resizeMode="contain" source={require('../assets/logo.png')}/>
        <Image style={{width: 200, height: 100, marginTop: "10%", marginBottom: "20%"}} resizeMode="contain" source={require('../assets/CMI.jpg')}/>
        <Button style={{width: 200, padding: "30px"}} title="Lire la carte" onPress={() => {
          Tesseract.recognize(
            require('../assets/CMI.jpg'),
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            console.log(text);
            console.log(text.match("[0-9]{4}\\s[0-9]{9}"))
          })
        }}/>
      </View>
  </ThemeProvider>)
}

export default Handicap;