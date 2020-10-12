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
        <small>({timeZone})</small>
      </div>
    </>}
  </div>);
}

export default Weather;
