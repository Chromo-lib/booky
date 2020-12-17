import React, { Suspense } from 'react';
import Bookmarks from './containers/Bookmarks';
import { useStoreState, useStoreActions } from 'easy-peasy';

import TimeAndDate from './containers/TimeAndDate';
import Spinner from './components/Spinner';

const FormSearch = React.lazy(() => import('./containers/FormSearch'));
const DefaultApps = React.lazy(() => import('./containers/DefaultApps'));
const Weather = React.lazy(() => import('./containers/Weather'));
const Settings = React.lazy(() => import('./containers/settings/Settings'));
const News = React.lazy(() => import('./containers/News'));

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

    {SettingsModel.showDateTime && <TimeAndDate />}    

    <Suspense fallback={<Spinner />}>
      {SettingsModel.showSearchBar && <FormSearch />}
      <DefaultApps />
      {SettingsModel.showWeather && <Weather />}
      <Settings SettingsModel={SettingsModel} onSettingsChange={onSettingsChange} />
    </Suspense>

    <Bookmarks />

    <Suspense fallback={<Spinner />}>
      {SettingsModel.showNews && <News />}
    </Suspense>
  </div>);
}
