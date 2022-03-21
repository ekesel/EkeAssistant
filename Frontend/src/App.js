import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import SideBar from './SideBar';
import NewsApi from './NewsApi';
import WeatherApi from './WeatherApi';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CLIENT_ID = "e52774d5c20b4085b2dbc0f0c1aba49e"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'


function App() {

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [token, setToken] = useState("")
  const [artists, setArtists] = useState([])


  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      return navigate("/login");
    }
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      function showPosition(position) {
        localStorage.setItem("Latitude", position.coords.latitude);
        localStorage.setItem("Longitude", position.coords.longitude);
      }
    } else {
      alert("Geolocation is not supported by this browser.")
    }
    handleListen()
    handleSpeaker()
    setTimeout(function () { setIsListening(false); }, 10000)
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
  function handleSpeaker() {
    if (note !== null) {
      if (note.search('news') !== -1) {
        getNews();
      }
      else if (note.search('weather') !== -1) {
        getWeather();
      }
      else if (note.search('play') !== -1) {
        var ret = note.replace('play', '');
        searchArtists(ret);
      }
      else if (note.search('toggle') !== -1) {
        var words = note.split(' ');
        var numberIndex = words.findIndex((word) => word === 'toggle');
        var udn = words[numberIndex + 1]+words[numberIndex + 2];
        numberIndex = words.findIndex((word) => word === 'with');
        var gpio = words[numberIndex + 1];
        console.log("in");
        console.log(gpio);
        console.log(udn);
        getToggle(gpio,udn);
      }
    }
  }

  function getToggle(gpio, udn) {
    let tmp = "Token "+localStorage.getItem('Token');
    fetch("http://127.0.0.1:8000/getcommand", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": tmp,
      },
      body: JSON.stringify({
        gpio,
        udn
      })
    })
      .then(res => {
        if (res.ok) {
          getNextAudio("ok");
        } else {
          getNextAudio(res.statusText);
        }
      })
      .catch(error => console.error(error));
  }

  function getWeather() {
    WeatherApi.getApi()
      .then(function (response) {
        if (response.status === 200) {
          let result = "Weather of " + response.data.name + " is " + response.data.weather[0].description + ". Enjoy your day, Thank You!";
          getNextAudio(result);
        }
        else {
          alert("Something went Wrong!");
        }
      }).catch((error) => {
        console.log("error-----------", error)
      })
  }
  function getNews() {
    NewsApi.getApi()
      .then(function (response) {
        if (response.status === 200) {
          if ('speechSynthesis' in window) {
            // Speech Synthesis supported 🎉
          } else {
            // Speech Synthesis Not Supported 😣
            alert("Sorry, your browser doesn't support text to speech!");
          }
          for (let i = 0; i < response.data.totalResults; i++) {
            let temp = response.data.articles[i].title;
            console.log(temp);
            getNextAudio(temp);
          }
        }
        else {
          alert("Something went Wrong!");
        }
      }).catch((error) => {
        console.log("error-----------", error)
      })
  }

  async function getNextAudio(sentence) {
    let audio = new SpeechSynthesisUtterance(sentence);
    audio.rate = 1;
    window.speechSynthesis.speak(audio);

    return new Promise(resolve => {
      audio.onend = resolve;
    });
  }

  const searchArtists = async (ret) => {
    console.log(ret);
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: ret,
        type: "artist"
      }
    })
  setArtists(data.artists.items)
  }

  const Spotifylogout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div>
      <SideBar />
      <div id="App">
        <div className="my-3">
          <h1>Interact With Eke!</h1>
        </div>
        <div className="container">
          <div className="box">
            <h2>Try Talking!</h2>
            {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}

            <button onClick={() => setIsListening(prevState => !prevState)}>
              Start/Stop
            </button>
            <p>{note}</p>
          </div>
          <div className="box">
            <h1>Spotify</h1>
            {!token ?
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
              : <button onClick={Spotifylogout}>Logout</button>}
              {artists[0] !== undefined ? <p> Link -  {artists[0].external_urls.spotify} </p> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
