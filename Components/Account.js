import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    SafeAreaView, Text
} from 'react-native';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Compte Courant',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Deuxieme compte',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Troisieme compte',
    },
];

const Item = ({ title }) => (
    <View style={{
        flex: 1,
        flexDirection: 'column',
        margin: 1
    }}>
        <Text style={styles.imageThumbnail}>{title}</Text>
    </View>
);

const Account = ({navigation}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        // api call here
        let items = Array.apply(null, Array(10)).map((v, i) => {
            return {
                id: i,
                src: "Info user"
            }
        })
        setData(items)
    }, [])
    const renderItem = ({ item }) => <Item title={item.title} />;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text style={styles.textStyle} >
                            {item.title}
                        </Text>

                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
            />

        </SafeAreaView>
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
        backgroundColor: '#f9c2ff',
        padding: 10,
    },
});