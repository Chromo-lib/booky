import React, { useEffect, useState } from 'react';
import WeatherService from '../services/WeatherService';
import { useStoreState } from 'easy-peasy';

function Weather () {

  const timeZone = useStoreState(state => state.SettingsModel.timeZone);
  const [forecast, setForecast] = useState(null);
  const [showOtherDays, setShowOtherDays] = useState(false);

  useEffect(() => {
    WeatherService.getData(timeZone)
      .then(resp => {
        setForecast(resp);
        window.chrome.browserAction.setBadgeText({ text: `${parseInt(resp[0].main.temp_max, 10)}°C` });
      })
      .catch(e => { });
  }, [timeZone]);

  return (<div className="weather-list">

    {forecast && <div className="d-flex-col" >

      <button onClick={() => { setShowOtherDays(!showOtherDays) }}><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg></button>

      <img
        src={`http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`}
        alt="weather"
      />

      <div className="mt-40">
        <small>{forecast[0].weather[0].description}</small>
        <h2 className="m-0">{parseInt(forecast[0].main.temp_max, 10)}°C</h2>
        <small>{timeZone}</small>
      </div>
    </div>}

    <ul className="other-days" style={{ display: showOtherDays ? 'block' : 'none' }}>
      {forecast && forecast.map(w => {
        return <li className="d-flex" key={w.dt}>
          <img
            src={`http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}
            alt="weather"
          />
          <span className="m-0">{w.main.temp_max}°C</span>
          <small className="ml-10">({w.dt_txt.slice(5, 10)})</small>
        </li>
      })}
    </ul>
  </div>);
}

export default Weather;
