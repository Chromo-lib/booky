import React from 'react';
import Bookmarks from './containers/Bookmarks';
import Timer from './components/Timer';
import FormSearch from './containers/FormSearch';
import Settings from './containers/settings/Settings';
import Weather from './components/Weather';

export default function App () {

  return (<>
    <div className="vh-90 container d-flex-col py-3">
      <Timer />
      <FormSearch />
      <Bookmarks />

      <Settings />
      <Weather />
    </div>
  </>);
}
