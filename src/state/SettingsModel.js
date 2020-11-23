import { action } from 'easy-peasy';
import TimeService from '../services/TimeService';

let defaultSettings = {
  showSearchBar: true,
  showWeather: false,
  showDateTime: true,
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

if (!defaultSettings.defaultBackground && localStorage.getItem('wallpaper')) {
  let wallpaper = localStorage.getItem('wallpaper');
  document.body.style.background = `linear-gradient(135deg,rgb(33 37 41 / 65%),rgb(33 37 41 / 72%)),url(data:image/png;base64,${wallpaper})`;
}

const SettingsModel = {
  ...defaultSettings,

  setSettings: action((state, { prop, value }) => {
    if (prop === 'timeZone' && !TimeService.isValidTimeZone(value)) {
      return;
    }
    if (prop === 'defaultBackground') {
      document.body.style.background = 'var(--main-color)';
    }
    state[prop] = value;
    localStorage.setItem('settings', JSON.stringify(state));
  })
};

export default SettingsModel;