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
  //https://pro.openweathermap.org/data/2.5/weather?q=tunis&appid=cdd6336eb33f226c6d28d43f0f337371
  static async fetchData (city = 'tunis') {
    try {
      const url = 'https://api.weatherapi.com/v1/current.json' + API_KEY + '&q=' + city;
      let resp = await fetch(url);
      resp = await resp.json();

      localStorage.setItem('weather',
        JSON.stringify({ items: resp, date: new Date().toLocaleDateString() })
      );

      return resp;
    } catch (error) {
      return null;
    }
  }

  static async getData () {
    let localWeather = localStorage.getItem('weather');

    if (localWeather) {

      localWeather = JSON.parse(localWeather);
      let lastDay = new Date(localWeather.date).getDay();

      if (lastDay !== new Date().getDay()) {
        return await this.fetchData(this.getCity());
      }
      else {
        return localWeather.items;
      }
    }
    else {
      return await this.fetchData(this.getCity());
    }
  }

  static getIcon (code) {
    try {
      return conditions.find(c => c.code === code).icon;
    } catch (error) {
      return "";
    }
  }

  static getCity () {
    let nTimeZone = localStorage.getItem('time-zone');
    if (nTimeZone) {
      nTimeZone = nTimeZone.split('/');
      return nTimeZone ? nTimeZone[1].toLocaleLowerCase() : 'tunis';
    }
    else return 'tunis';
  }
}