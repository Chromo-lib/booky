import React, { Suspense } from 'react';
import Bookmarks from './containers/Bookmarks';
import TimeAndDate from './components/TimeAndDate';
import FormSearch from './containers/FormSearch';
import Settings from './containers/settings/Settings';
import Weather from './components/Weather';
import { useStoreState, useStoreActions } from 'easy-peasy';

const DefaultApps = React.lazy(() => import('./components/DefaultApps'));

export default function App () {

  const SettingsModel = useStoreState(state => state.SettingsModel);
  const setSettings = useStoreActions(actions => actions.SettingsModel.setSettings);

  const onSettingsChange = (prop) => {
    switch (prop) {
      case 'showSearchBar':
        setSettings({ prop, value: !SettingsModel.showSearchBar });
        break;

      case 'showWeather':
        setSettings({ prop, value: !SettingsModel.showWeather });
        break;

      case 'showNews':
        setSettings({ prop, value: !SettingsModel.showNews });
        break;

      case 'showDateTime':
        setSettings({ prop, value: !SettingsModel.showDateTime });
        break;

      case 'defaultBackground':
        setSettings({ prop, value: !SettingsModel.defaultBackground });
        break;

      default:
        break;
    }
  }

  return (<div className="vh-90 container d-flex-col py-3">

    <Suspense fallback={<div>Loading...</div>}>
      <DefaultApps />
    </Suspense>

    {SettingsModel.showDateTime && <TimeAndDate />}

    {SettingsModel.showSearchBar && <FormSearch />}

    <Bookmarks />

    <Settings SettingsModel={SettingsModel} onSettingsChange={onSettingsChange} />

    {SettingsModel.showWeather && <Weather />}

  </div>);
}
