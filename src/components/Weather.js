import React, { useEffect, useState } from 'react';
import WeatherService from '../services/WeatherService';

export default function Weather () {

  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    WeatherService.getData()
      .then(r => {
        setWeather(r);
        let iconCode = WeatherService.getIcon(r.current.condition.code);
        import(`../assets/weather-icons/day/${iconCode}.png`)
          .then(module => {
            setIcon(module.default);
          });
      })
      .catch(e=>{});
  }, []);

  return (<>
    {weather && <div className="weather d-flex">
      {icon && <img src={icon} alt="weather" width="32" />}
      <h2 className="m-0 ml-10">{weather.current.temp_c}°C</h2>
      <div className="divider"></div>
      <span className="c-white fw-normal"> {weather.location.name}</span>
    </div>}
  </>);
}