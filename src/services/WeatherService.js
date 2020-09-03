const API_KEY = '?key=b44cb5395a644ba08fd10946202108';

const conditions = [
  { code: 1000, icon: 113 },
  { code: 1003, icon: 116 },
  { code: 1006, icon: 119 },
  { code: 1009, icon: 122 },
  { code: 1030, icon: 143 },
  { code: 1063, icon: 176 },
  { code: 1030, icon: 143 },
  { code: 1063, icon: 176 },
  { code: 1066, icon: 179 },
  { code: 1069, icon: 182 },
  { code: 1072, icon: 185 },
  { code: 1087, icon: 200 }
];

export default class WeatherService {

  static async getData (newTimeZone) {

    let localWeather = localStorage.getItem('weather');

    if (localWeather) {
      localWeather = JSON.parse(localWeather);

      if (localWeather.city && localWeather.city.includes(newTimeZone.toLowerCase())) {
        let lastDay = new Date(localWeather.date).getDay();

        if (lastDay !== new Date().getDay()) {
          return await this.fetchData(localWeather.city);
        }
        else {
          return localWeather.items;
        }
      }
      else {
        newTimeZone = newTimeZone.split('/')[1].toLocaleLowerCase();
        return await this.fetchData(newTimeZone);
      }
    }
    else {
      return await this.fetchData();
    }
  }

  //https://pro.openweathermap.org/data/2.5/weather?q=tunis&appid=cdd6336eb33f226c6d28d43f0f337371
  static async fetchData (city = 'tunis') {
    try {
      const url = 'https://api.weatherapi.com/v1/current.json' + API_KEY + '&q=' + city;
      let resp = await fetch(url);
      resp = await resp.json();

      localStorage.setItem('weather',
        JSON.stringify({
          city: city.toLowerCase(),
          items: resp,
          date: new Date().toLocaleDateString()
        })
      );

      return resp;
    } catch (error) {
      return null;
    }
  }

  static getIcon (code) {
    try {
      return conditions.find(c => c.code === code).icon;
    } catch (error) {
      return "";
    }
  }
}