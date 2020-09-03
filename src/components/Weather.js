import React, { useEffect, useState } from 'react';
import WeatherService from '../services/WeatherService';
import { useStoreState } from 'easy-peasy';

function Weather () {

  const timeZone = useStoreState(state => state.SettingsModel.timeZone);
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    console.log(timeZone);
    WeatherService.getData(timeZone)
      .then(r => {
        setWeather(r);
        let iconCode = WeatherService.getIcon(r.current.condition.code);
        import(`../assets/weather-icons/day/${iconCode}.png`)
          .then(module => {
            setIcon(module.default);
          });
      })
      .catch(e=>{});
  }, [timeZone]);

  return (<>
    {weather && <div className="weather d-flex">
      {icon && <img src={icon} alt="weather" width="32" />}
      <h2 className="m-0 ml-10">{weather.current.temp_c}°C</h2>
      <div className="divider"></div>
      <span className="c-white fw-normal"> {weather.location.name}</span>
    </div>}
  </>);
}

export default Weather;
