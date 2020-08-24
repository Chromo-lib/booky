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
  static async fetchData (city = 'tunis') {
    try {
      const url = 'https://api.weatherapi.com/v1/current.json' + API_KEY + '&q=' + city;
      let resp = await fetch(url);
      resp = await resp.json();

      localStorage.setItem('weather', JSON.stringify({ items: resp }));

      return resp;
    } catch (error) {
      return null;
    }
  }

  static async getData (city = 'tunis') {
    let localWeather = localStorage.getItem('weather');
    if (localWeather) {
      localWeather = JSON.parse(localWeather);
      if (this.isMidnight()) {
        return await this.fetchData(city);
      }
      else {
        return localWeather.items;
      }
    }
    else {
      return await this.fetchData(city);
    }
  }

  static isMidnight () {
    let now = new Date();
    return now.getHours() < 1
      && now.getMinutes() < 1
      && now.getSeconds() < 5
  }

  static getIcon (code) {
    try {
      return conditions.find(c => c.code === code).icon;
    } catch (error) {
      return "";
    }
  }
}