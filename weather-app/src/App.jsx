import './App.css';
import { useRef, useState } from 'react';

function App() {
  const searchRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const apiKey = "ee0e408081f8c0431353de0910743cfa";

  function getWeather() {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchRef.current.value}&appid=${apiKey}`;
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then(data => setWeather(data))
      .catch(err => alert("Please enter a valid city"));
      
    searchRef.current.value = "";
  }

  function getWeatherEmoji(weatherId) {
    switch(true) {
      case (weatherId >= 200 && weatherId < 300):
        return "⛈";
      case (weatherId >= 300 && weatherId < 400):
        return "🌧";
      case (weatherId >= 500 && weatherId < 600):
        return "🌧";
      case (weatherId >= 600 && weatherId < 700):
        return "❄";
      case (weatherId >= 700 && weatherId < 800):
        return "🌫";
      case (weatherId === 800):
        return "☀";
      case (weatherId >= 801 && weatherId < 810):
        return "☁";
      default:
        return "❓";
    }
  }

  return (
    <>
      <div id="form" className='flex align-center justify-center'>
        <input
          type="text"
          className='text-xl border-2 border-black w-[300px] h-8 m-3 rounded-sm'
          ref={searchRef}
          placeholder='Enter city name'
        />
        <button
          onClick={getWeather}
          className='w-14 h-7 bg-blue-500 hover:bg-blue-700 rounded-full mt-[14px]'
        >
          Search
        </button>
      </div>
      <div className='flex align-center justify-center'>
        {weather ? (
          <center>
            <div id="displayData" className='flex align-center justify-center mt-16 bg-orange-500 w-[300px] h-[450px] p-20 rounded-lg'>
              <div className='flex h-[100px] w-[100%] items-center justify-center'>
                <div id='weather' key={weather.id} className='pt-[150px]'>
                  <h2 className='text-2xl font-italic'>{weather.sys.country}, {weather.name}</h2>
                  <p className='text-xl font-bold'>{getWeatherEmoji(weather.weather[0].id)} {weather.weather[0].main}</p>
                  <p className='text-xl font-bold'>{weather.weather[0].description}</p>
                  <p className='text-xl font-bold'>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
                  <p className='text-xl font-bold'>Humidity: {weather.main.humidity}%</p>
                </div>
              </div>
            </div>
          </center>
        ) : null}
      </div>
    </>
  );
}

export default App;

