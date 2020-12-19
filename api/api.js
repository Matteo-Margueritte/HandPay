import defaults from "lodash/defaults"
import axios from "axios"
import qs from "querystring"
import AsyncStorage from '@react-native-async-storage/async-storage';

const requestBody = {
    client_id: "3a0f77fe-84b0-4887-8bd5-b74daa3e0ec4",
    client_secret: "c7948256-d646-48a8-a63d-0513d756a12d",
    grant_type: "client_credentials"
}

const configHeader = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

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
        axios.post("https://api.fusionfabric.cloud/login/v1/sandbox/oidc/token",
            qs.stringify(requestBody),configHeader)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default Api
