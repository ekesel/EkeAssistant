import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000"

class Api {

    static postApi(url, data) {
        return axios.post(baseUrl + url, data);
    }

    static getApi(url) {
        return axios.get(baseUrl + url);
    }
}

export default Api