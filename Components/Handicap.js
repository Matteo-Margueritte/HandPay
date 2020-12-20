import React, {useState} from "react";
import {Button, ThemeProvider, Text} from "react-native-elements";
import {Image, View} from "react-native";
import Tesseract from 'tesseract.js';

const Handicap = () => {
  const [handicapId, setHandicapId] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <ThemeProvider>
      <View style={{flex: 1, flexDirection: "column", alignItems: "center", backgroundColor: "white"}}>
        <Image style={{width: 200, height: 100, marginTop: "10%", marginBottom: "20%"}} resizeMode="contain" source={require('../assets/logo.png')}/>
        <Image style={{width: 200, height: 100, marginTop: "10%", marginBottom: "20%"}} resizeMode="contain" source={require('../assets/CMI.jpg')}/>
        <Text h4 style={{marginBottom: "10%"}}>Numéro de carte: {handicapId}</Text>
        <Button style={{width: 200, padding: "30px"}} loading={loading} title="Lire la carte" onPress={() => {
          setLoading(true)
          Tesseract.recognize(
            require('../assets/CMI.jpg'),
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            setLoading(false)
            setHandicapId(text.match("[0-9]{4}\\s[0-9]{9}"))
          })
        }}/>
      </View>
  </ThemeProvider>)
}

export default Handicap;