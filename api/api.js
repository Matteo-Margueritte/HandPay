import defaults from "lodash/defaults"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';


class Api {
    constructor(token) {
        this.token = token
        let credentials = {}
        const config = defaults(credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    oauth2Token = () => {

    }
}