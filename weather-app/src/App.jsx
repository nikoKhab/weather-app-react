import './App.css';
import { useRef, useState } from 'react';

function App() {
  const searchRef = useRef("");
  const [weathers, setWeatherss] = useState([]);

  function getWeather() {
    const URL = `https://freetestapi.com/api/v1/weathers?search=${searchRef.current.value}`;
    fetch(URL)
      .then(res => res.json())
      .then(data => setWeatherss(data))
      .catch(err => console.log(err));
    searchRef.current.value = "";
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
    
        {weathers.length > 0 ? (
          <div id="displayData" className='flex align-center justify-center mt-7 bg-orange-500 w-32'>
            <div className='flex h-[100px] w-[100%] items-center justify-center'>
              {weathers.map((weather) => (
                <div key={weather.id}>
                  <h2>{weather.country}, {weather.city}</h2>
                  <h2></h2>
                  <p>Temperature: {weather.temperature}</p>
                  <p>Description: {weather.weather_description}</p>
                  <p>Wind speed: {weather.wind_speed}</p>
                </div>
              ))}
            </div>
          
          </div>
        ) : null}
    </>
  );
}

export default App;
