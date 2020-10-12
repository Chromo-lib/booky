export default class WeatherService {

  static async getData (city = 'Africa/Tunis') {
    try {

      city = city.split('/')[1].toLowerCase();

      const url = `https://api.weatherapi.com/v1/forecast.json?key=b44cb5395a644ba08fd10946202108&q=${city}`;
      let items = await fetch(url);
      items = await items.json();

      localStorage.setItem('weather', items);

      return items;
    } catch (error) {
      return this.getLocalData();
    }
  }

  static getLocalData () {
    let localData = localStorage.getItem('weather');
    return localData ? JSON.parse(localData) : null;
  }
}