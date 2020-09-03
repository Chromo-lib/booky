import { action } from 'easy-peasy';
import TimeService from '../services/TimeService';

let defaultSettings = {
  showSearchBar: true,
  showWeather: false,
  showNews: true,
  defaultBackground: true,
  timeZone: TimeService.getSystemTimeZone(),
  searchEngineName: 'Google',
};


let localSettings = localStorage.getItem('settings');

if (localSettings) {
  defaultSettings = {
    ...defaultSettings,
    ...JSON.parse(localSettings)
  };
}

const SettingsModel = {
  ...defaultSettings,

  setSettings: action((state, { prop, value }) => {
    if (prop === 'timeZone' && !TimeService.isValidTimeZone(value)) {
      return;
    }
    state[prop] = value;
    localStorage.setItem('settings', JSON.stringify(state));
  })
};

export default SettingsModel;