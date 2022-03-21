import axios from 'axios'
const API_KEY = "f764851f64de874f9bf3d3c3822f2cc0"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+localStorage.getItem('Latitude')+"&lon="+localStorage.getItem('Longitude')+"&appid="+API_KEY


class WeatherApi {

    static getApi() {
        return axios.get(baseUrl);
    }
}

export default WeatherApi