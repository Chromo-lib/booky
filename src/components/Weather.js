import React, { useEffect, useState } from 'react';
import WeatherService from '../services/WeatherService';

export default function Weather () {

  const [weather, setWeather] = useState(null);

  useEffect(() => {

    WeatherService.getData()
      .then(r => {
        console.log(r);
        setWeather(r);
      })
  }, []);

  return (<>
    {weather && <div className="weather d-flex-col align-start">
      <h2 className="c-orange m-0 ml-10">{weather.current.temp_c}°C <span className="c-white fw-normal"> {weather.location.name}</span></h2>

      <div className="d-flex">
        <span className="ml-10 c-muted"><small className="c-orange">W</small> {weather.current.wind_kph}kph</span>
        <span className="ml-10 c-muted"><small className="c-orange">H</small> {weather.current.humidity}%</span>
        <span className="ml-10 c-muted"><small className="c-orange">P</small> {weather.current.pressure_mb}mb</span>
      </div>
    </div>}
  </>);
}