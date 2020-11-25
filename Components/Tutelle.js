import {Button, Text, ThemeProvider} from "react-native-elements";
import View from "react-native-web/dist/exports/View";
import Image from "react-native-web/dist/exports/Image";
import React, {useState} from "react";
import { Input, CheckBox } from 'react-native-elements';

const Tutelle = ({navigation}) => {
  const functionnalities = {chatbot: true, vocalGuide: true, fingerprint: true, facialRecognition: true,
    paymentAlert: true, paymentAutomatic: true, funding: true}
  const person = {name: "", firstName: "", age: "", gender: "", nationality: "", mail: "", password: ""}

  const [data, setData] = useState({0: {...person, relation: ""}, 1: {...person, handicap: ""}, 2: {...functionnalities}, 3: {...functionnalities}})
  const [step, setStep] = useState(0)

  const stepMax = 3
  const stepTitles = {0: "Tuteur", 1: "Tutoré(e)", 2: "Fonctionnalitées tuteur", 3: "Fonctionnalitées tutoré(e)"}
  const labels = {name: "Nom", firstName: "Prénom", age: "Âge", gender: "Homme/Femme", nationality: "Nationalité",
    mail: "E-mail", password: "Mot de passe", relation: "Lien avec la personne", handicap: "Handicap", chatbot: "Chatbot",
    vocalGuide: "Guide vocal", fingerprint: "Reconnaissance d'empreinte", facialRecognition: "Reconaissance faciale",
    paymentAlert: "Alerte de paiement > 250€ via appel", paymentAutomatic: "Virement automatique", funding: "Création de cagnotte"}
  const switches = ["chatbot", "vocalGuide", "fingerprint", "facialRecognition", "paymentAlert", "paymentAutomatic", "funding"]

  return (
    <ThemeProvider>
      <View style={{flex: 1, flexDirection: "column", alignItems: "center", backgroundColor: "white"}}>
        <Image style={{width: 200, height: 100, marginTop: "10%", marginBottom: "10%"}} resizeMode="contain" source={require('../assets/logo.png')}/>
        <Text h3 style={{marginBottom: "10%"}}>{stepTitles[step]}</Text>
        {
          Object.entries(data[step]).map(([key, value]) => {
            if (switches.includes(key))
              return <CheckBox containerStyle={{width: "80%"}} key={`${step}${key}`} title={labels[key]} checked={data[step][key]} onPress={() => {data[step][key] = !data[step][key]; setData({...data})}}/>
            return <Input key={`${step}${key}`} label={labels[key]} placeholder={value} onChangeText={text => {data[step][key] = text; setData(data)}}/>
          })
        }
        <Button style={{width: 200, padding: "30px"}} title={step !== stepMax ? "Suivant" : "Finir"} onPress={() => {step === stepMax ? navigation.navigate("Home") : setStep(step + 1)}}/>
      </View>
    </ThemeProvider>
  )
}

export default Tutelle;