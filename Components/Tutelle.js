import React, {useState} from "react";
import {Button, Text, ThemeProvider, Input, CheckBox} from "react-native-elements";
import {ScrollView, Image, View} from "react-native"
import axios from "axios"

const Tutelle = ({navigation}) => {
  const functionnalities = {chatbot: true, vocalGuide: true, fingerprint: true, facialRecognition: true,
    paymentAlert: true, paymentAutomatic: true, funding: true}
  const person = {name: "", firstName: "", age: "", gender: "", nationality: "", mail: "", password: ""}

  const [data, setData] = useState({0: {...person, relation: ""}, 1: {...person, handicap: ""}, 2: {...functionnalities}, 3: {...functionnalities}, 4: {iban: ""}})
  const [step, setStep] = useState(0)
  const [valid, setValid] = useState(false)
  const stepMax = 4
  const stepTitles = {0: "Tuteur", 1: "Tutoré(e)", 2: "Fonctionnalitées tuteur", 3: "Fonctionnalitées tutoré(e)", 4: "Votre IBAN"}
  const labels = {name: "Nom", firstName: "Prénom", age: "Âge", gender: "Homme/Femme", nationality: "Nationalité",
    mail: "E-mail", password: "Mot de passe", relation: "Lien avec la personne", handicap: "Handicap", chatbot: "Chatbot",
    vocalGuide: "Guide vocal", fingerprint: "Reconnaissance d'empreinte", facialRecognition: "Reconaissance faciale",
    paymentAlert: "Alerte de paiement > 250€ via appel", paymentAutomatic: "Virement automatique", funding: "Création de cagnotte", iban: "IBAN"}
  const switches = ["chatbot", "vocalGuide", "fingerprint", "facialRecognition", "paymentAlert", "paymentAutomatic", "funding"]

  const checkIban = () => {
    axios.post("http://localhost:4209/check/iban", {iban: data[4].iban}).then(res => {console.log(res); return res.data.valid ? setValid(true) : setValid(false)}).catch(err => console.log(err))
  }

  console.log(valid)
  return (
    <ThemeProvider>
      <ScrollView style={{flex: 1, flexDirection: "column", alignContent: "center", backgroundColor: "white"}}>
        <Image style={{width: 200, height: 100, marginTop: "10%", marginBottom: "10%"}} resizeMode="contain" source={require('../assets/logo.png')}/>
        <Text h3 style={{marginBottom: "10%"}}>{stepTitles[step]}</Text>
        {
          Object.entries(data[step]).map(([key, value]) => {
            if (key === "iban") {
              return <Input errorMessage={valid ? "" : "Veuillez rentrer un IBAN valide"} key={`${step}${key}`} label={labels[key]} placeholder={value} onBlur={() => checkIban()} onChangeText={text => {data[step][key] = text; setData(data)} }/>
            } else if (switches.includes(key))
              return <CheckBox containerStyle={{width: "80%"}} key={`${step}${key}`} title={labels[key]} checked={data[step][key]} onPress={() => {data[step][key] = !data[step][key]; setData({...data})}}/>
            return <Input key={`${step}${key}`} label={labels[key]} placeholder={value} onChangeText={text => {data[step][key] = text; setData(data)}}/>
          })
        }
        <Button style={{width: 200, padding: "30px"}} disabled={step === stepMax && !valid} buttonStyle={valid ? {backgroundColor: "green"}: {}} title={step !== stepMax ? "Suivant" : "Finir"} onPress={() => {step === stepMax ? navigation.navigate("Home") : setStep(step + 1)}}/>
      </ScrollView>
    </ThemeProvider>
  )
}

export default Tutelle;