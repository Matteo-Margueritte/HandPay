import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import {Input, Button} from "react-native-elements";
import axios from "axios";


const Account = ({navigation}) => {
    const [text, setText] = useState("")
    const [data, setData] = useState(Object)
    const [isEmpty, setIsEmpty] = useState(null)
    const [render, setRender] = useState()


    const checkBank = (bankID) => {
        const configHeader = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const toRender = [
            {
                id: "name",
                title: ""
            },
            {
                id: "office type",
                title: ""
            },
            {
                id: "address",
                title: ""
            },
            {
                id: "national id",
                title: ""
            },
            {
                id: "status",
                title: ""
            },
        ]

        axios.post("http://localhost:4209/nationalID", {bankID: bankID},configHeader)
            .then(res => {
                if (res.status === 200) {
                            setData(res.data)
                            console.log(res.data)
                            toRender[0].title = data.institutionName
                            toRender[1].title = data.officeType
                            toRender[2].title = data.address.street + " " + data.address.townName + " " + data.address.countrySubDivision
                            toRender[3].title = data.nationalId.id
                            toRender[4].title = data.status
                            setRender(...toRender)
                }
            })
    }



    return (
        <View style={styles.container}>
            <Input
                style={{ height: 50, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => setText(text)}
                placeholder={"Tapez le bic de votre banque"}
            />
            <Button title={"Information sur votre banque"} onPress={() => checkBank(text)}/>

            <FlatList
                data={render}
                renderItem={({ item }) => <Text style={styles.item}>{item.id}</Text>}
            />

        </View>
    );
}

export default Account


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    textStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        fontSize: 20,
    },
    title: {
        fontSize: 20,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        padding: 10,
    },
});