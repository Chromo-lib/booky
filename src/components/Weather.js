import React, { useEffect, useState } from 'react';
import WeatherService from '../services/WeatherService';
import { useStoreState } from 'easy-peasy';

function Weather () {

  const timeZone = useStoreState(state => state.SettingsModel.timeZone);
  const [forecast, setForecast] = useState(null);
  const [tempUnit, setTempUnit] = useState(localStorage.getItem('temp-unit') || '°C');

  useEffect(() => {
    WeatherService.getData(timeZone)
      .then(resp => {
        setForecast(resp);
        window.chrome.browserAction.setBadgeText({ text: `${parseInt(resp.current.temp_c, 10)}°C` });
      })
      .catch(e => { });
  }, [timeZone]);

  const onTempUnit = () => {
    let tmp = tempUnit === '°C' ? '°F' : '°C';
    setTempUnit(tmp);
    localStorage.setItem('temp-unit', tmp);
  }

  return (<div className="weather-list d-flex">

    {forecast && <>
      <img
        src={`http:${forecast.current.condition.icon}`}
        alt="weather"
        width="35"
        height="35"
      />

      <h2 className="m-0 ml-10">{parseInt(forecast.current[tempUnit === '°C' ? 'temp_c' : 'temp_f'], 10)}{tempUnit}
        <span className="ml-10 slide-in" onClick={onTempUnit}>| {tempUnit === '°C' ? '°F' : '°C'}</span></h2>

      <div className="d-flex-col txt-center ml-10">
        <small className="c-white">{forecast.current.condition.text}</small>
        <small className="d-flex"><svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>{timeZone.slice(timeZone.lastIndexOf('/') + 1)}</small>
      </div>
    </>}
  </div>);
}

export default Weather;
