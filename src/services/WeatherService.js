const API_KEY = '?key=b44cb5395a644ba08fd10946202108';

export default class WeatherService {
  static async fetchData (city = 'tunis') {
    try {
      const url = 'https://api.weatherapi.com/v1/current.json' + API_KEY + '&q=' + city;
      let resp = await fetch(url);
      resp = await resp.json();

      localStorage.setItem('weather', JSON.stringify({ items: resp, date: Date.now() + (1000 * 60 * 60 * 24) }));

      return resp;
    } catch (error) {
      return null;
    }
  }

  static async getData (city = 'tunis') {
    let localWeather = localStorage.getItem('weather');
    if (localWeather) {
      localWeather = JSON.parse(localWeather);
      if (+localWeather.date <= +Date.now()) {
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

}