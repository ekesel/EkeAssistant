import axios from 'axios'
const API_KEY = "3f5a5e1008aa4d978d840d60fd" // use api key from newsapi
const baseUrl = "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey="+API_KEY


class NewsApi {

    static getApi() {
        return axios.get(baseUrl);
    }
}

export default NewsApi